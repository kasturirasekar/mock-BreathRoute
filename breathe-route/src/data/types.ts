import { LatLngExpression } from 'leaflet';

export interface Campus {
  id: string;
  name: string;
  location: LatLngExpression;
}

export interface School {
  id: string;
  name: string;
  city: string;
  state: string;
  campuses: Campus[];
  studentsEnrolled: number;
  transportUsers: number;
  activeBuses: number;
  activeRoutes: number;
  morningWindow: string;
  afternoonWindow: string;
}

export interface Bus {
  busId: string;
  routeId: string;
  capacity: number;
  assignedStudents: number;
  status: 'IN TRANSIT' | 'SCHEDULED' | 'COMPLETED' | 'MAINTENANCE' | 'DELAYED';
  vehicleType: 'Diesel' | 'CNG' | 'Electric Pilot';
  modelYear: number;
  lastInspection: string;
  currentLocation?: LatLngExpression;
  currentJourneyId?: string;
}

export interface PickupPoint {
  id: string;
  name: string;
  area: string;
  routeId: string;
  scheduledTime: string;
  studentCount: number;
  location: LatLngExpression;
}

export interface Route {
  routeId: string;
  routeName: string;
  assignedBusId: string;
  assignedStudentCount: number;
  distanceKm: number;
  scheduledDurationMin: number;
  departureTime: string;
  trafficProfile: 'Light' | 'Moderate' | 'Heavy' | 'Severe';
  exposureProfile: 'Low' | 'Moderate' | 'High';
  status: 'ACTIVE' | 'INACTIVE';
  path: LatLngExpression[];
  hotspotsCount: number;
  predictedAveragePM25: number;
}

export interface Journey {
  journeyId: string;
  date: string;
  routeId: string;
  busId: string;
  departureTime: string;
  arrivalTime: string;
  durationMin: number;
  studentsBoarded: number;
  averagePM25: number;
  peakPM25: number;
  highExposureDurationMin: number;
  trafficProfile: 'Light' | 'Moderate' | 'Heavy' | 'Severe';
  status: 'COMPLETED' | 'IN TRANSIT';
}

export interface TelemetryPoint {
  timestamp: string;
  location: LatLngExpression;
  speed: number;
  pm25: number;
  pm10: number;
  temperature: number;
  humidity: number;
  traffic: 'Light' | 'Moderate' | 'Heavy' | 'Severe';
  segmentId: string;
  progressPercent: number;
}

export interface Hotspot {
  id: string;
  name: string;
  coordinates: LatLngExpression;
  occurrences: number;
  peakPM25: number;
  typicalTime: string;
  averageSpeed: number;
}
