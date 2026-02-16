export interface AQIData {
  aqi: number;
  city: string;
  stationName: string;
  status: 'Good' | 'Moderate' | 'Unhealthy for Sensitive' | 'Unhealthy' | 'Very Unhealthy' | 'Hazardous';
  pm25: number;
  pm10: number;
  temperature: number;
  humidity: number;
  lastUpdated: string;
  backgroundImageUrl: string;
  isGeolocated: boolean;
}

export interface ForecastItem {
  time: string;
  aqi: number;
  status: string;
}

export type PolicyStatus = 'todo' | 'doing' | 'done' | 'failed';

export interface PolicyItem {
  id: string;
  title: string;
  year: string;
  status: PolicyStatus;
  description: string;
  outcome?: string; // e.g., "Failed because...", "Reduced hotspots by 10%"
}

export interface Rumor {
  id: string;
  title: string;
  verdict: 'True' | 'False' | 'Misleading';
  explanation: string;
}

export interface AirSource {
  name: string;
  value: number;
  color: string;
  details: string;
}
