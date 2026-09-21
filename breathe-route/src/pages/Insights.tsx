import { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { NETWORK_STATS } from '../data';

const mockChartData = [
  { time: '07:15', pm25: 31 },
  { time: '07:20', pm25: 34 },
  { time: '07:25', pm25: 37 },
  { time: '07:30', pm25: 42 },
  { time: '07:35', pm25: 51 },
  { time: '07:40', pm25: 64 },
  { time: '07:44', pm25: 82 }, // Peak
  { time: '07:48', pm25: 76 },
  { time: '07:52', pm25: 61 },
  { time: '07:58', pm25: 47 },
  { time: '08:03', pm25: 39 },
];

type ViewMode = 'journey' | 'route' | 'network';

const Insights = () => {
  const [showIntervention, setShowIntervention] = useState(false);
  const [showVerification, setShowVerification] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>('journey');

  return (
    <div className="flex flex-col h-full bg-white overflow-y-auto">
      <div className="p-8 border-b border-border bg-white z-10 flex justify-between items-end">
        <div>
          <h2 className="text-xs font-bold text-gray-500 tracking-widest uppercase mb-2">Exposure Insights</h2>
          <h1 className="text-3xl font-bold text-text tracking-tight mb-2">Understand where environmental exposure accumulates across repeated journeys.</h1>
        </div>
        
        <div className="flex bg-gray-50 p-1 border border-border rounded">
           <button onClick={() => setViewMode('journey')} className={`px-4 py-1.5 text-xs font-bold uppercase tracking-widest rounded ${viewMode === 'journey' ? 'bg-white shadow-sm border border-gray-200 text-text' : 'text-gray-400 hover:text-text'}`}>Current Journey</button>
           <button onClick={() => setViewMode('route')} className={`px-4 py-1.5 text-xs font-bold uppercase tracking-widest rounded ${viewMode === 'route' ? 'bg-white shadow-sm border border-gray-200 text-text' : 'text-gray-400 hover:text-text'}`}>Route</button>
           <button onClick={() => setViewMode('network')} className={`px-4 py-1.5 text-xs font-bold uppercase tracking-widest rounded ${viewMode === 'network' ? 'bg-white shadow-sm border border-gray-200 text-text' : 'text-gray-400 hover:text-text'}`}>School Network</button>
        </div>
      </div>

      <div className="p-8">
        {viewMode === 'network' ? (
           <div className="animate-in fade-in">
              <h3 className="text-sm font-bold text-text uppercase tracking-widest mb-6">School Network Aggregates</h3>
              <div className="grid grid-cols-4 gap-8 mb-12">
                <div className="bg-gray-50 border border-border p-6">
                  <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Average PM₂.₅ across monitored journeys</div>
                  <div className="text-3xl font-bold text-text">43 µg/m³</div>
                </div>
                <div className="bg-gray-50 border border-border p-6">
                  <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Daily journey count</div>
                  <div className="text-3xl font-bold text-text">48</div>
                </div>
                <div className="bg-gray-50 border border-border p-6">
                  <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Recurring hotspot count</div>
                  <div className="text-3xl font-bold text-warning">{NETWORK_STATS.recurringHotspots}</div>
                </div>
                <div className="bg-gray-50 border border-border p-6">
                  <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Average route duration</div>
                  <div className="text-3xl font-bold text-text">37 min</div>
                </div>
              </div>
           </div>
        ) : (
          <>
            <div className="flex gap-12 border-b border-border pb-8 mb-8">
              <div>
                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Average PM₂.₅</div>
                <div className="text-2xl font-bold text-text">44 µg/m³</div>
              </div>
              <div>
                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Peak PM₂.₅</div>
                <div className="text-2xl font-bold text-danger">82 µg/m³</div>
              </div>
              <div>
                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">High-exposure duration</div>
                <div className="text-2xl font-bold text-text">6 min</div>
              </div>
              <div>
                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Journey duration</div>
                <div className="text-2xl font-bold text-text">39 min</div>
              </div>
            </div>

            <div className="flex gap-8 h-[400px]">
              {/* Main Chart */}
              <div className="w-[60%] flex flex-col">
                <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">PM₂.₅ Through Journey</h3>
                <div className="flex-1 bg-gray-50/50 border border-border p-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={mockChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorPm25" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#164E36" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#164E36" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#9CA3AF' }} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#9CA3AF' }} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#111827', color: 'white', border: 'none', borderRadius: '4px', fontSize: '12px' }}
                        itemStyle={{ color: 'white' }}
                      />
                      <ReferenceLine x="07:44" stroke="#991B1B" strokeDasharray="3 3" label={{ position: 'top', value: 'Traffic Peak', fill: '#991B1B', fontSize: 10 }} />
                      <Area type="monotone" dataKey="pm25" stroke="#164E36" strokeWidth={2} fillOpacity={1} fill="url(#colorPm25)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Segments and Hotspot */}
              <div className="w-[40%] flex flex-col gap-6">
                <div>
                  <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">Exposure By Road Segment</h3>
                  <div className="space-y-3 font-mono text-xs">
                    <div>
                      <div className="text-gray-500 mb-1">University Road</div>
                      <div className="text-danger">████████████</div>
                    </div>
                    <div>
                      <div className="text-gray-500 mb-1">Pashan Road</div>
                      <div className="text-warning">███████</div>
                    </div>
                    <div>
                      <div className="text-gray-500 mb-1">Baner Road</div>
                      <div className="text-primary">█████</div>
                    </div>
                    <div>
                      <div className="text-gray-500 mb-1">Aundh Road</div>
                      <div className="text-primary">████</div>
                    </div>
                  </div>
                </div>

                <div 
                  className={`border p-5 cursor-pointer transition-all ${showIntervention ? 'border-text shadow-sm' : 'border-border hover:border-gray-400'}`}
                  onClick={() => setShowIntervention(true)}
                >
                  <h3 className="text-[10px] font-bold text-danger uppercase tracking-widest mb-3">Recurring Hotspot</h3>
                  <div className="text-lg font-bold text-text mb-4">University Road Junction</div>
                  
                  <div className="grid grid-cols-2 gap-y-4 text-sm mb-4">
                    <div>
                      <div className="text-[10px] text-gray-400 uppercase font-bold">Observed Journeys</div>
                      <div className="font-semibold text-text">18</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-gray-400 uppercase font-bold">Typical Window</div>
                      <div className="font-semibold text-text">07:35–08:05</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-gray-400 uppercase font-bold">Peak PM₂.₅</div>
                      <div className="font-semibold text-danger">91 µg/m³</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-gray-400 uppercase font-bold">Average Speed</div>
                      <div className="font-semibold text-text">9 km/h</div>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500">
                    Elevated PM₂.₅ repeatedly coincides with low vehicle speeds during the morning peak.
                  </p>
                </div>
              </div>
            </div>

            {/* Action Panel */}
            {showIntervention && !showVerification && (
              <div className="mt-8 border-t border-border pt-8 animate-in fade-in slide-in-from-bottom-4">
                <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">Action Opportunity</h3>
                <div className="bg-gray-50/50 border border-border p-6 flex items-start gap-12">
                  <div className="flex-1">
                    <h4 className="font-bold text-text mb-2">Morning congestion event</h4>
                    <div className="text-sm text-gray-500 mb-4">
                      <span className="font-semibold text-text">Observed:</span> 18 journeys <br/>
                      <span className="font-semibold text-text">Typical window:</span> 07:35–08:05
                    </div>
                    <div className="text-sm font-semibold text-primary bg-primary/5 p-3 border-l-2 border-primary">
                      Shift departure by approximately 10 minutes or use the lower-exposure route during the peak window.
                    </div>
                  </div>
                  
                  <div className="flex-1 flex gap-8 text-sm">
                    <div>
                      <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Current</div>
                      <div className="font-semibold text-text mb-1">38 min</div>
                      <div className="font-semibold text-text mb-1">4 hotspots</div>
                      <div className="font-semibold text-warning">43 µg/m³ predicted PM₂.₅</div>
                    </div>
                    <div>
                      <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Alternative</div>
                      <div className="font-semibold text-text mb-1">43 min</div>
                      <div className="font-semibold text-text mb-1">1 hotspot</div>
                      <div className="font-semibold text-primary">34 µg/m³ predicted PM₂.₅</div>
                    </div>
                  </div>

                  <div>
                    <button 
                      onClick={() => setShowVerification(true)}
                      className="bg-text text-white px-6 py-3 rounded text-sm font-semibold hover:bg-gray-800 transition-colors"
                    >
                      Apply to Next Journey
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Verification */}
            {showVerification && (
              <div className="mt-8 border-t border-border pt-8 animate-in fade-in slide-in-from-bottom-4">
                <h3 className="text-[10px] font-bold text-primary uppercase tracking-widest mb-4 flex items-center gap-2">
                   <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                   Intervention Check
                </h3>
                <div className="bg-gray-50/50 border border-border p-6 flex items-start gap-12 relative overflow-hidden">
                  <div className="absolute top-4 right-4 text-[9px] text-gray-400 uppercase tracking-widest">
                    Illustrative simulation
                  </div>
                  
                  <div className="flex-1 flex gap-12 text-sm">
                    <div>
                      <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">Before (Observed)</div>
                      <div className="text-xl font-bold text-text mb-1">52 µg/m³</div>
                      <div className="text-gray-500 mb-3">Average PM₂.₅</div>
                      
                      <div className="text-xl font-bold text-text mb-1">8</div>
                      <div className="text-gray-500 mb-3">High-exposure events</div>
                      
                      <div className="text-xl font-bold text-text mb-1">39 min</div>
                      <div className="text-gray-500">Duration</div>
                    </div>
                    
                    <div>
                      <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">After (Simulated)</div>
                      <div className="text-xl font-bold text-primary mb-1">41 µg/m³</div>
                      <div className="text-gray-500 mb-3">Average PM₂.₅</div>
                      
                      <div className="text-xl font-bold text-primary mb-1">3</div>
                      <div className="text-gray-500 mb-3">High-exposure events</div>
                      
                      <div className="text-xl font-bold text-text mb-1">43 min</div>
                      <div className="text-gray-500">Duration</div>
                    </div>
                  </div>
                  
                  <div className="flex-1">
                     <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Simulated Impact</h4>
                     <p className="text-sm font-semibold text-text">
                       By shifting the departure window and avoiding the primary congestion node, peak exposure events are reduced by 62.5%, at a cost of 4 minutes added journey time.
                     </p>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Insights;
