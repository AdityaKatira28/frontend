import { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { DashboardLayout } from '../shared/components/dashboard/DashboardLayout';
import { apps, DEFAULT_ROUTE } from '../apps/registry';

// Lazy load pages
const NotFound = lazy(() => import('@/pages/NotFound'));

// Loading component for Suspense fallback
const Loading = () => (
  <div className="flex items-center justify-center h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
  </div>
);

export const AppRoutes = () => (
  <Suspense fallback={<Loading />}>
    <Routes>
      {/* Redirect root to default route */}
      <Route path="/" element={<Navigate to={DEFAULT_ROUTE} replace />} />
      
      {/* Main app routes with dashboard layout */}
      <Route element={<DashboardLayout />}>
        {apps.map((app) => (
          <Route
            key={app.id}
            path={`${app.path}/*`}
            element={
              <Suspense fallback={<Loading />}>
                <app.component />
              </Suspense>
            }
          />
        ))}
      </Route>

      {/* 404 - Keep this as the last route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  </Suspense>
);
