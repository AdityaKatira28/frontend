export const ENVIRONMENTS = {
  development: {
    API_BASE_URL: 'http://localhost:3000',
    RAILWAY_API_URL: 'https://backend-production-6b38.up.railway.app',
    ENVIRONMENT: 'development',
    DEBUG: true,
  },
  staging: {
    API_BASE_URL: 'https://staging-api.secureai.com',
    RAILWAY_API_URL: 'https://backend-production-6b38.up.railway.app',
    ENVIRONMENT: 'staging',
    DEBUG: true,
  },
  production: {
    API_BASE_URL: 'https://api.secureai.com',
    RAILWAY_API_URL: 'https://backend-production-6b38.up.railway.app',
    ENVIRONMENT: 'production',
    DEBUG: false,
  },
} as const;

export type Environment = keyof typeof ENVIRONMENTS;

export const getEnvironment = (): Environment => {
  const env = (import.meta.env.MODE || 'development') as Environment;
  return ENVIRONMENTS[env] ? env : 'development';
};

export const getConfig = () => {
  const env = getEnvironment();
  return ENVIRONMENTS[env];
};

export const config = getConfig(); 