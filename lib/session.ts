// Token login disimpan di cookie supaya bisa dibaca juga oleh proxy.ts (cek login sebelum halaman dirender).

export const TOKEN_COOKIE = "token";

const MAX_AGE = 60 * 60 * 24 * 7; // 7 hari

export function getToken(): string | null {
    if (typeof document === "undefined") return null;
    const match = document.cookie.match(new RegExp(`(?:^|; )${TOKEN_COOKIE}=([^;]*)`));
    return match ? decodeURIComponent(match[1]) : null;
}

export function setToken(token: string) {
    document.cookie = `${TOKEN_COOKIE}=${encodeURIComponent(token)}; path=/; max-age=${MAX_AGE}; samesite=lax`;
}

export function clearToken() {
    document.cookie = `${TOKEN_COOKIE}=; path=/; max-age=0; samesite=lax`;
}
