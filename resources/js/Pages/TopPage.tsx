import { Box, Grid, GridItem, TabsContent, TabsRoot, HStack, Heading } from '@chakra-ui/react';
import { Toaster, toaster } from '../../../src/components/ui/toaster';
import { IoClose } from "react-icons/io5";
import  Header  from '@/Components/Parts/Header';
import Map from '@/Components/Parts/Map';
import type { Rindou } from '@/types/Rindou';
import { useEffect } from 'react';
import useSidebarHandler from '@/hooks/useSidebarHandler';
import useSelectedMarkerIds from '@/hooks/useSelectedMarkerIds';
import useSelectedMarkerIdsToRindous from '@/hooks/useSelectedMarkerIdsToRindous';
import useTogglePopup from '@/hooks/useTogglePopup';

const TopPage = ({ rindouList, status }: { rindouList: Rindou[]; status: string; }) => {
    const { selectedMarkerIds, toggleSelectedMarkerIds, clearSelectedMarkerIds } = useSelectedMarkerIds();
    const selectedRindous = useSelectedMarkerIdsToRindous({ rindouList, selectedMarkerIds });
    const { setMarkerRef, togglePopup, closeAllPopups } = useTogglePopup();
    const { isOpen, selectedLastRindou, handleCloseSidebar }: { isOpen: boolean; selectedLastRindou: Rindou | undefined; handleCloseSidebar: () => void } = useSidebarHandler({selectedRindous, clearSelectedMarkerIds, closeAllPopups});

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
                    <Header />
                    <TabsContent value='index_map' p={0}>
                        <Grid templateColumns={"repeat(10, 1fr)"}>
                            {isOpen && (
                                <GridItem colSpan={3} p={5}>
                                    <HStack justifyContent={"space-between"} alignItems={"center"}>
                                        <Heading h={2} fontSize={"2xl"}>{selectedLastRindou?.name}</Heading>
                                        <IoClose
                                            size={"1.5em"}
                                            cursor={"pointer"}
                                            onClick={() => {
                                                handleCloseSidebar();
                                            }}
                                        />
                                    </HStack>
                                </GridItem>
                            )}
                            <GridItem colSpan={ isOpen ? 7 : 10 }  h={"calc(100vh - 80px)"}>
                                <Map
                                    rindouList={rindouList}
                                    selectedMarkerIds={selectedMarkerIds}
                                    toggleSelectedMarkerIds={toggleSelectedMarkerIds}
                                    setMarkerRef={setMarkerRef}
                                    togglePopup={togglePopup}
                                />
                            </GridItem>
                        </Grid>
                    </TabsContent>
                </TabsRoot>
            </Box>
        </>
    );
};

export default TopPage;
