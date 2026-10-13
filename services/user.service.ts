import { api } from "@/lib/api";
import type { Paginated, User } from "@/types/user";

interface GetUsersParams {
    limit?: number;
    skip?: number;
}

// Bentuk response asli backend (dummyjson). Diubah ke Paginated<User> supaya komponen tidak bergantung ke format API.
interface UsersResponse {
    users: User[];
    total: number;
    skip: number;
    limit: number;
}

export async function getUsers({ limit = 10, skip = 0 }: GetUsersParams = {}): Promise<Paginated<User>> {
    const { data } = await api.get<UsersResponse>("/users", {
        params: { limit, skip, select: "username,email,firstName,lastName,image" },
    });
    return { items: data.users, total: data.total, skip: data.skip, limit: data.limit };
}
