import { Box, Grid, GridItem, TabsContent, TabsRoot } from '@chakra-ui/react';
import { Toaster, toaster } from '../../../src/components/ui/toaster';
import  Header  from '@/Components/Parts/Header';
import Map from '@/Components/Parts/Map';
import type { User } from '@/types/User';
import type { Rindou } from '@/types/Rindou';
import { useEffect } from 'react';

const TopPage = ({ user, rindouList, status }: { user: User | undefined; rindouList: Rindou[]; status: string; }) => {
    useEffect(() => {
        const timerId = setTimeout(() => {
            if (status === "login-success") {
                toaster.create({
                    title: "ログイン成功",
                    description: "ログインに成功しました。",
                    type: "success",
                    closable: true,
                    duration: 5000,
                });
            }
        }, 0);

        return () => clearTimeout(timerId);
    }, [status]);

    return (
        <>
            <Toaster />
            <Box>
                <TabsRoot defaultValue={"index_map"} variant={"enclosed"}>
                    <Header user={user} />
                    <TabsContent value='index_map' p={0}>
                        <Grid templateColumns={"repeat(10, 1fr)"}>
                            <GridItem colSpan={3} bg={"red"}>
                                林道一覧
                            </GridItem>
                            <GridItem colSpan={7}  h={"calc(100vh - 80px)"}>
                                <Map rindouList={rindouList} />
                            </GridItem>
                        </Grid>
                    </TabsContent>
                </TabsRoot>
            </Box>
        </>
    );
};

export default TopPage;
