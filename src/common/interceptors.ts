import { config } from '@/config';
import { getToken } from '@/lib/api/auth';
import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: `${config.baseUrl}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const token = await getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
