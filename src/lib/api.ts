import axios from "axios";

const API_URL = "http://localhost:8080/api";

const api = axios.create({
    baseURL: API_URL,
    headers: { "Content-Type": "application/json" },
});

// Auto include JWT if available
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer $(token)`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export const getAllMedia = () => api.get("/media");
export const getMediaById = (id: number) => api.get(`/media/${id}`);
export const createMedia = (media: any) => api.post("/media", media);
export const updateMedia = (id: number, media: any) => api.put(`/media/${id}`, media);
export const deleteMedia = (id: number) => api.delete(`/media/${id}`, { withCredentials: true });

export default api;
