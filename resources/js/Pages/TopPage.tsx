import { Box, Grid, GridItem, TabsContent, TabsRoot } from '@chakra-ui/react';
import { Toaster, toaster } from '../../../src/components/ui/toaster';
import  Header  from '@/Components/Parts/Header';
import Map from '@/Components/Parts/Map';
import Sidebar from '@/Components/Parts/Sidebar';
import type { Rindou } from '@/types/Rindou';
import type { SearchImages } from '@/types/SearchImages';
import type { Clear } from '@/types/Clear';
import type { Posts } from '@/types/Posts';
import type { iconImage } from '@/types/iconImage';
import type { postImage } from '@/types/postImage';
import { useEffect } from 'react';
import useSidebarHandler from '@/hooks/useSidebarHandler';
import useSelectedMarkerIds from '@/hooks/useSelectedMarkerIds';
import useSelectedMarkerIdsToRindous from '@/hooks/useSelectedMarkerIdsToRindous';
import useTogglePopup from '@/hooks/useTogglePopup';
import useSidebar from '@/hooks/useSidebar';

const TopPage = ({
        rindouList,
        status,
        isLogin,
        clearList
    } : {
        rindouList: Rindou[];
        status: string;
        isLogin: boolean;
        clearList: Clear[] | null;
    }) => {
    const { selectedMarkerIds, toggleSelectedMarkerIds, clearSelectedMarkerIds } = useSelectedMarkerIds();
    const selectedRindous = useSelectedMarkerIdsToRindous({ rindouList, selectedMarkerIds });
    const { setMarkerRef, togglePopup, closeAllPopups } = useTogglePopup();
    const { isOpen, selectedLastRindou, handleCloseSidebar } : { isOpen: boolean; selectedLastRindou: Rindou | undefined; handleCloseSidebar: () => void } = useSidebarHandler({selectedRindous, clearSelectedMarkerIds, closeAllPopups});
    const {
        getSearchRindou,
        getPostsRindou,
        searchImages,
        posts,
        iconImages,
        postImages,
    } : {
        getSearchRindou: () => void;
        getPostsRindou: () => void;
        searchImages: SearchImages[];
        posts: Posts[];
        iconImages: iconImage[];
        postImages: postImage[];
    } = useSidebar({selectedLastRindou});

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

        getSearchRindou();
        getPostsRindou();
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
                                    posts={posts}
                                    iconImages={iconImages}
                                    postImages={postImages}
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
