// Environment configuration
export const ENV = {
  // Railway backend URL
  API_BASE_URL: 'https://backend-production-6b38.up.railway.app',
  
  // API timeout
  API_TIMEOUT: 10000,
  
  // Development mode
  IS_DEV: import.meta.env.DEV,
  
  // Production mode
  IS_PROD: import.meta.env.PROD,
  
  // App version
  APP_VERSION: '2.0.0',
  
  // App name
  APP_NAME: 'CyberWise AI Advisor'
} as const;

export default ENV;

