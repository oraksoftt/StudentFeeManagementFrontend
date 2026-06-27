import axios from "axios";
import https from "https";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || process.env.API_URL;

export const api = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  httpsAgent: new https.Agent({ rejectUnauthorized: false }),
});


api.interceptors.response.use(
  (response) => {
    if (response.data && response.data.success === false) {
      return Promise.reject(response.data);
    }
    return response;
  },
  (error) => {
    
    if (error.response && error.response.data) {
      return Promise.reject(error.response.data);
    }
    
    // Fallback for network issues (e.g. server completely down)
    return Promise.reject({
      success: false,
      message: error.message || "An unexpected network error occurred.",
      data: null,
    });
  }
);