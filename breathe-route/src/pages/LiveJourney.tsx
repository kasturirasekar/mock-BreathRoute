import { useState, useEffect } from 'react';
import { Play, Square } from 'lucide-react';
import MapView from '../components/MapView';
import { LIVE_TELEMETRY, ROUTES, BUSES } from '../data';

const LiveJourney = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [telemetryIndex, setTelemetryIndex] = useState(6); // Start at index 6 which is 07:42
  const [showWarning, setShowWarning] = useState(false);
  
  const currentTelemetry = LIVE_TELEMETRY[telemetryIndex];
  const route = ROUTES.find(r => r.routeId === 'RT-07') || ROUTES[0];
  const bus = BUSES.find(b => b.busId === 'BR-024') || BUSES[3];
  
  // Progress percentage directly from telemetry
  const progress = currentTelemetry.progressPercent;

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isPlaying && telemetryIndex < LIVE_TELEMETRY.length - 1) {
      interval = setInterval(() => {
        setTelemetryIndex(prev => {
          const next = prev + 1;
          
          if (LIVE_TELEMETRY[next].pm25 > 80) {
            setShowWarning(true);
          } else {
            setShowWarning(false);
          }
          
          if (next >= LIVE_TELEMETRY.length - 1) {
            setIsPlaying(false);
            return LIVE_TELEMETRY.length - 1;
          }
          return next;
        });
      }, 1500);
    }
    return () => clearInterval(interval);
  }, [isPlaying, telemetryIndex]);

  return (
    <div className="flex flex-col h-full bg-background relative">
      <div className="p-8 pb-4 flex justify-between items-start z-10 bg-white border-b border-border">
        <div>
          <div className="flex gap-4 items-center mb-1">
             <h2 className="text-xs font-bold text-gray-500 tracking-widest uppercase">{bus.busId} · {route.routeName}</h2>
             <div className="flex items-center gap-2 text-[10px] font-bold text-primary uppercase tracking-widest bg-primary/10 px-2 py-1 rounded">
               <div className={`w-1.5 h-1.5 rounded-full bg-primary ${isPlaying ? 'animate-pulse' : ''}`}></div>
               {progress >= 100 ? 'COMPLETED' : isPlaying ? 'IN TRANSIT' : 'IN TRANSIT'}
             </div>
          </div>
          <h1 className="text-3xl font-bold text-text mb-4 tracking-tight">Live Journey</h1>
          
          <div className="flex gap-12 text-sm">
             <div>
                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Departure</div>
                <div className="font-semibold text-text">{route.departureTime} AM</div>
             </div>
             <div>
                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Current Time</div>
                <div className="font-semibold text-text">{currentTelemetry.timestamp} AM</div>
             </div>
             <div>
                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Boarding</div>
                <div className="font-semibold text-text">{route.assignedStudentCount} <span className="text-gray-400">/ {bus.capacity}</span></div>
             </div>
             <div>
                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Current Segment</div>
                <div className="font-semibold text-text">{currentTelemetry.segmentId}</div>
             </div>
          </div>
        </div>
        
        <div className="flex gap-4">
          <button 
             onClick={() => { setTelemetryIndex(0); setIsPlaying(false); setShowWarning(false); }}
             className="px-6 py-2 text-sm font-semibold text-gray-600 hover:text-text transition-colors"
          >
            Reset
          </button>
          {isPlaying ? (
            <button 
              onClick={() => setIsPlaying(false)}
              className="flex items-center gap-2 bg-white border border-border hover:bg-gray-50 text-text px-6 py-2 rounded text-sm font-semibold transition-all"
            >
              <Square size={16} /> Pause
            </button>
          ) : (
            <button 
              onClick={() => setIsPlaying(true)}
              className="flex items-center gap-2 bg-text hover:bg-gray-800 text-white px-6 py-2 rounded text-sm font-semibold transition-all"
              disabled={progress >= 100}
            >
              <Play size={16} /> {progress === 0 ? 'Start Journey' : 'Resume'}
            </button>
          )}
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        <div className="w-[70%] h-full relative flex flex-col">
          <div className="flex-1 relative">
            <MapView routePath={route.path} busPosition={currentTelemetry.location} />
          </div>
          
          <div className="h-32 bg-white border-t border-border p-6 flex flex-col justify-center relative">
            {showWarning && (
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white border border-danger shadow-lg px-6 py-3 rounded flex flex-col items-center">
                 <div className="text-[10px] font-bold text-danger uppercase tracking-widest mb-1 flex items-center gap-2">
                   <div className="w-1.5 h-1.5 bg-danger rounded-full animate-pulse"></div>
                   Elevated Exposure
                 </div>
                 <div className="text-sm font-bold text-text">University Road Junction</div>
                 <div className="text-xs text-gray-500 mt-1">PM₂.₅ {currentTelemetry.pm25} µg/m³ · Speed {currentTelemetry.speed} km/h</div>
                 <div className="text-[10px] text-gray-400 mt-2">Elevated concentration coincides with low vehicle speed.</div>
              </div>
            )}
          
            <div className="flex justify-between text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">
              <span>07:15</span>
              <span>07:30</span>
              <span>07:45</span>
              <span>07:55</span>
            </div>
            <div className="w-full h-1 bg-gray-200 relative mb-4">
               <div className="absolute top-0 left-0 h-full bg-text transition-all duration-300" style={{ width: `${progress}%` }}></div>
               {/* Timeline markers */}
               <div className="absolute top-1/2 left-[0%] w-2 h-2 rounded-full bg-gray-400 -translate-y-1/2"></div>
               <div className="absolute top-1/2 left-[33%] w-2 h-2 rounded-full bg-gray-400 -translate-y-1/2"></div>
               <div className="absolute top-1/2 left-[66%] w-2 h-2 rounded-full bg-gray-400 -translate-y-1/2"></div>
               <div className="absolute top-1/2 left-[100%] w-2 h-2 rounded-full bg-gray-400 -translate-y-1/2"></div>
            </div>
          </div>
        </div>
        
        {/* Right Panel */}
        <div className="w-[30%] h-full bg-white border-l border-border p-8 overflow-y-auto">
          <h3 className="font-bold text-[10px] text-gray-500 uppercase tracking-widest mb-8">Environmental Telemetry</h3>
          
          <div className="space-y-8">
            <div className="border-b border-border pb-6">
              <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">PM₂.₅</div>
              <div className={`text-4xl font-bold tracking-tight ${currentTelemetry.pm25 > 80 ? 'text-danger' : 'text-text'}`}>
                {currentTelemetry.pm25} <span className="text-sm text-gray-500 font-semibold tracking-normal">µg/m³</span>
              </div>
            </div>
            
            <div className="border-b border-border pb-6">
              <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">PM₁₀</div>
              <div className="text-2xl font-bold text-text">
                {currentTelemetry.pm10} <span className="text-sm text-gray-500 font-semibold tracking-normal">µg/m³</span>
              </div>
            </div>
            
            <div className="border-b border-border pb-6">
              <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Temperature</div>
              <div className="text-2xl font-bold text-text">{currentTelemetry.temperature}°C</div>
            </div>
            
            <div className="border-b border-border pb-6">
              <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Humidity</div>
              <div className="text-2xl font-bold text-text">{currentTelemetry.humidity}%</div>
            </div>
            
            <div className="border-b border-border pb-6">
              <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Speed</div>
              <div className="text-2xl font-bold text-text">{currentTelemetry.speed} <span className="text-sm text-gray-500 font-semibold tracking-normal">km/h</span></div>
            </div>
            
            <div>
              <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Traffic</div>
              <div className="text-xl font-bold text-text">{currentTelemetry.traffic}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveJourney;
