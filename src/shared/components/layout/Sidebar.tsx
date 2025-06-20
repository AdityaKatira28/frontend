import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Shield, BarChart3, AlertTriangle, Target, Bot, CheckCircle, Database, FileText, Settings } from 'lucide-react';
import { cn } from '@/shared/utils/cn';
import { APP_ROUTES } from '@/config/routes';
import type { AppRoute } from '@/config/routes';

interface SidebarProps {
  currentApp: AppRoute;
}

const iconMap = {
  BarChart3,
  AlertTriangle,
  Target,
  Shield,
  CheckCircle,
  Database,
  FileText,
  Settings,
};

export const Sidebar: React.FC<SidebarProps> = ({ currentApp }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (route: AppRoute) => {
    if (route.enabled) {
      navigate(route.path);
    }
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
          {APP_ROUTES.map((route) => {
            const Icon = iconMap[route.icon as keyof typeof iconMap] || BarChart3;
            const isActive = location.pathname === route.path;
            
            return (
              <button
                key={route.id}
                onClick={() => handleNavigation(route)}
                disabled={!route.enabled}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-200",
                  isActive
                    ? "bg-purple-600 text-white shadow-lg"
                    : route.enabled
                    ? "text-slate-300 hover:bg-slate-800 hover:text-white"
                    : "text-slate-500 cursor-not-allowed opacity-50"
                )}
                title={route.description}
              >
                <Icon className="h-5 w-5" />
                <div className="flex-1">
                  <div className="font-medium">{route.label}</div>
                  {route.description && (
                    <div className="text-xs opacity-75">{route.description}</div>
                  )}
                </div>
                {!route.enabled && (
                  <span className="text-xs bg-slate-700 text-slate-300 px-2 py-1 rounded">
                    Coming Soon
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
}; 