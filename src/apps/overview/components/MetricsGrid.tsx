import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@shared/components/card';
import { AlertTriangle, Shield, Target, TrendingUp } from 'lucide-react';

const metrics = [
  {
    title: 'Total Threats',
    value: '24',
    change: '+12%',
    icon: AlertTriangle,
    iconColor: 'text-red-500',
    bgColor: 'bg-red-500/10'
  },
  {
    title: 'Security Score',
    value: '87',
    change: '+5%',
    icon: Shield,
    iconColor: 'text-green-500',
    bgColor: 'bg-green-500/10'
  },
  {
    title: 'Vulnerabilities',
    value: '8',
    change: '-3%',
    icon: Target,
    iconColor: 'text-yellow-500',
    bgColor: 'bg-yellow-500/10'
  },
  {
    title: 'Performance',
    value: '94%',
    change: '+2%',
    icon: TrendingUp,
    iconColor: 'text-blue-500',
    bgColor: 'bg-blue-500/10'
  }
];

export const MetricsGrid: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((metric, index) => (
        <Card key={index} className="bg-slate-900 border-slate-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-400">
              {metric.title}
            </CardTitle>
            <div className={`h-8 w-8 rounded-full flex items-center justify-center ${metric.bgColor}`}>
              <metric.icon className={`h-4 w-4 ${metric.iconColor}`} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{metric.value}</div>
            <p className="text-xs text-slate-500 mt-1">
              <span className={metric.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}>
                {metric.change}
              </span>{' '}
              from last month
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default MetricsGrid;
