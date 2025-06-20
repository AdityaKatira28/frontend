import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Shield } from 'lucide-react';
import { cn } from '@/lib/utils';
import { apps } from '@/apps/registry';

interface SidebarProps {
  currentPath: string;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentPath }) => {
  const isActive = (path: string) => {
    return currentPath.startsWith(path);
  };

  return (
    <div className="w-64 bg-slate-900 border-r border-slate-800 flex-shrink-0">
      <div className="p-6">
        <div className="flex items-center gap-2 mb-8">
          <Shield className="h-8 w-8 text-purple-500" />
          <div>
            <h1 className="text-xl font-bold text-white">SecureAI</h1>
            <p className="text-sm text-slate-400">Security Investment Platform</p>
          </div>
        </div>
        
        <nav className="space-y-2">
          {apps.map((app) => {
            const Icon = app.icon;
            const isItemActive = isActive(app.path);
            
            return (
              <Link
                key={app.id}
                to={app.path}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-200",
                  isItemActive
                    ? "bg-purple-600 text-white shadow-lg"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                )}
              >
                <Icon className="h-5 w-5" />
                {app.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
};
