import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { Toaster } from "../sonner";

export const DashboardLayout: React.FC = () => {
  const location = useLocation();

  const handleToggleAssistant = () => {
    console.log('AI Assistant toggled');
    // TODO: Implement AI assistant toggle functionality
  };

  return (
    <div className="flex min-h-screen bg-slate-950">
      <Sidebar currentPath={location.pathname} />
      <div className="flex flex-col flex-1">
        <Header onToggleAssistant={handleToggleAssistant} />
        <main className="flex-1 p-6 overflow-auto bg-slate-950">
          <Outlet />
        </main>
      </div>
      <Toaster />
    </div>
  );
};
