import { BarChart3, AlertTriangle, Target } from 'lucide-react';
import { lazy } from 'react';

// Lazy load app components with proper export handling
const lazyLoad = <T extends React.ComponentType<any>>(
  factory: () => Promise<{ default: T }>
) => lazy(factory);

const OverviewDashboard = lazyLoad(() => import('./overview/components/OverviewDashboard')
  .then(module => ({ default: module.default }))
  .catch(() => import('./overview/components/OverviewDashboard')
    .then(module => ({ default: module.OverviewDashboard }))
  )
);

const ThreatDashboard = lazyLoad(() => import('./threat/components/ThreatDashboard')
  .then(module => ({ default: module.default }))
  .catch(() => import('./threat/components/ThreatDashboard')
    .then(module => ({ default: module.ThreatDashboard }))
  )
);

const BudgetDashboard = lazyLoad(() => import('./budget/components/BudgetOptimizationDashboard')
  .then(module => ({ default: module.default }))
  .catch(() => import('./budget/components/BudgetOptimizationDashboard')
    .then(module => ({ default: module.BudgetOptimizationDashboard }))
  )
);

export type AppId = 'overview' | 'threats' | 'budget';

export interface AppRoute {
  id: AppId;
  path: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  component: React.ComponentType;
  description?: string;
}

export const apps: AppRoute[] = [
  {
    id: 'overview',
    path: '/overview',
    label: 'Overview',
    icon: BarChart3,
    component: OverviewDashboard,
    description: 'View security metrics and analytics'
  },
  {
    id: 'threats',
    path: '/threats',
    label: 'Threat Intelligence',
    icon: AlertTriangle,
    component: ThreatDashboard,
    description: 'Monitor and analyze security threats'
  },
  {
    id: 'budget',
    path: '/budget',
    label: 'Budget Optimization',
    icon: Target,
    component: BudgetDashboard,
    description: 'Optimize security budget allocation'
  }
];

// Helper to get app by id
export const getAppById = (id: string): AppRoute | undefined => {
  return apps.find(app => app.id === id);
};

// Helper to get app by path
export const getAppByPath = (path: string): AppRoute | undefined => {
  return apps.find(app => path.startsWith(app.path));
};

// Default route (redirects to overview)
export const DEFAULT_ROUTE = '/overview';
