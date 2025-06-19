// frontend/src/api.js
import axios from "axios";

// Use environment variables to manage backend URL
const apiClient = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL, // Set in Netlify
  timeout: 10000, // 10-second timeout
});

export default {
  getTestData() {
    return apiClient.get("/api/test");
  },
};