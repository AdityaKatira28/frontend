import React from 'react';
import { Card, CardContent } from '@shared/components/card';

export const ThreatMapVisualization: React.FC = () => {
  return (
    <Card className="h-full bg-slate-900 border-slate-800">
      <CardContent className="p-6">
        <div className="h-64 flex items-center justify-center">
          <div className="text-center">
            <p className="text-slate-400">Threat Map Visualization</p>
            <p className="text-sm text-slate-500 mt-2">Interactive map showing threat locations will be displayed here</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ThreatMapVisualization;
