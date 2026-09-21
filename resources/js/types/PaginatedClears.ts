import type { Clear } from "./Clear";

type PaginatedClears = {
    data: Clear[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
};

export type { PaginatedClears };
