import axios from 'axios';
// import { getToken } from './tokenService'
// import handleError from './errorHandler'
const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com/', // add this to env later
  timeout: 10000, // Set timeout to 10 seconds
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request Interceptor: Attach token automatically
api.interceptors.request.use(
  (config) => {
    const token = 'Rahul'
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error),
)

// Response Interceptor: Handle errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => console.warn(error),
)

export default api
