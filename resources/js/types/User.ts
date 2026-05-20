type User = {
    id: number;
    name: string;
    email: string;
    email_verified_at: string | null;
    created_at: Date;
    updated_at: Date;
    icon_img: string;
    introduction: string | null;
};

export type { User };
