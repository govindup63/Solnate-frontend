import axios from 'axios';

// Base URL for the backend API
const BASE_URL = 'http://13.51.198.4:3001/api/organization';

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
