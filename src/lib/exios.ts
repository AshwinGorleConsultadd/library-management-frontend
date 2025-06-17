import axios from "axios"
import { toast } from "react-toastify"

// Use react-router navigation
import { createBrowserHistory } from "history"

const history = createBrowserHistory()

const axiosClient = axios.create({
  baseURL: "http://localhost:8000",
  timeout: 7000,
  headers: {
    "Content-Type": "application/json",
  },
})

// Add token to request headers
axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token")
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Handle unauthorized responses
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const status = error.response.status
      const message = error.response.data?.detail || "Something went wrong"

      if (status === 401 || status === 403) {
        toast.error(message)
        // Clear token if necessary
        localStorage.removeItem("token")
        // Redirect to login
        history.push("/login")
        window.location.reload() // to ensure redirection works
      } else {
        toast.error(message)
      }
    } else {
      toast.error("Network error or server not responding")
    }

    return Promise.reject(error)
  }
)

export default axiosClient
