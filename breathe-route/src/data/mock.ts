import { School, Campus, Bus, Route, PickupPoint, Journey, TelemetryPoint, Hotspot } from './types';

export const CAMPUSES: Campus[] = [
  { id: 'CAMP-01', name: 'Central Campus', location: [18.5320, 73.8320] },
  { id: 'CAMP-02', name: 'Baner Campus', location: [18.5590, 73.7868] }
];

export const SCHOOL: School = {
  id: 'SCH-PUN-001',
  name: 'Pune Central Public School',
  city: 'Pune',
  state: 'Maharashtra',
  campuses: CAMPUSES,
  studentsEnrolled: 1850,
  transportUsers: 1050,
  activeBuses: 18,
  activeRoutes: 24,
  morningWindow: '06:45–07:45',
  afternoonWindow: '14:15–15:30'
};

export const BUSES: Bus[] = [
  { busId: 'BR-021', routeId: 'RT-01', capacity: 40, assignedStudents: 31, status: 'COMPLETED', vehicleType: 'Diesel', modelYear: 2019, lastInspection: '10 Aug 2026' },
  { busId: 'BR-022', routeId: 'RT-02', capacity: 40, assignedStudents: 36, status: 'COMPLETED', vehicleType: 'Diesel', modelYear: 2018, lastInspection: '05 Sep 2026' },
  { busId: 'BR-023', routeId: 'RT-03', capacity: 35, assignedStudents: 28, status: 'COMPLETED', vehicleType: 'CNG', modelYear: 2021, lastInspection: '12 Sep 2026' },
  { busId: 'BR-024', routeId: 'RT-07', capacity: 42, assignedStudents: 38, status: 'IN TRANSIT', vehicleType: 'Diesel', modelYear: 2022, lastInspection: '12 Sep 2026', currentJourneyId: 'JRN-2026-09-21-024' },
  { busId: 'BR-025', routeId: 'RT-04', capacity: 45, assignedStudents: 41, status: 'IN TRANSIT', vehicleType: 'Diesel', modelYear: 2020, lastInspection: '01 Sep 2026' },
  { busId: 'BR-026', routeId: 'RT-05', capacity: 40, assignedStudents: 34, status: 'IN TRANSIT', vehicleType: 'CNG', modelYear: 2021, lastInspection: '02 Sep 2026' },
  { busId: 'BR-027', routeId: 'RT-06', capacity: 45, assignedStudents: 39, status: 'IN TRANSIT', vehicleType: 'Diesel', modelYear: 2018, lastInspection: '15 Aug 2026' },
  { busId: 'BR-028', routeId: 'RT-08', capacity: 40, assignedStudents: 35, status: 'IN TRANSIT', vehicleType: 'Diesel', modelYear: 2019, lastInspection: '20 Aug 2026' },
  { busId: 'BR-029', routeId: 'RT-09', capacity: 42, assignedStudents: 37, status: 'IN TRANSIT', vehicleType: 'Diesel', modelYear: 2020, lastInspection: '22 Aug 2026' },
  { busId: 'BR-030', routeId: 'RT-10', capacity: 35, assignedStudents: 30, status: 'COMPLETED', vehicleType: 'CNG', modelYear: 2021, lastInspection: '25 Aug 2026' },
  { busId: 'BR-031', routeId: 'RT-11', capacity: 40, assignedStudents: 36, status: 'COMPLETED', vehicleType: 'Diesel', modelYear: 2018, lastInspection: '28 Aug 2026' },
  { busId: 'BR-032', routeId: 'RT-12', capacity: 45, assignedStudents: 42, status: 'COMPLETED', vehicleType: 'Diesel', modelYear: 2019, lastInspection: '30 Aug 2026' },
  { busId: 'BR-033', routeId: 'RT-13', capacity: 40, assignedStudents: 38, status: 'COMPLETED', vehicleType: 'Diesel', modelYear: 2020, lastInspection: '01 Sep 2026' },
  { busId: 'BR-034', routeId: 'RT-14', capacity: 35, assignedStudents: 32, status: 'COMPLETED', vehicleType: 'Diesel', modelYear: 2018, lastInspection: '03 Sep 2026' },
  { busId: 'BR-035', routeId: 'RT-15', capacity: 42, assignedStudents: 39, status: 'SCHEDULED', vehicleType: 'Diesel', modelYear: 2019, lastInspection: '05 Sep 2026' },
  { busId: 'BR-036', routeId: 'RT-16', capacity: 40, assignedStudents: 35, status: 'SCHEDULED', vehicleType: 'Diesel', modelYear: 2020, lastInspection: '07 Sep 2026' },
  { busId: 'BR-037', routeId: 'RT-17', capacity: 45, assignedStudents: 40, status: 'SCHEDULED', vehicleType: 'Diesel', modelYear: 2021, lastInspection: '09 Sep 2026' },
  { busId: 'BR-038', routeId: 'RT-18', capacity: 40, assignedStudents: 34, status: 'SCHEDULED', vehicleType: 'Diesel', modelYear: 2022, lastInspection: '11 Sep 2026' },
  { busId: 'BR-E01', routeId: 'RT-19', capacity: 40, assignedStudents: 36, status: 'MAINTENANCE', vehicleType: 'Electric Pilot', modelYear: 2024, lastInspection: '15 Sep 2026' },
  { busId: 'BR-040', routeId: 'RT-20', capacity: 42, assignedStudents: 38, status: 'DELAYED', vehicleType: 'Diesel', modelYear: 2018, lastInspection: '18 Sep 2026' },
];

