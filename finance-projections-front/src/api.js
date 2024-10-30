import axios from 'axios';

const api = axios.create({
  baseURL: 'https://finance-api-silk-five.vercel.app/'
});

export default api;
