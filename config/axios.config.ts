  // config/axios.config.ts
  import axios from 'axios';
  import { API_CONFIG } from './api.config';
  
  const axiosInstance = axios.create({
    baseURL: API_CONFIG.BASE_URL,
    headers: {
      'Content-Type': 'application/json'
    }
  });
  
  export default axiosInstance;