export const PICKUP_POINTS: PickupPoint[] = [
  { id: 'PUP-01', name: 'Baner Circle', area: 'Baner', routeId: 'RT-07', scheduledTime: '06:58', studentCount: 7, location: [18.5590, 73.7868] },
  { id: 'PUP-02', name: 'Balewadi', area: 'Balewadi', routeId: 'RT-07', scheduledTime: '07:05', studentCount: 8, location: [18.5700, 73.7780] },
  { id: 'PUP-03', name: 'Aundh ITI', area: 'Aundh', routeId: 'RT-07', scheduledTime: '07:14', studentCount: 6, location: [18.5600, 73.8050] },
  { id: 'PUP-04', name: 'Pashan Junction', area: 'Pashan', routeId: 'RT-07', scheduledTime: '07:24', studentCount: 9, location: [18.5400, 73.7950] },
  { id: 'PUP-05', name: 'University Circle', area: 'University', routeId: 'RT-07', scheduledTime: '07:31', studentCount: 6, location: [18.5320, 73.8200] },
  { id: 'PUP-06', name: 'Pune Central Public School', area: 'Shivajinagar', routeId: 'RT-07', scheduledTime: '07:53', studentCount: 0, location: [18.5320, 73.8320] }
];

export const ROUTES: Route[] = [
  {
    routeId: 'RT-07',
    routeName: 'Baner – University Corridor (Balanced)',
    assignedBusId: 'BR-024',
    assignedStudentCount: 36,
    distanceKm: 14.2,
    scheduledDurationMin: 38,
    departureTime: '07:15',
    trafficProfile: 'Moderate',
    exposureProfile: 'Moderate',
    status: 'ACTIVE',
    path: [
      [18.5590, 73.7868],
      [18.5700, 73.7780],
      [18.5600, 73.8050],
      [18.5400, 73.7950],
      [18.5320, 73.8200],
      [18.5320, 73.8320]
    ],
    hotspotsCount: 4,
    predictedAveragePM25: 43
  },
  {
    routeId: 'RT-07-FAST',
    routeName: 'Baner – Main Arterials (Fastest)',
    assignedBusId: 'BR-024',
    assignedStudentCount: 36,
    distanceKm: 13.7,
    scheduledDurationMin: 35,
    departureTime: '07:15',
    trafficProfile: 'Heavy',
    exposureProfile: 'High',
    status: 'INACTIVE',
    path: [
      [18.5590, 73.7868],
      [18.5500, 73.8000],
      [18.5320, 73.8200],
      [18.5320, 73.8320]
    ],
    hotspotsCount: 5,
    predictedAveragePM25: 51
  },
  {
    routeId: 'RT-07-CLEAN',
    routeName: 'Baner – University Internal (Lower Exposure)',
    assignedBusId: 'BR-024',
    assignedStudentCount: 36,
    distanceKm: 15.1,
    scheduledDurationMin: 43,
    departureTime: '07:15',
    trafficProfile: 'Light',
    exposureProfile: 'Low',
    status: 'INACTIVE',
    path: [
      [18.5590, 73.7868],
      [18.5450, 73.7800],
      [18.5400, 73.7950],
      [18.5350, 73.8100],
      [18.5320, 73.8320]
    ],
    hotspotsCount: 1,
    predictedAveragePM25: 34
  }
];

