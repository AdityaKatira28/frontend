import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@shared/components/card';
import { AlertTriangle, ArrowRight, CheckCircle2 } from 'lucide-react';

const alerts = [
  {
    id: 1,
    type: 'warning',
    title: 'Suspicious login attempt',
    time: '2 minutes ago',
    description: 'Login attempt from new device in New York, NY',
    resolved: false
  },
  {
    id: 2,
    type: 'info',
    title: 'System update available',
    time: '1 hour ago',
    description: 'Security patch v2.4.1 is ready to install',
    resolved: true
  },
  {
    id: 3,
    type: 'critical',
    title: 'Unusual traffic detected',
    time: '3 hours ago',
    description: 'Spike in incoming requests from suspicious IPs',
    resolved: false
  },
  {
    id: 4,
    type: 'info',
    title: 'Backup completed',
    time: '5 hours ago',
    description: 'Nightly backup completed successfully',
    resolved: true
  }
];

export const RecentAlerts: React.FC = () => {
  return (
    <Card className="bg-slate-900 border-slate-800">
      <CardHeader>
        <CardTitle className="text-white">Recent Alerts</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {alerts.map((alert) => (
            <div key={alert.id} className="flex items-start space-x-3">
              <div className={`pt-1 ${
                alert.type === 'critical' ? 'text-red-500' : 
                alert.type === 'warning' ? 'text-yellow-500' : 'text-blue-500'
              }`}>
                {alert.resolved ? (
                  <CheckCircle2 className="h-4 w-4" />
                ) : (
                  <AlertTriangle className="h-4 w-4" />
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium text-white">{alert.title}</h4>
                  <span className="text-xs text-slate-500">{alert.time}</span>
                </div>
                <p className="text-sm text-slate-400">{alert.description}</p>
              </div>
              <button className="text-slate-500 hover:text-white">
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentAlerts;
