import type { Post } from "./Post";

type PaginatedPosts = {
    data: Post[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
}

export type { PaginatedPosts };
