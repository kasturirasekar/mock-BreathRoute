import { useState } from 'react';
import { Link } from 'react-router-dom';
import MapView from '../components/MapView';
import HotspotPanel from '../components/HotspotPanel';
import { ROUTES, SCHOOL, NETWORK_STATS } from '../data';

const Overview = () => {
  const [selectedHotspot, setSelectedHotspot] = useState<string | null>(null);
  
  const defaultRoute = ROUTES.find(r => r.routeId === 'RT-07') || ROUTES[0];

  return (
    <div className="flex flex-col h-full">
      <div className="p-8 pb-4">
        <h2 className="text-xs font-bold text-gray-500 tracking-widest uppercase mb-2">Morning Operations</h2>
        <h1 className="text-3xl font-bold text-text mb-6 tracking-tight">Plan lower-exposure school journeys.</h1>

        <div className="flex gap-12 border-t border-b border-border py-4">
          <div>
            <div className="text-2xl font-bold text-text">{SCHOOL.activeRoutes}</div>
            <div className="text-[10px] font-semibold text-gray-500 uppercase tracking-widest">Active Routes</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-text">{SCHOOL.activeBuses}</div>
            <div className="text-[10px] font-semibold text-gray-500 uppercase tracking-widest">Buses in Fleet</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-text">{SCHOOL.transportUsers.toLocaleString()}</div>
            <div className="text-[10px] font-semibold text-gray-500 uppercase tracking-widest">Students Transported</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-text text-warning">{NETWORK_STATS.recurringHotspots}</div>
            <div className="text-[10px] font-semibold text-gray-500 uppercase tracking-widest">Recurring Hotspots</div>
          </div>
        </div>
        <div className="text-xs text-gray-500 mt-3">{SCHOOL.activeBuses} buses currently assigned to today's operations</div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        <div className="w-[65%] h-full relative">
          <MapView 
            routePath={defaultRoute.path} 
            onHotspotClick={(id) => setSelectedHotspot(id)} 
          />
        </div>
        
        <div className="w-[35%] h-full bg-white border-l border-border p-8 flex flex-col overflow-y-auto">
          <h3 className="font-bold text-[10px] text-gray-500 uppercase tracking-widest mb-4">Today's Dispatch</h3>
          
          <div className="text-xl font-bold text-text mb-1">{SCHOOL.name}</div>
          <div className="text-sm font-semibold text-gray-500 mb-6">Morning Network</div>
          
          <div className="space-y-3 text-sm border-b border-border pb-6 mb-6">
            <div className="flex justify-between">
               <span className="text-gray-500">Scheduled Routes</span>
               <span className="font-semibold">{SCHOOL.activeRoutes}</span>
            </div>
            <div className="flex justify-between">
               <span className="text-gray-500">Buses Active</span>
               <span className="font-semibold">{SCHOOL.activeBuses}</span>
            </div>
            <div className="flex justify-between">
               <span className="text-gray-500">Students Expected</span>
               <span className="font-semibold">{SCHOOL.transportUsers.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
               <span className="text-gray-500">Peak Departure</span>
               <span className="font-semibold">{SCHOOL.morningWindow}</span>
            </div>
          </div>

          <div className="bg-gray-50 border border-border p-4 rounded mb-6">
            <div className="text-[10px] font-bold text-primary uppercase tracking-widest mb-1">{defaultRoute.routeId}</div>
            <div className="font-bold text-sm mb-3">Baner → Central Campus</div>
            
            <div className="flex gap-6 text-sm mb-3">
               <div>
                 <span className="font-semibold">{defaultRoute.assignedStudentCount}</span> <span className="text-gray-500">students</span>
               </div>
               <div>
                 <span className="font-semibold">{defaultRoute.scheduledDurationMin}</span> <span className="text-gray-500">min scheduled</span>
               </div>
            </div>
            
            <div className="flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-widest">
               <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></div>
               {defaultRoute.status === 'ACTIVE' ? 'IN TRANSIT' : 'SCHEDULED'}
            </div>
          </div>

          <div className="mt-auto">
            <div className="text-[10px] font-bold text-warning uppercase tracking-widest mb-2">Today's Route Insight</div>
            <p className="text-sm text-gray-600 mb-2">
              {defaultRoute.routeId} is approaching University Road during the recurring 07:35–08:05 congestion window.
            </p>
            <p className="text-sm font-semibold text-text mb-4">
              Consider the lower-exposure route variant for the next morning departure.
            </p>
            <Link 
              to="/routes"
              className="flex items-center justify-center w-full bg-text text-white py-3 rounded text-sm font-semibold hover:bg-gray-800 transition-colors"
            >
              Review Route
            </Link>
          </div>
        </div>
      </div>

      {selectedHotspot && (
        <HotspotPanel 
          hotspotId={selectedHotspot} 
          onClose={() => setSelectedHotspot(null)} 
        />
      )}
    </div>
  );
};

export default Overview;
