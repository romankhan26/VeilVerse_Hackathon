import axios from 'axios';
import { getToken, removeToken, removeUser } from './auth';

export const setupAxiosInterceptors = () => {
  // Request Interceptor
  axios.interceptors.request.use((config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  // Response Interceptor
  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        removeUser();
        removeToken();
        navigate('/login'); // or use navigate() in React context
      }
      return Promise.reject(error);
    }
  );
};
