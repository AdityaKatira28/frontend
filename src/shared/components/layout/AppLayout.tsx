import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { AIAssistant } from './AIAssistant';
import { Toaster } from '@/shared/components/ui/toaster';
import { APP_ROUTES } from '@/config/routes';

interface AppLayoutProps {
  children?: React.ReactNode;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);
  const location = useLocation();

  const handleToggleAssistant = () => {
    setIsAssistantOpen(!isAssistantOpen);
  };

  const getCurrentApp = () => {
    const currentRoute = APP_ROUTES.find(route => route.path === location.pathname);
    return currentRoute || APP_ROUTES[0];
  };

  return (
    <div className="flex min-h-screen bg-slate-950">
      <Sidebar currentApp={getCurrentApp()} />
      <div className="flex flex-col flex-1">
        <Header 
          currentApp={getCurrentApp()} 
          onToggleAssistant={handleToggleAssistant} 
        />
        <main className="flex-1 p-6 overflow-auto bg-slate-950">
          {children || <Outlet />}
        </main>
      </div>
      <AIAssistant isOpen={isAssistantOpen} onClose={() => setIsAssistantOpen(false)} />
      <Toaster />
    </div>
  );
}; 