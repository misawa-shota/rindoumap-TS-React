import { Box, Grid, GridItem, TabsContent, TabsRoot } from '@chakra-ui/react';
import { Toaster, toaster } from '../../../src/components/ui/toaster';
import  Header  from '@/Components/Parts/Header';
import Map from '@/Components/Parts/Map';
import Sidebar from '@/Components/Parts/Sidebar';
import type { Rindou } from '@/types/Rindou';
import type { SearchImages } from '@/types/SearchImages';
import type { Clear } from '@/types/Clear';
import { useEffect } from 'react';
import useSidebarHandler from '@/hooks/useSidebarHandler';
import useSelectedMarkerIds from '@/hooks/useSelectedMarkerIds';
import useSelectedMarkerIdsToRindous from '@/hooks/useSelectedMarkerIdsToRindous';
import useTogglePopup from '@/hooks/useTogglePopup';
import useSearchRindou from '@/hooks/useSearchRindou';

const TopPage = ({
        rindouList,
        status,
        images,
        isLogin,
        clearList
    } : {
        rindouList: Rindou[];
        status: string;
        images: SearchImages[];
        isLogin: boolean;
        clearList: Clear[] | null;
    }) => {
    const { selectedMarkerIds, toggleSelectedMarkerIds, clearSelectedMarkerIds } = useSelectedMarkerIds();
    const selectedRindous = useSelectedMarkerIdsToRindous({ rindouList, selectedMarkerIds });
    const { setMarkerRef, togglePopup, closeAllPopups } = useTogglePopup();
    const { isOpen, selectedLastRindou, handleCloseSidebar } : { isOpen: boolean; selectedLastRindou: Rindou | undefined; handleCloseSidebar: () => void } = useSidebarHandler({selectedRindous, clearSelectedMarkerIds, closeAllPopups});
    const { handleSearchRindou, searchImages } : { handleSearchRindou: () => void; searchImages: SearchImages[] } = useSearchRindou({selectedLastRindou});

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

    useEffect(() => {
        if(!selectedLastRindou) return;

        handleSearchRindou();
    }, [selectedLastRindou]);

    console.log(searchImages);

    return (
        <>
            <Toaster />
            <Box>
                <TabsRoot defaultValue={"index_map"} variant={"enclosed"}>
                    <Header />
                    <TabsContent value='index_map' p={0}>
                        <Grid templateColumns={"repeat(10, 1fr)"}>
                            {isOpen && (
                                <Sidebar
                                    selectedLastRindou={selectedLastRindou}
                                    handleCloseSidebar={handleCloseSidebar}
                                    images={searchImages}
                                />
                            )}
                            <GridItem colSpan={ isOpen ? 7 : 10 }  h={"calc(100vh - 80px)"}>
                                <Map
                                    rindouList={rindouList}
                                    selectedMarkerIds={selectedMarkerIds}
                                    toggleSelectedMarkerIds={toggleSelectedMarkerIds}
                                    setMarkerRef={setMarkerRef}
                                    togglePopup={togglePopup}
                                    isLogin={isLogin}
                                    clearList={clearList}
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
