import axios from "axios";
import { clearToken, getToken } from "./session";

/**
 * Instance axios untuk semua request ke backend.
 *
 *   const { data } = await api.get<User[]>("/users");
 *   const { data } = await api.post<LoginResponse>("/auth/login", body);
 */
export const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    timeout: 15_000,
    headers: { "Content-Type": "application/json" },
});

// Tambahkan token login ke setiap request.
api.interceptors.request.use((config) => {
    const token = getToken();
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

// Token tidak valid atau kedaluwarsa → hapus token lalu kembali ke halaman login.
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (axios.isAxiosError(error) && error.response?.status === 401 && typeof window !== "undefined") {
            clearToken();
            // Interceptor ada di luar komponen React, jadi tidak bisa pakai useRouter.
            // eslint-disable-next-line @next/next/no-location-assign-relative-destination
            if (window.location.pathname !== "/login") window.location.href = "/login";
        }
        return Promise.reject(error);
    },
);

/** Ambil pesan error yang bisa ditampilkan ke user dari error axios atau error biasa. */
export function getErrorMessage(error: unknown): string {
    if (axios.isAxiosError(error)) {
        const message = (error.response?.data as { message?: string } | undefined)?.message;
        return message ?? error.message;
    }
    return error instanceof Error ? error.message : "Terjadi kesalahan";
}
