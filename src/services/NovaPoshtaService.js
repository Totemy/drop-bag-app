import axios from 'axios';

const API_KEY =  'fc532f0b68f563638171396db1bc8485';
const API_URL = 'https://api.novaposhta.ua/v2.0/json/';

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Api-Key': API_KEY,
  },
});

export default axiosInstance;