export const HISTORICAL_JOURNEYS: Journey[] = [
  { journeyId: 'JRN-2026-09-02-024', date: '02 Sep 2026', routeId: 'RT-07', busId: 'BR-024', departureTime: '07:15', arrivalTime: '07:54', durationMin: 39, studentsBoarded: 36, averagePM25: 44, peakPM25: 82, highExposureDurationMin: 6, trafficProfile: 'Moderate', status: 'COMPLETED' },
  { journeyId: 'JRN-2026-09-03-024', date: '03 Sep 2026', routeId: 'RT-07', busId: 'BR-024', departureTime: '07:15', arrivalTime: '07:51', durationMin: 36, studentsBoarded: 35, averagePM25: 38, peakPM25: 69, highExposureDurationMin: 4, trafficProfile: 'Light', status: 'COMPLETED' },
  { journeyId: 'JRN-2026-09-04-024', date: '04 Sep 2026', routeId: 'RT-07', busId: 'BR-024', departureTime: '07:15', arrivalTime: '07:56', durationMin: 41, studentsBoarded: 38, averagePM25: 47, peakPM25: 88, highExposureDurationMin: 9, trafficProfile: 'Heavy', status: 'COMPLETED' },
  { journeyId: 'JRN-2026-09-07-024', date: '07 Sep 2026', routeId: 'RT-07', busId: 'BR-024', departureTime: '07:15', arrivalTime: '07:52', durationMin: 37, studentsBoarded: 34, averagePM25: 41, peakPM25: 74, highExposureDurationMin: 5, trafficProfile: 'Moderate', status: 'COMPLETED' },
  { journeyId: 'JRN-2026-09-08-024', date: '08 Sep 2026', routeId: 'RT-07', busId: 'BR-024', departureTime: '07:15', arrivalTime: '07:53', durationMin: 38, studentsBoarded: 36, averagePM25: 42, peakPM25: 79, highExposureDurationMin: 6, trafficProfile: 'Moderate', status: 'COMPLETED' },
  { journeyId: 'JRN-2026-09-09-024', date: '09 Sep 2026', routeId: 'RT-07', busId: 'BR-024', departureTime: '07:15', arrivalTime: '07:54', durationMin: 39, studentsBoarded: 37, averagePM25: 44, peakPM25: 82, highExposureDurationMin: 7, trafficProfile: 'Heavy', status: 'COMPLETED' },
  { journeyId: 'JRN-2026-09-10-024', date: '10 Sep 2026', routeId: 'RT-07', busId: 'BR-024', departureTime: '07:15', arrivalTime: '07:50', durationMin: 35, studentsBoarded: 35, averagePM25: 39, peakPM25: 65, highExposureDurationMin: 3, trafficProfile: 'Light', status: 'COMPLETED' },
  { journeyId: 'JRN-2026-09-11-024', date: '11 Sep 2026', routeId: 'RT-07', busId: 'BR-024', departureTime: '07:15', arrivalTime: '07:55', durationMin: 40, studentsBoarded: 36, averagePM25: 45, peakPM25: 84, highExposureDurationMin: 8, trafficProfile: 'Heavy', status: 'COMPLETED' },
  { journeyId: 'JRN-2026-09-14-024', date: '14 Sep 2026', routeId: 'RT-07', busId: 'BR-024', departureTime: '07:15', arrivalTime: '07:51', durationMin: 36, studentsBoarded: 35, averagePM25: 38, peakPM25: 67, highExposureDurationMin: 4, trafficProfile: 'Light', status: 'COMPLETED' },
  { journeyId: 'JRN-2026-09-15-024', date: '15 Sep 2026', routeId: 'RT-07', busId: 'BR-024', departureTime: '07:15', arrivalTime: '07:53', durationMin: 38, studentsBoarded: 37, averagePM25: 42, peakPM25: 77, highExposureDurationMin: 5, trafficProfile: 'Moderate', status: 'COMPLETED' },
  { journeyId: 'JRN-2026-09-16-024', date: '16 Sep 2026', routeId: 'RT-07', busId: 'BR-024', departureTime: '07:15', arrivalTime: '07:56', durationMin: 41, studentsBoarded: 36, averagePM25: 46, peakPM25: 86, highExposureDurationMin: 8, trafficProfile: 'Heavy', status: 'COMPLETED' },
  { journeyId: 'JRN-2026-09-17-024', date: '17 Sep 2026', routeId: 'RT-07', busId: 'BR-024', departureTime: '07:15', arrivalTime: '07:52', durationMin: 37, studentsBoarded: 35, averagePM25: 41, peakPM25: 74, highExposureDurationMin: 5, trafficProfile: 'Moderate', status: 'COMPLETED' },
  { journeyId: 'JRN-2026-09-18-024', date: '18 Sep 2026', routeId: 'RT-07', busId: 'BR-024', departureTime: '07:15', arrivalTime: '07:54', durationMin: 39, studentsBoarded: 36, averagePM25: 44, peakPM25: 82, highExposureDurationMin: 6, trafficProfile: 'Moderate', status: 'COMPLETED' },
  { journeyId: 'JRN-2026-09-21-024', date: '21 Sep 2026', routeId: 'RT-07', busId: 'BR-024', departureTime: '07:15', arrivalTime: '--:--', durationMin: 0, studentsBoarded: 36, averagePM25: 0, peakPM25: 0, highExposureDurationMin: 0, trafficProfile: 'Moderate', status: 'IN TRANSIT' } 
];

