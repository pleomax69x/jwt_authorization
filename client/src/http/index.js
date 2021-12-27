import axios from "axios";

const API_URL = "http://localhost:4000/api";

const api = axios.create({
  withCredentials: true,
  baseURL: API_URL,
  //   timeout: 1000,
  //   headers: { "X-Custom-Header": "foobar" },
});

api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
  return config;
});

api.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response.status === 401 &&
      error.config &&
      !error.config._isRetry
    ) {
      try {
        originalRequest._isRetry = true;
        const res = await axios.get(`${API_URL}/refresh`, {
          withCredentials: true,
        });
        localStorage.setItem("token", res.data.accessToken);
        return api.request(originalRequest);
      } catch (e) {
        console.log("Not authorized");
      }
    }
    throw error;
  }
);

export default api;
