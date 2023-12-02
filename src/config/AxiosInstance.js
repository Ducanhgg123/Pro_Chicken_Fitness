import axios from "axios";

const AxiosInstance = axios.create({
  baseURL: "http://localhost:8080/api",
});

AxiosInstance.interceptors.request.use((config) => {
  const token = sessionStorage.getItem("jwt-token");
  if (token)
    config.headers.Authorization = `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJkYXQiLCJleHAiOjE3MDE1MTcyMDYsImlhdCI6MTcwMTQ4MTIwNn0.dvTICHChCS5260BARgpv7vngsF9ca7KATME7soOQRdU`;
  return config;
});

export default AxiosInstance;
