import { AQIData, ForecastItem } from '../types';
import { LOCATION_IMAGES } from '../data';

// ศูนย์ข้อมูลการเปลี่ยนแปลงภูมิอากาศ (CCDC) — daily updated, 900+ stations nationwide
// Proxied through /api/dust to avoid CORS issues
const DUST_API_URL = '/api/dust';

// Default coordinates (Chiang Mai city center)
const DEFAULT_LAT = 18.7883;
const DEFAULT_LON = 98.9853;

// ------- Interfaces for Warroom API data -------
export interface WarroomStation {
  source: string;   // e.g. "CCDC", "Air4Thai", "NTAQHI"
  name: string;     // Station name in Thai
  lat: number;
  lon: number;
  pm25: number;
  temp: number | null;
  humid: number | null;
}

// ------- Helpers -------

/** Convert PM2.5 µg/m³ to US AQI */
function pm25ToAQI(pm25: number): number {
  const breakpoints = [
    { cLo: 0, cHi: 12.0, iLo: 0, iHi: 50 },
    { cLo: 12.1, cHi: 35.4, iLo: 51, iHi: 100 },
    { cLo: 35.5, cHi: 55.4, iLo: 101, iHi: 150 },
    { cLo: 55.5, cHi: 150.4, iLo: 151, iHi: 200 },
    { cLo: 150.5, cHi: 250.4, iLo: 201, iHi: 300 },
    { cLo: 250.5, cHi: 500.4, iLo: 301, iHi: 500 },
  ];

  for (const bp of breakpoints) {
    if (pm25 >= bp.cLo && pm25 <= bp.cHi) {
      return Math.round(((bp.iHi - bp.iLo) / (bp.cHi - bp.cLo)) * (pm25 - bp.cLo) + bp.iLo);
    }
  }
  return pm25 > 500 ? 500 : 0;
}

function getStatusFromAQI(aqi: number): AQIData['status'] {
  if (aqi <= 50) return 'Good';
  if (aqi <= 100) return 'Moderate';
  if (aqi <= 150) return 'Unhealthy for Sensitive';
  if (aqi <= 200) return 'Unhealthy';
  if (aqi <= 300) return 'Very Unhealthy';
  return 'Hazardous';
}

/** Get user's current position, or fall back to default */
function getUserLocation(): Promise<{ lat: number; lon: number; geolocated: boolean }> {
  return new Promise((resolve) => {
    if (!navigator.geolocation) {
      resolve({ lat: DEFAULT_LAT, lon: DEFAULT_LON, geolocated: false });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        resolve({
          lat: pos.coords.latitude,
          lon: pos.coords.longitude,
          geolocated: true,
        });
      },
      () => {
        resolve({ lat: DEFAULT_LAT, lon: DEFAULT_LON, geolocated: false });
      },
      { timeout: 5000, maximumAge: 300000 }
    );
  });
}

/** Haversine distance in km */
function haversineDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

// Province centroids for matching user location → province
const PROVINCE_COORDS: { name: string; lat: number; lon: number }[] = [
  { name: 'เชียงใหม่', lat: 18.7883, lon: 98.9853 },
  { name: 'เชียงราย', lat: 19.9105, lon: 99.8406 },
  { name: 'แม่ฮ่องสอน', lat: 19.3020, lon: 97.9654 },
  { name: 'ลำพูน', lat: 18.5744, lon: 99.0087 },
  { name: 'ลำปาง', lat: 18.2888, lon: 99.4908 },
  { name: 'น่าน', lat: 18.7756, lon: 100.7730 },
  { name: 'พะเยา', lat: 19.1664, lon: 99.9019 },
  { name: 'แพร่', lat: 18.1445, lon: 100.1406 },
  { name: 'ตาก', lat: 16.8840, lon: 99.1258 },
  { name: 'กรุงเทพมหานคร', lat: 13.7563, lon: 100.5018 },
];

function findNearestProvince(lat: number, lon: number): string {
  let nearest = 'default';
  let minDist = Infinity;
  for (const prov of PROVINCE_COORDS) {
    const dist = haversineDistance(lat, lon, prov.lat, prov.lon);
    if (dist < minDist) {
      minDist = dist;
      nearest = prov.name;
    }
  }
  // Only match if within 100km, otherwise return default
  return minDist < 100 ? nearest : 'default';
}

/** Sort stations by distance from a point and return with distance */
function sortStationsByDistance(
  stations: WarroomStation[],
  lat: number,
  lon: number
): (WarroomStation & { distance: number })[] {
  return stations
    .map(s => ({ ...s, distance: haversineDistance(lat, lon, s.lat, s.lon) }))
    .sort((a, b) => a.distance - b.distance);
}

// ------- Main fetch function -------

export const fetchAirQuality = async (): Promise<{
  current: AQIData;
  forecast: ForecastItem[];
  nearbyStations: (WarroomStation & { distance: number })[];
  allStations: WarroomStation[];
}> => {
  try {
    // Step 1: Get user location
    const { lat, lon, geolocated } = await getUserLocation();

    // Step 2: Fetch all stations from Warroom API
    const timestamp = Date.now();
    const response = await fetch(`${DUST_API_URL}?t=${timestamp}`);
    if (!response.ok) throw new Error(`Warroom API HTTP ${response.status}`);

    const allStations: WarroomStation[] = await response.json();
    if (!Array.isArray(allStations) || allStations.length === 0) {
      throw new Error('Warroom API returned no station data');
    }

    // Step 3: Find nearest station to user's location
    const sorted = sortStationsByDistance(allStations, lat, lon);
    const nearest = sorted[0];

    // Step 4: Find user's province
    const nearestProvinceName = findNearestProvince(lat, lon);

    // Step 5: Build current AQI data from nearest station
    const pm25Value = Math.round(nearest.pm25 * 10) / 10;
    const aqi = pm25ToAQI(pm25Value);

    const current: AQIData = {
      aqi,
      city: nearestProvinceName === 'default' ? 'ประเทศไทย' : nearestProvinceName,
      stationName: nearest.name,
      status: getStatusFromAQI(aqi),
      pm25: pm25Value,
      pm10: 0,
      temperature: nearest.temp ?? 0,
      humidity: nearest.humid ?? 0,
      lastUpdated: new Date().toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' }),
      backgroundImageUrl: LOCATION_IMAGES[nearestProvinceName] || LOCATION_IMAGES['default'],
      isGeolocated: geolocated,
    };

    // Step 6: Build "nearby stations" as forecast-like data (closest stations within 50km)
    // Deduplicate by station name — keep only the closest instance of each name
    const seenNames = new Set<string>();
    const nearbyStations = sorted
      .filter(s => s.distance <= 50)
      .filter(s => {
        if (seenNames.has(s.name)) return false;
        seenNames.add(s.name);
        return true;
      })
      .slice(0, 8);
    const forecast: ForecastItem[] = nearbyStations.map((station) => {
      const stAqi = pm25ToAQI(station.pm25);
      // Shorten station name for display
      const shortName = station.name.length > 15
        ? station.name.substring(0, 15) + '…'
        : station.name;
      return {
        time: shortName,
        aqi: stAqi,
        status: getStatusFromAQI(stAqi),
      };
    });

    return { current, forecast, nearbyStations, allStations };
  } catch (error) {
    console.error('Error fetching air quality from CCDC:', error);
    throw error;
  }
};
