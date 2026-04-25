import { Box, Grid, GridItem, TabsContent, TabsRoot } from '@chakra-ui/react';
import  Header  from '@/Components/Parts/Header';
import Map from '@/Components/Parts/Map';
import type { User } from '@/types/User';
import type { Rindou } from '@/types/Rindou';

const TopPage = ({ user, rindouList, imageUrl }: { user: User | undefined; rindouList: Rindou[]; imageUrl: string }) => {

    return (
        <>
            <Box>
                <TabsRoot defaultValue={"index_map"} variant={"enclosed"}>
                    <Header user={user} imageUrl={imageUrl} />
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
