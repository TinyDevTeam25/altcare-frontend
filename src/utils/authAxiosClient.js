import axios from "axios";

// Create axios instance with base configuration
const adminAxiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000, // 10 second timeout
});

// Request interceptor to add auth token
adminAxiosClient.interceptors.request.use(
  (config) => {
    try {
      // Get token from localStorage
      const userData = localStorage.getItem("hospitalData");
      if (userData) {
        const parsedData = JSON.parse(userData);

        console.log({ parsedData });

        // Check if token exists and session hasn't expired
        if (parsedData.token) {
          config.headers.Authorization = `Bearer ${parsedData.token}`;
        }
      }
    } catch (error) {
      console.error("Error retrieving auth token:", error);
      // Clear invalid localStorage data
      localStorage.removeItem("hospitalData");
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle auth errors
adminAxiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle 401 Unauthorized responses
    if (error.response?.status === 401) {
      // Clear localStorage and redirect to login
      localStorage.removeItem("hospitalData");

      // Only redirect if we're not already on the login page
      if (
        window.location.pathname !== "/professional/hospital-signin" &&
        window.location.pathname !== "/professional/hospital-register"
      ) {
        window.location.href = "/professional/hospital-signin";
      }
    }

    return Promise.reject(error);
  }
);

export default adminAxiosClient;
