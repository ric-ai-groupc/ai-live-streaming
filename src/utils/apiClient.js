import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL,
  timeout: 10000, // optional
});

const videoStreamApiClient = axios.create({
  baseURL: process.env.VUE_APP_VS_API_BASE_URL,
  timeout: 10000,
});
const conversationApiClient = axios.create({
  baseURL: process.env.VUE_APP_CVS_API_BASE_URL,
  timeout: 10000,
});
const giftApiClient = axios.create({
  baseURL: process.env.VUE_APP_GIFT_APP_API_BASE_URL,
  timeout: 10000,
});
const customerApiClient = axios.create({
  baseURL: process.env.VUE_APP_CUSTOMER_APP_API_BASE_URL,
  timeout: 10000,
});
const productApiClient = axios.create({
  baseURL: process.env.VUE_APP_PRODUCT_APP_API_BASE_URL,
  timeout: 10000,
});

export { apiClient, videoStreamApiClient ,conversationApiClient, giftApiClient, customerApiClient, productApiClient};
export default apiClient;