import { NextResponse, type NextRequest } from "next/server";

// Next.js 16: Proxy (sebelumnya Middleware) — dijalankan sebelum halaman dirender.
// Sengaja tidak memakai nama middleware.ts: Vercel men-deploy file itu sebagai Routing Middleware
// di project framework apa pun (termasuk deploy Storybook), dan di sana `next/server` tidak tersedia.

// Harus sama dengan TOKEN_COOKIE di lib/session.ts.
const TOKEN_COOKIE = "token";

// Halaman yang bisa dibuka tanpa login. Selain ini, semua halaman butuh login.
const PUBLIC_PATHS = ["/", "/login"];

/**
 * - Belum login dan membuka halaman yang diproteksi → diarahkan ke /login.
 * - Sudah login tapi membuka /login → diarahkan ke /dashboard.
 */
export function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const isLoggedIn = request.cookies.has(TOKEN_COOKIE);

    if (!isLoggedIn && !PUBLIC_PATHS.includes(pathname)) {
        return NextResponse.redirect(new URL("/login", request.url));
    }
    if (isLoggedIn && pathname === "/login") {
        return NextResponse.redirect(new URL("/dashboard", request.url));
    }
    return NextResponse.next();
}

export const config = {
    // Lewati file statis, gambar, favicon, dan route API.
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)"],
};
