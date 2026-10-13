import type { User } from "./user";

export interface LoginRequest {
    username: string;
    password: string;
}

export interface LoginResponse extends User {
    accessToken: string;
    refreshToken: string;
}
