import React from 'react';

export const ThreatLevelChart: React.FC = () => {
  return (
    <div className="h-full w-full">
      <div className="h-64 flex items-center justify-center">
        <div className="text-center">
          <p className="text-slate-400">Threat Level Chart</p>
          <p className="text-sm text-slate-500 mt-2">Threat level visualization will be displayed here</p>
        </div>
      </div>
    </div>
  );
};

export default ThreatLevelChart;
