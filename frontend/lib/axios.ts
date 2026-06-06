import axios from 'axios';

const publicApiUrl = process.env.NEXT_PUBLIC_API_URL?.trim();

const api = axios.create({
  baseURL: publicApiUrl || undefined,
  // We explicitly do NOT set the Content-Type to multipart/form-data here
  // so that Axios automatically sets the proper boundary and content-type when we pass a FormData object.
});

// Interceptor untuk menambahkan token JWT secara otomatis
api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export default api;
