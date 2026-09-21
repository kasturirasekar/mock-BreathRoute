import { MapContainer, TileLayer, Marker, Popup, Polyline, CircleMarker } from 'react-leaflet';
import L, { LatLngExpression } from 'leaflet';
import { SCHOOL, HOTSPOTS, PICKUP_POINTS } from '../data';

// Fix for default Leaflet marker icons in React
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// Custom icons
const schoolIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const busIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const pickupIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-violet.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [20, 32],
  iconAnchor: [10, 32],
  popupAnchor: [1, -26],
  shadowSize: [32, 32]
});

interface MapViewProps {
  routePath?: LatLngExpression[];
  busPosition?: LatLngExpression | null;
  onHotspotClick?: (id: string) => void;
}

const MapView = ({ routePath, busPosition, onHotspotClick }: MapViewProps) => {
  return (
    <div className="h-full w-full relative rounded-md overflow-hidden border border-border z-0">
      <MapContainer 
        center={SCHOOL.campuses[0].location} 
        zoom={13} 
        scrollWheelZoom={true} 
        style={{ height: '100%', width: '100%' }}
        zoomControl={false}
      >
        <TileLayer
          url="https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}"
          attribution="&copy; Esri &mdash; Esri, HERE, Garmin, NGA, USGS"
        />

        {/* School Marker */}
        <Marker position={SCHOOL.campuses[0].location} icon={schoolIcon}>
          <Popup>{SCHOOL.name}</Popup>
        </Marker>

        {/* Pickup Points */}
        {PICKUP_POINTS.map((pickup) => (
          <Marker key={pickup.id} position={pickup.location} icon={pickupIcon}>
            <Popup>
              <div className="font-semibold text-sm">{pickup.name}</div>
              <div className="text-xs text-gray-500 mt-1">Est. Time: {pickup.scheduledTime}</div>
              <div className="text-xs text-gray-500">Students: {pickup.studentCount}</div>
            </Popup>
          </Marker>
        ))}

        {/* Hotspots */}
        {HOTSPOTS.map((hotspot) => (
          <CircleMarker
            key={hotspot.id}
            center={hotspot.coordinates}
            radius={24}
            fillColor="#F59E0B"
            color="transparent"
            fillOpacity={0.4}
            eventHandlers={{
              click: () => onHotspotClick && onHotspotClick(hotspot.id),
            }}
          >
            <Popup>
              <div className="font-semibold">{hotspot.name}</div>
              <div className="text-xs text-warning mt-1">PM₂.₅ {hotspot.peakPM25} µg/m³ peak</div>
            </Popup>
          </CircleMarker>
        ))}

        {/* Selected Route */}
        {routePath && (
          <Polyline 
            positions={routePath} 
            color="#4A6FA5" 
            weight={4} 
            opacity={0.8} 
          />
        )}

        {/* Live Bus Marker */}
        {busPosition && (
          <Marker position={busPosition} icon={busIcon}>
            <Popup>Live Bus</Popup>
          </Marker>
        )}
      </MapContainer>

      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-white p-3 rounded-md shadow-md border border-border text-xs z-[400]">
        <div className="font-semibold mb-2">Legend</div>
        <div className="flex items-center gap-2 mb-1">
          <div className="w-3 h-3 bg-secondary rounded-full"></div>
          <span>Route</span>
        </div>
        <div className="flex items-center gap-2 mb-1">
          <div className="w-3 h-3 bg-warning opacity-60 rounded-full"></div>
          <span>Hotspot</span>
        </div>
        <div className="flex items-center gap-2 mb-1">
          <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
          <span>Pickup</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-primary rounded-full"></div>
          <span>School</span>
        </div>
      </div>
    </div>
  );
};

export default MapView;
