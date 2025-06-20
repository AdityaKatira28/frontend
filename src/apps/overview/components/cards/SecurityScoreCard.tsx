import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@shared/components/card';

export const SecurityScoreCard: React.FC = () => {
  return (
    <Card className="h-full bg-slate-900 border-slate-800">
      <CardHeader>
        <CardTitle className="text-white text-lg">Security Score</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center justify-center h-40">
          <div className="text-4xl font-bold text-green-500 mb-2">87</div>
          <div className="text-sm text-slate-400">Good</div>
          <div className="w-full bg-slate-700 rounded-full h-2.5 mt-4">
            <div className="bg-green-500 h-2.5 rounded-full" style={{ width: '87%' }}></div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SecurityScoreCard;
