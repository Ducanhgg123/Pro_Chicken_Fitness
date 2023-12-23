import axios from "axios";

const AxiosInstance = axios.create({
  baseURL: "http://localhost:8080/api",
});

AxiosInstance.interceptors.request.use((config) => {
  const token = sessionStorage.getItem("jwt-token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default AxiosInstance;
