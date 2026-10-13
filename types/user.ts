export interface User {
    id: number;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    image?: string;
}

export interface Paginated<T> {
    total: number;
    skip: number;
    limit: number;
    items: T[];
}
