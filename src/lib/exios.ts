import axios from "axios"

// console.log("baase url :", import.meta.env.VITE_API_BASE_URL)
// console.log("api key :", import.meta.env.VITE_WEATHER_API_KEY)

const axiosClient = axios.create({
  baseURL: "http://localhost:8000",
  timeout: 7000,
  headers: {
    "Content-Type": "application/json",
    "Authorization" : `Bearer `
  },
})

// Optional: Add request interceptor to attach API key automatically
// axiosClient.interceptors.request.use((config) => {
//   const apiKey = 'aed07f7d47ac4955aa293541251106'

//   config.params = {
//     ...(config.params || {}),
//     key: apiKey,
//   };

//   return config;
// });

axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token")
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default axiosClient;