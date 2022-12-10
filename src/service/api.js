import axios from "axios";
import queryString from "query-string";

const axiosInstance = axios.create({
  baseURL: "https://localhost:7166/",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  paramsSerializer: (params) => queryString.stringify(params),
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (res) => {
    if (res && res.data && res.data.data) {
      return res.data;
    }
    return res.data;
  },
  (error) => {
    throw error;
  }
);

export default axiosInstance;
