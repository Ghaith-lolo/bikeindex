import axios, { AxiosInstance } from 'axios';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: `https://bikeindex.org`,
  headers: {
    'Content-Type': 'application/json',
    // 'Authorization': 'Bearer testtesttestte'
  }
});

export default axiosInstance;