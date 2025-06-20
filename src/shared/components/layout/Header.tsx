import React from 'react';
import { Bot, Bell, User, Settings } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import { Badge } from '@/shared/components/ui/badge';
import type { AppRoute } from '@/config/routes';

interface HeaderProps {
  currentApp: AppRoute;
  onToggleAssistant: () => void;
}

export const Header: React.FC<HeaderProps> = ({ currentApp, onToggleAssistant }) => {
  return (
    <header className="bg-slate-900 border-b border-slate-800 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div>
            <h1 className="text-xl font-semibold text-white">{currentApp.label}</h1>
            <p className="text-sm text-slate-400">{currentApp.description}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleAssistant}
            className="text-slate-300 hover:text-white hover:bg-slate-800"
          >
            <Bot className="h-4 w-4 mr-2" />
            AI Assistant
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            className="text-slate-300 hover:text-white hover:bg-slate-800 relative"
          >
            <Bell className="h-4 w-4" />
            <Badge 
              variant="destructive" 
              className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
            >
              3
            </Badge>
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            className="text-slate-300 hover:text-white hover:bg-slate-800"
          >
            <User className="h-4 w-4 mr-2" />
            Profile
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            className="text-slate-300 hover:text-white hover:bg-slate-800"
          >
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  );
}; 