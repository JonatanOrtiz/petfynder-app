import axios from 'axios';

const api = axios.create({
  baseURL: 'https://petfynder.org'
});

export default api;