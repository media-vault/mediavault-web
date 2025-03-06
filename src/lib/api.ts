import axios from "axios";

const API_URL = "http://localhost:8080/api";

const api = axios.create({
    baseURL: API_URL,
    headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("mediaVaultToken");
    if (token) {
        config.headers["X-MediaVault-Token"] = token;
    }
    return config;
}, (error) => Promise.reject(error));

export const getAllMedia = () => api.get("/media");

export default api;
