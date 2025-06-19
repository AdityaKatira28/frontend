// frontend/src/api.js
import axios from "axios";

// Use environment variables to manage backend URL
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL || "https://backend-production-6b38.up.railway.app",
  timeout: 10000, // 10-second timeout
});

export default {
  getTestData() {
    return apiClient.get("/api/test");
  },
};