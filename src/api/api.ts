import axios from "axios";

export const api = axios.create({
    baseURL : import.meta.env.VITE_BASE_URL,
    headers: {
        'Content-Type':'application/json'
    }
})

api.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('accessToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
);

export const formAPI = axios.create({
  baseURL : import.meta.env.VITE_BASE_URL,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

formAPI.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);