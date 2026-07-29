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
import type { WeatherData } from '@/types/WeatherData';
import { useEffect, useState } from 'react';
import useSidebarHandler from '@/hooks/useSidebarHandler';
import useSelectedMarkerIds from '@/hooks/useSelectedMarkerIds';
import useSelectedMarkerIdsToRindous from '@/hooks/useSelectedMarkerIdsToRindous';
import useTogglePopup from '@/hooks/useTogglePopup';
import useSidebar from '@/hooks/useSidebar';
import useGetWeatherIcon from '@/hooks/useGetWeatherIcon';
import useGetWindDirection from '@/hooks/useGetWindDirection';
import useFormatDate from '@/hooks/useFormatDate';
import useFormatHour from '@/hooks/useFormatHour';
import useHeaderHandler from '@/hooks/useHeaderHandler';
import useShowToast from '@/hooks/useShowToast';
import useJmaTargetTime from '@/hooks/useJmaTargetTime';
import useRainViewer from '@/hooks/useRainViewer';

const TopPage = ({
        rindouList,
        loginMessage,
        isLogin,
        clearList
    } : {
        rindouList: Rindou[];
        loginMessage: string;
        isLogin: boolean;
        clearList: Clear[] | null;
    }) => {
    const { selectedMarkerIds, toggleSelectedMarkerIds, clearSelectedMarkerIds } = useSelectedMarkerIds();
    const selectedRindous = useSelectedMarkerIdsToRindous({ rindouList, selectedMarkerIds });
    const { setMarkerRef, togglePopup, closeAllPopups } = useTogglePopup();
    const {
        isOpen,
        selectedLastRindou,
        handleCloseSidebar
    } : {
        isOpen: boolean;
        selectedLastRindou: Rindou | undefined;
        handleCloseSidebar: () => void
    } = useSidebarHandler({selectedRindous, clearSelectedMarkerIds, closeAllPopups});
    const {
        getSearchRindou,
        getPostsRindou,
        getWeatherData,
        searchImages,
        posts,
        iconImages,
        postImages,
        weatherData,
    } : {
        getSearchRindou: () => void;
        getPostsRindou: () => void;
        getWeatherData: () => void;
        searchImages: SearchImages[];
        posts: Posts[];
        iconImages: iconImage[];
        postImages: postImage[];
        weatherData: WeatherData | null;
    } = useSidebar({selectedLastRindou});

    const { getWeatherIcon } = useGetWeatherIcon();
    const { getWindDirection } = useGetWindDirection();
    const { formatDate } = useFormatDate();
    const { formatHour } = useFormatHour();
    const {
        searchRindouId,
        getSearchData,
        searchMessage,
        getSelectedPrefecture,
        formSelectedRindous,
        storePost,
        postMessage,
    } = useHeaderHandler();
    const { showToast } = useShowToast();
    const targetTime = useJmaTargetTime();
    const { host, time } = useRainViewer();

    useEffect(() => {
        if (!loginMessage) return;

        const timer = setTimeout(() => {
            showToast(loginMessage);
        }, 0);
        return () => clearTimeout(timer);
    },[ loginMessage, showToast ]);

    useEffect(() => {
        if (!searchMessage) return;

        const timer = setTimeout(() => {
            showToast(searchMessage);
        }, 0)
        return () => clearTimeout(timer);
    },[ searchMessage, showToast ]);

    useEffect(() => {
        if (!postMessage) return;

        const timer = setTimeout(() => {
            showToast(postMessage);
        }, 0);
        return () => clearTimeout(timer);
    }, [ postMessage, showToast ]);

    useEffect(() => {
        if(!selectedLastRindou) return;

        getSearchRindou();
        getPostsRindou();
        getWeatherData();
    }, [selectedLastRindou]);

    return (
        <>
            <Toaster />
            <Box>
                <TabsRoot defaultValue={"index_map"} variant={"enclosed"}>
                    <Header
                        toggleSelectedMarkerIds={toggleSelectedMarkerIds}
                        searchRindouId={searchRindouId}
                        getSearchData={getSearchData}
                        getSelectedPrefecture={getSelectedPrefecture}
                        formSelectedRindous={formSelectedRindous}
                        storePost={storePost}
                        postMessage={postMessage}
                    />
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
                                    weatherData={weatherData}
                                    getWeatherIcon={getWeatherIcon}
                                    getWindDirection={getWindDirection}
                                    formatDate={formatDate}
                                    formatHour={formatHour}
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
                                    targetTime={targetTime}
                                    host={host}
                                    time={time}
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
