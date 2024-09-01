import axios from 'axios';

// Base URL for the backend API
const BASE_URL = 'http://172.31.45.171:3001/api/organization';

// Create an instance of axios with default settings
const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

// API call to create a donation link
export const createDonationLink = (publicKey, email) => {
  return api.post('/', { publicKey, email });
};

export default api;
