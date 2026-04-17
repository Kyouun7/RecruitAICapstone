import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  // We explicitly do NOT set the Content-Type to multipart/form-data here
  // so that Axios automatically sets the proper boundary and content-type when we pass a FormData object.
});

export default api;
