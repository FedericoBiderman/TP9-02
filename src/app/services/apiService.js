import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const baseURL = 'http://localhost:3000';

export const useApiService = () => {
  const { getToken } = useAuth();

  const apiClient = axios.create({
    baseURL,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  apiClient.interceptors.request.use((config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  const get = (url, config = {}) => apiClient.get(url, config);
  const post = (url, data, config = {}) => apiClient.post(url, data, config);
  const put = (url, data, config = {}) => apiClient.put(url, data, config);
  const del = (url, config = {}) => apiClient.delete(url, config);

  return { get, post, put, delete: del };
};