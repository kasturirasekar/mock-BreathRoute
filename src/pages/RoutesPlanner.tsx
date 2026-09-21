import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MapView from '../components/MapView';
import { ROUTES, SCHOOL, PICKUP_POINTS } from '../data';

const RoutesPlanner = () => {
  const navigate = useNavigate();
  const [selectedRouteId, setSelectedRouteId] = useState<string>(ROUTES[0].routeId);
  
  const selectedRoute = ROUTES.find(r => r.routeId === selectedRouteId) || ROUTES[0];
  const balancedRoute = ROUTES.find(r => r.routeId === 'RT-07') || ROUTES[0];

  const diffTime = selectedRoute.scheduledDurationMin - balancedRoute.scheduledDurationMin;
  const diffPm25 = selectedRoute.predictedAveragePM25 - balancedRoute.predictedAveragePM25;
  const diffHotspots = selectedRoute.hotspotsCount - balancedRoute.hotspotsCount;

  return (
    <div className="flex flex-col h-full bg-white">
      <div className="p-8 pb-4 z-10 border-b border-border">
        <h2 className="text-xs font-bold text-gray-500 tracking-widest uppercase mb-2">Route Planner</h2>
        <h1 className="text-3xl font-bold text-text mb-6 tracking-tight">Compare travel time, traffic and predicted environmental exposure.</h1>

        <div className="flex gap-12 border-t border-border pt-4 pb-2 text-sm">
          <div>
            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">School</div>
            <div className="font-semibold text-text">{SCHOOL.name}</div>
          </div>
          <div>
            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Boarding Corridor</div>
            <div className="font-semibold text-text">Baner → Aundh → University</div>
          </div>
          <div>
            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Departure</div>
            <div className="font-semibold text-text">07:15 AM</div>
          </div>
          <div>
            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Expected Boarding</div>
            <div className="font-semibold text-text">36 students</div>
          </div>
          <div>
            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Assigned Bus</div>
            <div className="font-semibold text-text">BR-024</div>
          </div>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Left List */}
        <div className="w-[50%] h-full overflow-y-auto border-r border-border p-8 bg-gray-50/30">
          <div className="space-y-4">
            {ROUTES.map((route) => {
              const isSelected = selectedRouteId === route.routeId;
              
              return (
                <div 
                  key={route.routeId}
                  onClick={() => setSelectedRouteId(route.routeId)}
                  className={`border p-6 cursor-pointer transition-all ${
                    isSelected 
                      ? 'border-text bg-white shadow-sm' 
                      : 'border-border bg-white hover:border-gray-400'
                  }`}
                >
                  <div className="flex justify-between items-start mb-6">
                    <h3 className="font-bold text-sm uppercase tracking-widest text-text">{route.routeName}</h3>
                    <div className="text-right">
                      <div className="text-xl font-bold text-text">{route.scheduledDurationMin} min</div>
                      <div className="text-sm font-semibold text-gray-500">{route.distanceKm} km</div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-4 gap-4">
                    <div>
                      <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Traffic</div>
                      <div className="text-sm font-semibold text-text">{route.trafficProfile}</div>
                    </div>
                    <div>
                      <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Students</div>
                      <div className="text-sm font-semibold text-text">{route.assignedStudentCount}</div>
                    </div>
                    <div>
                      <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Recurring Hotspots</div>
                      <div className="text-sm font-semibold text-text">{route.hotspotsCount}</div>
                    </div>
                    <div>
                      <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Exposure</div>
                      <div className={`text-xs font-bold uppercase ${
                        route.exposureProfile === 'High' ? 'text-danger' : 
                        route.exposureProfile === 'Moderate' ? 'text-warning' : 'text-primary'
                      }`}>{route.exposureProfile}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Map & Details */}
        <div className="w-[50%] h-full relative flex flex-col bg-white overflow-y-auto">
          <div className="h-[250px] relative shrink-0">
             <MapView routePath={selectedRoute.path} />
          </div>
          
          <div className="p-8 flex-1 flex flex-col">
            <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-6">Pickup Timeline</h3>
            <div className="flex-1">
               {PICKUP_POINTS.map((pup, idx) => (
                 <div key={pup.id} className="flex gap-4 mb-4 items-start relative">
                    <div className="w-12 text-right text-xs font-bold text-gray-500 pt-0.5">{pup.scheduledTime}</div>
                    <div className="relative z-10 w-2.5 h-2.5 rounded-full bg-text mt-1 flex-shrink-0"></div>
                    {idx !== PICKUP_POINTS.length - 1 && (
                      <div className="absolute left-[3.8rem] top-3 bottom-[-1rem] w-px bg-gray-200"></div>
                    )}
                    <div>
                      <div className="text-sm font-bold text-text">{pup.name}</div>
                      <div className="text-xs text-gray-500">{pup.studentCount === 0 ? 'Destination' : `${pup.studentCount} students`}</div>
                    </div>
                 </div>
               ))}
            </div>
            
            <div className="border-t border-border pt-6 mt-6">
              <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">Predicted Conditions (vs Balanced)</h3>
              
              <div className="flex gap-8 mb-6">
                 <div>
                   <div className="text-2xl font-bold text-text">
                     {diffTime > 0 ? '+' : ''}{diffTime} min
                   </div>
                   <div className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest">Journey time</div>
                 </div>
                 <div>
                   <div className="text-2xl font-bold text-text">
                     {diffPm25 > 0 ? '+' : ''}{diffPm25} µg/m³
                   </div>
                   <div className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest">Predicted PM₂.₅</div>
                 </div>
                 <div>
                   <div className="text-2xl font-bold text-text">
                     {diffHotspots > 0 ? '+' : ''}{diffHotspots}
                   </div>
                   <div className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest">Recurring hotspots</div>
                 </div>
              </div>
              
              <button 
                onClick={() => navigate('/live')}
                className="w-full bg-text text-white py-3 rounded text-sm font-semibold hover:bg-gray-800 transition-colors"
              >
                Select Variant
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoutesPlanner;
