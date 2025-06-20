import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/shared/components/ui/button';
import { AlertTriangle, Home } from 'lucide-react';

export const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950">
      <div className="text-center">
        <div className="mb-8">
          <AlertTriangle className="h-24 w-24 text-red-500 mx-auto mb-4" />
          <h1 className="text-6xl font-bold text-white mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-slate-300 mb-2">Page Not Found</h2>
          <p className="text-slate-400 mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>
        
        <div className="space-x-4">
          <Button asChild>
            <Link to="/">
              <Home className="h-4 w-4 mr-2" />
              Go Home
            </Link>
          </Button>
          <Button variant="outline" onClick={() => window.history.back()}>
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
}; 