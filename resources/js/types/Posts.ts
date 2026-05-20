import type { User } from "./User";

type Posts = {
    id: number;
    user_id: number;
    rindou_id: number;
    content: string;
    img: string;
    title: string;
    created_at: Date;
    updated_at: Date;
    user: User;
};

export type { Posts };
