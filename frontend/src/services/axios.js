import axios from "axios";

const API = axios.create({
  baseURL: "https://healhcare-app.onrender.com/api",
});

// Add token from localStorage or context
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("authToken");
  if (token) {
    req.headers.authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;
