import { reFreshAccessToken } from "./restApi";
import axios from "axios";

const API_URL =
  import.meta.env.VITE_SERVER_URL || "http://localhost:8000/api/v1";

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true, // Ensures cookies are sent with every request
});

let isRefreshing = false;
let refreshSubscribers = [];

const subscribeTokenRefresh = (callback) => {
  refreshSubscribers.push(callback);
};

const onTokenRefreshed = () => {
  refreshSubscribers.map((callback) => callback());
  refreshSubscribers = [];
};

export const axiosInterceptor = () => {
  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      // Handle Unauthorized (401) errors
      if (error.response?.status === 401 && !originalRequest._retry) {
        if (isRefreshing) {
          return new Promise((resolve) => {
            subscribeTokenRefresh(() => {
              resolve(api(originalRequest));
            });
          });
        }

        originalRequest._retry = true;
        isRefreshing = true;

        try {
          await reFreshAccessToken();
          isRefreshing = false;
          onTokenRefreshed();

          return api(originalRequest);
        } catch (refreshError) {
          isRefreshing = false;
          localStorage.removeItem("userInfo");

          // Redirect to sign-in if refresh fails
          if (window.location.pathname !== "/sign_in") {
            // window.location.href = "/sign_in";
          }

          return Promise.reject(refreshError);
        }
      }

      return Promise.reject(error);
    }
  );
};

export default api;
