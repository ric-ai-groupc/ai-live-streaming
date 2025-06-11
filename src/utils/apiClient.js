import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL,
  timeout: 10000, // optional
});

export default apiClient;