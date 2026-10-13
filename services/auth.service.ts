import { api } from "@/lib/api";
import { clearToken, setToken } from "@/lib/session";
import type { LoginRequest, LoginResponse } from "@/types/auth";
import type { User } from "@/types/user";

export async function login(body: LoginRequest): Promise<LoginResponse> {
    const { data } = await api.post<LoginResponse>("/auth/login", body);
    setToken(data.accessToken);
    return data;
}

export async function getMe(): Promise<User> {
    const { data } = await api.get<User>("/auth/me");
    return data;
}

export function logout() {
    clearToken();
}
