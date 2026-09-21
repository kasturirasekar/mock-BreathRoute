import React from 'react';
import { X, AlertTriangle } from 'lucide-react';
import { HOTSPOTS } from '../data';

interface HotspotPanelProps {
  hotspotId: string;
  onClose: () => void;
  onApplyAlternative?: () => void;
}

const HotspotPanel: React.FC<HotspotPanelProps> = ({ hotspotId, onClose, onApplyAlternative }) => {
  const hotspot = HOTSPOTS.find(h => h.id === hotspotId);

  if (!hotspot) return null;

  return (
    <div className="absolute top-0 right-0 h-full w-[400px] bg-white border-l border-border shadow-2xl z-50 flex flex-col animate-in slide-in-from-right duration-300">
      <div className="flex justify-between items-start p-6 border-b border-gray-100">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] font-bold bg-warning/10 text-warning px-2 py-1 rounded-sm uppercase tracking-wider">Recurring Hotspot</span>
          </div>
          <h2 className="text-xl font-bold text-text">{hotspot.name}</h2>
        </div>
        <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500">
          <X size={20} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-8">
        <div>
          <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Hotspot Profile</h3>
          <div className="grid grid-cols-2 gap-4 text-sm mb-6">
            <div className="bg-gray-50 p-3 rounded border border-gray-100">
              <div className="text-gray-500 mb-1">Peak PM₂.₅</div>
              <div className="font-bold text-danger text-lg">{hotspot.peakPM25} µg/m³</div>
            </div>
            <div className="bg-gray-50 p-3 rounded border border-gray-100">
              <div className="text-gray-500 mb-1">Avg Speed</div>
              <div className="font-bold text-text text-lg">{hotspot.averageSpeed} km/h</div>
            </div>
            <div className="bg-gray-50 p-3 rounded border border-gray-100">
              <div className="text-gray-500 mb-1">Typical Window</div>
              <div className="font-bold text-text text-lg">{hotspot.typicalTime}</div>
            </div>
            <div className="bg-gray-50 p-3 rounded border border-gray-100">
              <div className="text-gray-500 mb-1">Occurrences</div>
              <div className="font-bold text-text text-lg">{hotspot.occurrences}</div>
            </div>
          </div>
          
          <div className="text-sm text-gray-600 bg-gray-50 p-4 border border-border rounded leading-relaxed">
            Elevated environmental exposure repeatedly observed during the {hotspot.typicalTime} congestion window. High PM₂.₅ concentration directly correlates with low vehicle speed.
          </div>
        </div>

        <div>
          <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4 flex items-center gap-2">
             <AlertTriangle size={14} className="text-primary" />
             Action Opportunity
          </h3>
          <div className="border border-border p-5 rounded relative overflow-hidden">
             <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary"></div>
             <h4 className="font-bold text-text mb-2">Shift departure window</h4>
             <p className="text-sm text-gray-600 mb-4">
               Shift departure by approximately 10 minutes or use the lower-exposure route variant during the {hotspot.typicalTime} peak to reduce exposure by an estimated 62%.
             </p>
             {onApplyAlternative && (
               <button 
                 onClick={onApplyAlternative}
                 className="w-full bg-text text-white py-2.5 rounded text-sm font-semibold hover:bg-gray-800 transition-colors"
               >
                 Simulate Intervention
               </button>
             )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotspotPanel;
