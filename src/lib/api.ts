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
export const getMediaById = (id: number) => api.get(`/media/${id}`);
export const createMedia = (media: any) => api.post("/media", media);
export const updateMedia = (id: number, media: any) => api.put(`/media/${id}`, media);
export const deleteMedia = (id: number) => api.delete(`/media/${id}`);
export const getStreamUrl = (filename: string): string => `${API_URL}/stream/${filename}`;

export default api;
