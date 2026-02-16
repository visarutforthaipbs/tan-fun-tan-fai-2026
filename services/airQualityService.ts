import { AQIData, ForecastItem } from '../types';
import { LOCATION_IMAGES } from '../data';

// GISTDA "Check Foon" API (Thai Government - Envilink)
// https://envilink.go.th/dataset/pm2-5
const GISTDA_LOCATION_URL = 'https://pm25.gistda.or.th/rest/getPm25byLocation';
const GISTDA_PROVINCE_URL = 'https://pm25.gistda.or.th/rest/getPm25byProvince';

// Default coordinates (Chiang Mai city center)
const DEFAULT_LAT = 18.7883;
const DEFAULT_LON = 98.9853;

// ------- Interfaces for raw GISTDA data -------
interface GISTDALocationResponse {
  status: number;
  errMsg: string;
  data: {
    pm25: number;
    graphHistory24hrs: [number, string][]; // [pm25value, ISO timestamp]
  };
}

interface GISTDAProvinceItem {
  pv_tn: string;      // Province name in Thai
  pv_en: string;      // Province name in English
  pv_idn: number;     // Province ID
  pm25: number;        // Current PM2.5
  dt: string;          // ISO timestamp
  pm25Avg24hr: number; // 24-hour average
}

interface GISTDAProvinceResponse {
  status: number;
  errMsg: string;
  data: GISTDAProvinceItem[];
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

// ------- Main fetch function -------

export const fetchAirQuality = async (): Promise<{ current: AQIData; forecast: ForecastItem[] }> => {
  try {
    // Step 1: Get user location
    const { lat, lon, geolocated } = await getUserLocation();

    // Step 2: Fetch PM2.5 at user location + all provinces (in parallel)
    const [locationRes, provinceRes] = await Promise.all([
      fetch(`${GISTDA_LOCATION_URL}?lat=${lat}&lng=${lon}`),
      fetch(`${GISTDA_PROVINCE_URL}`),
    ]);

    if (!locationRes.ok) throw new Error(`Location API HTTP ${locationRes.status}`);
    if (!provinceRes.ok) throw new Error(`Province API HTTP ${provinceRes.status}`);

    const locationData: GISTDALocationResponse = await locationRes.json();
    const provinceData: GISTDAProvinceResponse = await provinceRes.json();

    if (locationData.status !== 200) throw new Error(locationData.errMsg || 'Location API error');
    if (provinceData.status !== 200) throw new Error(provinceData.errMsg || 'Province API error');

    // Step 3: Find user's province from province list (nearest match by coordinates)
    const nearestProvinceName = findNearestProvince(lat, lon);

    // Find province data for display info
    const userProvince = provinceData.data.find(p => p.pv_tn === nearestProvinceName);
    const provinceName = userProvince?.pv_tn || nearestProvinceName;
    const provinceNameEn = userProvince?.pv_en || '';

    // Step 4: Build current AQI data
    const pm25Value = Math.round(locationData.data.pm25 * 10) / 10;
    const aqi = pm25ToAQI(pm25Value);

    const current: AQIData = {
      aqi,
      city: provinceName === 'default' ? 'ประเทศไทย' : provinceName,
      stationName: provinceNameEn || provinceName,
      status: getStatusFromAQI(aqi),
      pm25: pm25Value,
      pm10: 0, // GISTDA doesn't provide PM10
      temperature: 0, // GISTDA doesn't provide temperature
      humidity: 0, // GISTDA doesn't provide humidity
      lastUpdated: new Date().toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' }),
      backgroundImageUrl: LOCATION_IMAGES[provinceName] || LOCATION_IMAGES['default'],
      isGeolocated: geolocated,
    };

    // Step 5: Build forecast from 24hr history
    const history = locationData.data.graphHistory24hrs || [];
    // Take last few hours as forecast items
    const recentHistory = history.slice(-6);
    const forecast: ForecastItem[] = recentHistory.map(([pm25Val, timestamp]) => {
      const time = new Date(timestamp);
      const hourStr = time.toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' });
      const histAqi = pm25ToAQI(pm25Val);
      return {
        time: hourStr,
        aqi: histAqi,
        status: getStatusFromAQI(histAqi),
      };
    });

    return { current, forecast };
  } catch (error) {
    console.error('Error fetching air quality from GISTDA:', error);
    throw error;
  }
};
