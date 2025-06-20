export const ROUTES = {
  // Main app routes
  OVERVIEW: '/',
  THREAT_INTELLIGENCE: '/threat-intelligence',
  BUDGET_OPTIMIZATION: '/budget-optimization',
  INCIDENT_RESPONSE: '/incident-response',
  COMPLIANCE: '/compliance',
  ASSET_MANAGEMENT: '/asset-management',
  REPORTING: '/reporting',
  SETTINGS: '/settings',
  
  // Auth routes
  LOGIN: '/login',
  LOGOUT: '/logout',
  REGISTER: '/register',
  
  // Error routes
  NOT_FOUND: '/404',
  ERROR: '/error',
} as const;

export type RouteKey = keyof typeof ROUTES;

export const getRoute = (key: RouteKey): string => ROUTES[key];

export const APP_ROUTES = [
  {
    id: 'overview',
    path: ROUTES.OVERVIEW,
    label: 'Overview',
    description: 'Security dashboard overview',
    icon: 'BarChart3',
    enabled: true,
  },
  {
    id: 'threat-intelligence',
    path: ROUTES.THREAT_INTELLIGENCE,
    label: 'Threat Intelligence',
    description: 'Real-time threat monitoring',
    icon: 'AlertTriangle',
    enabled: true,
  },
  {
    id: 'budget-optimization',
    path: ROUTES.BUDGET_OPTIMIZATION,
    label: 'Budget Optimization',
    description: 'Security investment optimization',
    icon: 'Target',
    enabled: true,
  },
  {
    id: 'incident-response',
    path: ROUTES.INCIDENT_RESPONSE,
    label: 'Incident Response',
    description: 'Security incident management',
    icon: 'Shield',
    enabled: false, // Future app
  },
  {
    id: 'compliance',
    path: ROUTES.COMPLIANCE,
    label: 'Compliance',
    description: 'Regulatory compliance tracking',
    icon: 'CheckCircle',
    enabled: false, // Future app
  },
  {
    id: 'asset-management',
    path: ROUTES.ASSET_MANAGEMENT,
    label: 'Asset Management',
    description: 'Security asset inventory',
    icon: 'Database',
    enabled: false, // Future app
  },
  {
    id: 'reporting',
    path: ROUTES.REPORTING,
    label: 'Reporting',
    description: 'Security reports and analytics',
    icon: 'FileText',
    enabled: false, // Future app
  },
  {
    id: 'settings',
    path: ROUTES.SETTINGS,
    label: 'Settings',
    description: 'Application configuration',
    icon: 'Settings',
    enabled: false, // Future app
  },
] as const;

export type AppRoute = typeof APP_ROUTES[number]; 