
import axios from "axios";

const api = axios.create({
  baseURL: "/api/",
});

api.interceptors.request.use((config) => {
  const token = sessionStorage.getItem("access_token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Automatically refresh expired access tokens
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes("accounts/login/") &&
      !originalRequest.url.includes("accounts/token/refresh/")
    ) {
      originalRequest._retry = true;

      const refreshToken = sessionStorage.getItem("refresh_token");

      if (!refreshToken) {
        sessionStorage.clear();
        window.location.href = "/login";
        return Promise.reject(error);
      }

      try {
        const response = await axios.post(
          "http://127.0.0.1:8001/api/accounts/token/refresh/",
          { refresh: refreshToken }
        );

        const newAccessToken = response.data.access;

        sessionStorage.setItem("access_token", newAccessToken);

        originalRequest.headers.Authorization =
          `Bearer ${newAccessToken}`;

        return api(originalRequest);

      } catch (refreshError) {
        sessionStorage.clear();
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
