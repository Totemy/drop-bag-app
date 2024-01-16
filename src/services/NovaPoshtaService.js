import axios from 'axios';

const API_KEY = process.env.VUE_APP_API_KEY;
const API_URL = process.env.VUE_APP_API_URL;

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Api-Key': API_KEY,
  },
});

export default axiosInstance;