import api from "../api/APIClient";
import type { ShortLinkRequest } from "../types/ShortLinkRequest";

export async function healthCheck() {
    const response = await api.get("/actuator/health");
    return response.data;
}

export async function getAllShortLinks() {
    const response = await api.get("/api/v1/short-link");
    return response.data;
}

export async function createShortLink(request: ShortLinkRequest) {
    const response = await api.post("/api/v1/short-link", request);
    return response.data;
}

export async function confirmAction(password: string) {
    const response = await api.post("/api/v1/short-link/confirm", { 'password': password });
    return response.data;
}