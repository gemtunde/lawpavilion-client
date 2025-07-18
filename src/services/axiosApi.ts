import axios from "axios";
import Cookies from "js-cookie";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-type": "application/json",
  },
});

const refreshInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    // No need to manually attach token here
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // ⚠️ Use refreshInstance here instead of axiosInstance
        await refreshInstance.post("/auth/refresh");

        // Save new tokens (update this logic to match your backend response)
        // Cookies.set("accessToken", res.data.accessToken);
        // Cookies.set("refreshToken", res.data.refreshToken);

        // Retry the original request with new token
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        Cookies.remove("accessToken");
        Cookies.remove("refreshToken");
        //  window.location.href = "/auth/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
