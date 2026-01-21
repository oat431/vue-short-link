import axios from "axios";
const baseURL = window.config?.VITE_API_URL || "http://localhost:8002";

const api = axios.create({
    baseURL: baseURL, // Replace with your API base URL
    headers: {
        "Content-Type": "application/json",
    },
});

export default api;