export const LIVE_TELEMETRY: TelemetryPoint[] = [
  { timestamp: '07:15', location: [18.5590, 73.7868], speed: 34, pm25: 31, pm10: 45, temperature: 26.2, humidity: 65, traffic: 'Light', segmentId: 'Baner Circle', progressPercent: 0 },
  { timestamp: '07:20', location: [18.5630, 73.7820], speed: 31, pm25: 34, pm10: 51, temperature: 26.5, humidity: 64, traffic: 'Moderate', segmentId: 'Baner Road', progressPercent: 15 },
  { timestamp: '07:25', location: [18.5700, 73.7780], speed: 28, pm25: 37, pm10: 55, temperature: 26.8, humidity: 64, traffic: 'Moderate', segmentId: 'Balewadi', progressPercent: 30 },
  { timestamp: '07:30', location: [18.5600, 73.8050], speed: 24, pm25: 42, pm10: 62, temperature: 27.1, humidity: 63, traffic: 'Moderate', segmentId: 'Aundh ITI', progressPercent: 45 },
  { timestamp: '07:35', location: [18.5400, 73.7950], speed: 17, pm25: 51, pm10: 74, temperature: 27.4, humidity: 63, traffic: 'Heavy', segmentId: 'Pashan Junction', progressPercent: 60 },
  { timestamp: '07:40', location: [18.5360, 73.8050], speed: 10, pm25: 64, pm10: 92, temperature: 27.8, humidity: 62, traffic: 'Severe', segmentId: 'University Road', progressPercent: 70 },
  { timestamp: '07:42', location: [18.5320, 73.8150], speed: 6,  pm25: 82, pm10: 118, temperature: 28.1, humidity: 62, traffic: 'Severe', segmentId: 'University Road Junction', progressPercent: 75 },
  { timestamp: '07:48', location: [18.5320, 73.8220], speed: 8,  pm25: 76, pm10: 110, temperature: 28.3, humidity: 61, traffic: 'Heavy', segmentId: 'University Road', progressPercent: 82 },
  { timestamp: '07:52', location: [18.5320, 73.8280], speed: 15, pm25: 61, pm10: 89, temperature: 28.5, humidity: 61, traffic: 'Moderate', segmentId: 'Shivajinagar', progressPercent: 90 },
  { timestamp: '07:58', location: [18.5320, 73.8300], speed: 27, pm25: 47, pm10: 68, temperature: 28.6, humidity: 60, traffic: 'Light', segmentId: 'Campus Approach', progressPercent: 95 },
  { timestamp: '08:03', location: [18.5320, 73.8320], speed: 34, pm25: 39, pm10: 55, temperature: 28.7, humidity: 60, traffic: 'Light', segmentId: 'Pune Central Public School', progressPercent: 100 }
];

export const HOTSPOTS: Hotspot[] = [
  { id: 'HS-01', name: 'University Road Junction', coordinates: [18.5320, 73.8150], occurrences: 18, peakPM25: 91, typicalTime: '07:35–08:05', averageSpeed: 9 },
  { id: 'HS-02', name: 'Pashan Junction', coordinates: [18.5400, 73.7950], occurrences: 11, peakPM25: 73, typicalTime: '07:25–07:50', averageSpeed: 14 },
  { id: 'HS-03', name: 'Baner Road Merge', coordinates: [18.5630, 73.7820], occurrences: 9, peakPM25: 68, typicalTime: '07:15–07:40', averageSpeed: 18 },
  { id: 'HS-04', name: 'Shivajinagar Station Road', coordinates: [18.5320, 73.8280], occurrences: 14, peakPM25: 85, typicalTime: '07:45–08:15', averageSpeed: 11 },
  { id: 'HS-05', name: 'Kothrud Depot Approach', coordinates: [18.5050, 73.8050], occurrences: 16, peakPM25: 88, typicalTime: '07:30–08:00', averageSpeed: 10 },
  { id: 'HS-06', name: 'Aundh ITI Congestion', coordinates: [18.5600, 73.8050], occurrences: 7, peakPM25: 62, typicalTime: '07:20–07:45', averageSpeed: 21 },
  { id: 'HS-07', name: 'Wakad Bridge', coordinates: [18.5900, 73.7650], occurrences: 12, peakPM25: 78, typicalTime: '07:05–07:30', averageSpeed: 15 },
  { id: 'HS-08', name: 'Balewadi High Street', coordinates: [18.5700, 73.7780], occurrences: 6, peakPM25: 59, typicalTime: '07:10–07:35', averageSpeed: 24 }
];

export const NETWORK_STATS = {
  routesMonitored: 24,
  historicalJourneys: 1042,
  environmentalObservations: 18426,
  recurringHotspots: 12,
  busesAssigned: 18,
  busesInTransit: 6,
  busesCompleted: 8,
  busesScheduled: 4,
  busesMaintenance: 1,
  busesDelayed: 1,
};
