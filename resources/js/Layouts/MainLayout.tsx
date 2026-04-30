import { Box } from "@chakra-ui/react";
import Header from "@/Components/Parts/Header";
import type { User } from '@/types/User';

const MainLayout: React.FC<{ children: React.ReactNode; user: User; imageUrl: string }> = ({ children, user, imageUrl }) => {
    return (
        <>
            <Header user={user} imageUrl={imageUrl} />
            <Box>{children}</Box>
        </>
    );
};

export default MainLayout;
