// API Configuration
// You can modify these settings based on your deployment environment

const API_CONFIG = {
  // Production backend URL
  PRODUCTION_URL: 'https://image-ml-project.onrender.com',
  
  // Development backend URL (for local development)
  DEVELOPMENT_URL: 'http://localhost:5000',
  
  // Current environment - change this to switch between local and hosted
  CURRENT_ENV: 'production', // 'development' or 'production'
  
  // API endpoints
  ENDPOINTS: {
    HEALTH: '/api/health',
    PREDICT: '/api/predict',
    ROOT: '/api'
  }
};

// Get the base URL based on current environment
export const getBaseUrl = () => {
  return API_CONFIG.CURRENT_ENV === 'production' 
    ? API_CONFIG.PRODUCTION_URL 
    : API_CONFIG.DEVELOPMENT_URL;
};

// Get full URL for an endpoint
export const getApiUrl = (endpoint) => {
  return `${getBaseUrl()}${endpoint}`;
};

// Export configuration for use in components
export default API_CONFIG; 