import { Box, Grid, GridItem, TabsContent, TabsRoot } from '@chakra-ui/react';
import  Header  from '@/Components/Parts/Header';
import Map from '@/Components/Parts/Map';
import type { User } from '@/types/User';

const TopPage = (auth: { user: User | undefined }) => {

    return (
        <>
            <Box>
                <TabsRoot defaultValue={"index_map"} variant={"enclosed"}>
                    <Header user={auth.user} />
                    <TabsContent value='index_map' p={0}>
                        <Grid templateColumns={"repeat(10, 1fr)"}>
                            <GridItem colSpan={3} bg={"red"}>
                                林道一覧
                            </GridItem>
                            <GridItem colSpan={7}  h={"calc(100vh - 80px)"}>
                                <Map />
                            </GridItem>
                        </Grid>
                    </TabsContent>
                </TabsRoot>
            </Box>
        </>
    );
};

export default TopPage;
