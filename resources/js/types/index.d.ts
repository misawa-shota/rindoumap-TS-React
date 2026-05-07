import { PageProps as InertiaPageProps } from '@inertiajs/react';

export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at?: string;
}

export type PageProps = InertiaPageProps<{
    auth: {
        user: User | null;
    };
}>;
