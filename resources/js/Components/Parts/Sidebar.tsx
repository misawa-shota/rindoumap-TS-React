import { Flex, GridItem, HStack, Heading, ScrollAreaContent, ScrollAreaRoot, ScrollAreaViewport, Span, ScrollAreaScrollbar, ScrollAreaCorner, LinkBox, LinkOverlay, Image, Text, VStack, ListRoot, ListItem, DialogRoot, DialogTrigger, CardRoot, CardHeader, CardBody, Portal, DialogBackdrop, DialogPositioner, DialogContent, DialogHeader, DialogTitle, DialogCloseTrigger, CloseButton, DialogBody, Grid, Box, TableRoot, TableBody, ListboxRoot, TableRow, TableCell } from '@chakra-ui/react';
import { IoClose } from "react-icons/io5";
import type { Rindou } from '@/types/Rindou';
import type { SearchImages } from '@/types/SearchImages';
import type { Posts } from '@/types/Posts';
import type { iconImage } from '@/types/iconImage';
import type { postImage } from '@/types/postImage';
import type { WeatherData } from '@/types/WeatherData';
import thermometer_alert from "../../assets/weatherIcons/thermometer_alert.svg";
import wind_alert from "../../assets/weatherIcons/wind_alert.svg";

const Sidebar = ({
        selectedLastRindou,
        handleCloseSidebar,
        images,
        posts,
        iconImages,
        postImages,
        weatherData,
        getWeatherIcon,
        getWindDirection,
        formatDate,
        formatHour
    } : {
        selectedLastRindou: Rindou | undefined;
        handleCloseSidebar: () => void;
        images: SearchImages[];
        posts: Posts[];
        iconImages: iconImage[];
        postImages: postImage[];
        weatherData: WeatherData | null;
        getWeatherIcon: (weatherCode: number) => { weatherIcon: string; weatherName: string; };
        getWindDirection: (windDirectionDegree: number) => string;
        formatDate: (dateString: string) => string;
        formatHour: (hourString: string) => string;
    }) => {
    const distance = selectedLastRindou?.distance ?? 0;

    return (
        <GridItem colSpan={3} p={5} h={"calc(100vh - 80px)"} >
            <ScrollAreaRoot size={"lg"} variant={"always"} >
                <ScrollAreaViewport>
                    <ScrollAreaContent>
                        <HStack justifyContent={"space-between"} alignItems={"center"}>
                            <HStack alignItems={"baseline"} gapX={5}>
                                <Heading h={2} fontSize={"2xl"}>{selectedLastRindou?.name}</Heading>
                                <Span fontSize={"xl"}>
                                    {distance >= 1000 ? (
                                        `約${(distance / 1000).toFixed(1)}km`
                                    ) : (
                                        `約${distance.toFixed(1)}m`
                                    )}
                                </Span>
                            </HStack>
                            <IoClose
                                size={"1.5em"}
                                cursor={"pointer"}
                                onClick={() => {
                                    handleCloseSidebar();
                                }}
                            />
                        </HStack>
                        <ListRoot as={"ol"} listStyle={"decimal"} px={5} my={5} gapY={30}>
                            {/* 検索結果 */}
                            <ListItem _marker={{color: "inherit"}}>
                                <Heading fontSize={20}>{selectedLastRindou?.name}に関する検索結果</Heading>
                                <ScrollAreaRoot h={"35rem"} size={"lg"} variant={"always"} my={5}>
                                    <ScrollAreaViewport>
                                        <ScrollAreaContent>
                                            <VStack gap={4}>
                                                {Array.isArray(images) && images.length > 0 ? (images.map((image) => (
                                                    <LinkBox key={image.original ?? image.position} as={"article"} maxW={"md"} p={5} borderWidth={"1px"} rounded={"md"} overflow={"hidden"}>
                                                        <Image src={image.original} alt={image.title} />
                                                        <Heading>
                                                            <LinkOverlay href={image.link}>
                                                                <Text>{image.source}</Text>
                                                                <Text>{image.title}</Text>
                                                            </LinkOverlay>
                                                        </Heading>
                                                    </LinkBox>
                                                ))) : (
                                                    <Text fontSize={"lg"} fontWeight={"bold"}>検索結果の取得に失敗しました。</Text>
                                                )}
                                            </VStack>
                                        </ScrollAreaContent>
                                    </ScrollAreaViewport>
                                    <ScrollAreaScrollbar />
                                    <ScrollAreaCorner />
                                </ScrollAreaRoot>
                            </ListItem>
                            {/* 林道の投稿 */}
                            <ListItem _marker={{color: "inherit"}}>
                                <Heading fontSize={20}>{selectedLastRindou?.name}に関する投稿</Heading>
                                <ScrollAreaRoot height={"20rem"} size={"lg"} variant={"always"} my={5}>
                                    <ScrollAreaViewport>
                                        <ScrollAreaContent>
                                            <VStack gap={4}>
                                                {Array.isArray(posts) && posts.length > 0 ? (posts.map((post) => (
                                                    <DialogRoot  key={post.id} size={"cover"} placement={"center"} motionPreset={"slide-in-bottom"}>
                                                        <DialogTrigger asChild>
                                                            <CardRoot p={1} cursor={"pointer"} maxW={"md"} minW={"md"} borderWidth={"1px"} rounded={"md"} >
                                                                <CardHeader>
                                                                    <HStack alignItems={"center"} gapX={5}>
                                                                        <Image src={iconImages.find((iconImage) => String(iconImage.fileName) === String(post.user.icon_img))?.url} boxSize={"50px"} borderRadius={"full"} fit={"cover"} alt="ユーザーアイコン" />
                                                                        <Text fontWeight={"bold"} >{post.user.name}</Text>
                                                                    </HStack>
                                                                </CardHeader>
                                                                <CardBody>
                                                                    <Text>
                                                                        {post.content.length > 30 ? (
                                                                            post.content.slice(0, 30) + "..."
                                                                        ) : (
                                                                            post.content
                                                                        )}
                                                                    </Text>
                                                                </CardBody>
                                                            </CardRoot>
                                                        </DialogTrigger>
                                                        <Portal>
                                                            <DialogBackdrop />
                                                            <DialogPositioner>
                                                                <DialogContent>
                                                                    <ScrollAreaRoot h={"100%"} size={"lg"} variant={"always"} my={5} >
                                                                        <ScrollAreaViewport>
                                                                            <ScrollAreaContent>
                                                                                <DialogHeader>
                                                                                    <DialogTitle>
                                                                                        <HStack alignItems={"center"} gapX={5}>
                                                                                            <Image src={iconImages.find((iconImage) => String(iconImage.fileName) === String(post.user.icon_img))?.url} boxSize={"50px"} borderRadius={"full"} fit={"cover"} alt="ユーザーアイコン" />
                                                                                            <Text fontWeight={"bold"} fontSize={"lg"} >{post.user.name}</Text>
                                                                                        </HStack>
                                                                                    </DialogTitle>
                                                                                    <DialogCloseTrigger asChild>
                                                                                        <CloseButton size={"lg"} />
                                                                                    </DialogCloseTrigger>
                                                                                </DialogHeader>
                                                                                <DialogBody>
                                                                                    <Text fontSize={"md"} lineHeight={"tall"}>{post.content}</Text>
                                                                                    <ListRoot py={10} >
                                                                                        <Grid templateColumns={"repeat(3, 1fr)"} gap={5} pr={5} >
                                                                                            {post.img.split(",").map((postImg) => (
                                                                                                <DialogRoot key={postImg} size={"cover"} >
                                                                                                    <DialogTrigger>
                                                                                                        <GridItem>
                                                                                                            <ListItem>
                                                                                                                <Image src={postImages.find((postImage) => postImage.fileName === postImg)?.url} />
                                                                                                            </ListItem>
                                                                                                        </GridItem>
                                                                                                    </DialogTrigger>
                                                                                                    <Portal>
                                                                                                        <DialogBackdrop />
                                                                                                        <DialogPositioner>
                                                                                                            <DialogContent>
                                                                                                                <DialogBody>
                                                                                                                    <Image src={postImages.find((postImage) => postImage.fileName === postImg)?.url} />
                                                                                                                </DialogBody>
                                                                                                            </DialogContent>
                                                                                                        </DialogPositioner>
                                                                                                    </Portal>
                                                                                                </DialogRoot>
                                                                                            ))}
                                                                                        </Grid>
                                                                                    </ListRoot>
                                                                                </DialogBody>
                                                                            </ScrollAreaContent>
                                                                        </ScrollAreaViewport>
                                                                        <ScrollAreaScrollbar />
                                                                        <ScrollAreaCorner />
                                                                    </ScrollAreaRoot>
                                                                </DialogContent>
                                                            </DialogPositioner>
                                                        </Portal>
                                                    </DialogRoot>
                                                ))) : (
                                                    <Text fontSize={"lg"} fontWeight={"bold"}>この林道に関する投稿は、まだありません。</Text>
                                                )}
                                            </VStack>
                                        </ScrollAreaContent>
                                    </ScrollAreaViewport>
                                    <ScrollAreaScrollbar />
                                    <ScrollAreaCorner />
                                </ScrollAreaRoot>
                            </ListItem>
                            {/* 天気情報 */}
                            <ListItem _marker={{color: "inherit"}}>
                                <Heading fontSize={20}>{selectedLastRindou?.name}周辺の天気</Heading>
                                <Box>
                                    {weatherData && getWeatherIcon(weatherData.current.weathercode) ? (
                                        <Flex direction={"column"} gap={5} my={5}>
                                            <ListRoot listStyleType={"initial"} gapY={10}>
                                                <ListItem _marker={{color: "inherit"}}>
                                                    <Text>現在の天気</Text>
                                                    <HStack alignItems={"center"} gapX={5}>
                                                        <VStack>
                                                            <Image src={getWeatherIcon(weatherData.current.weathercode).weatherIcon} boxSize={"15rem"} alt="天気アイコン" />
                                                            <Text fontSize={"lg"} fontWeight={"bold"}>{getWeatherIcon(weatherData.current.weathercode).weatherName}</Text>
                                                        </VStack>
                                                        <VStack alignItems={"start"}>
                                                            <HStack alignItems={"center"}>
                                                                <VStack alignItems={"start"}>
                                                                    <Text>気温:</Text>
                                                                    <Text>降水確率:</Text>
                                                                    <Text>降水量:</Text>
                                                                    <Text>風速:</Text>
                                                                    <Text>風向:</Text>
                                                                </VStack>
                                                                <VStack alignItems={"start"}>
                                                                    <Text>{weatherData.current.temperature_2m} °C</Text>
                                                                    <Text>{weatherData.current.precipitation_probability} %</Text>
                                                                    <Text>{weatherData.current.precipitation} mm</Text>
                                                                    <Text>{weatherData.current.wind_speed_10m} m/s</Text>
                                                                    <Text>{getWindDirection(weatherData.current.wind_direction_10m)}</Text>
                                                                </VStack>
                                                            </HStack>
                                                            {(weatherData.current.temperature_2m >= 30 || weatherData.current.wind_speed_10m >= 8) && (
                                                                <ListRoot bg={"white"} borderColor={"red.500"} borderWidth={"0.5rem"} rounded={"md"} px={3}>
                                                                    {weatherData.current.temperature_2m >= 30 && (
                                                                        <ListItem>
                                                                            <HStack alignItems={"center"} gapX={2}>
                                                                                <Image src={thermometer_alert} boxSize={"3rem"} alt="高温注意アイコン" />
                                                                                <Text color={"red.500"} fontWeight={"bold"}>高温注意!</Text>
                                                                            </HStack>
                                                                        </ListItem>
                                                                    )}
                                                                    {weatherData.current.wind_speed_10m >= 8 && (
                                                                        <ListItem>
                                                                            <HStack alignItems={"center"} gapX={2}>
                                                                                <Image src={wind_alert} boxSize={"3rem"} alt="強風注意アイコン" />
                                                                                <Text color={"red.500"} fontWeight={"bold"}>強風注意!</Text>
                                                                            </HStack>
                                                                        </ListItem>
                                                                    )}
                                                                </ListRoot>
                                                            )}
                                                        </VStack>
                                                    </HStack>
                                                </ListItem>
                                                <ListItem _marker={{color: "inherit"}}>
                                                    <Text>今日の天気</Text>
                                                    <ScrollAreaRoot h={"20rem"} width={"400px"} size={"md"} variant={"always"} my={5}>
                                                        <ScrollAreaViewport>
                                                            <ScrollAreaContent>
                                                                <HStack gap={3}>
                                                                    {weatherData.hourly.map((hour) => (
                                                                        <VStack key={hour.time} p={2} borderWidth={"1px"} rounded={"md"} minW={"8rem"}>
                                                                            <Text>{formatHour(hour.time)}</Text>
                                                                            <Image src={getWeatherIcon(hour.weathercode).weatherIcon} boxSize={"5rem"} alt="天気アイコン" />
                                                                            <Text>{hour.temperature_2m} °C</Text>
                                                                            <Text>{hour.precipitation_probability} %</Text>
                                                                            <Text>{hour.precipitation} mm</Text>
                                                                            <Text>{hour.wind_speed_10m} m/s</Text>
                                                                            <Text>{getWindDirection(hour.wind_direction_10m)}</Text>
                                                                        </VStack>
                                                                    ))}
                                                                </HStack>
                                                            </ScrollAreaContent>
                                                        </ScrollAreaViewport>
                                                        <ScrollAreaScrollbar orientation={"horizontal"} />
                                                        <ScrollAreaCorner />
                                                    </ScrollAreaRoot>
                                                </ListItem>
                                                <ListItem _marker={{color: "inherit"}}>
                                                    <Text>週間予報</Text>
                                                    <TableRoot size={"sm"} variant={"line"}>
                                                        <TableBody>
                                                            {weatherData && weatherData.daily.slice(1).map((day) => (
                                                                <TableRow key={day.time}>
                                                                    <TableCell>{formatDate(day.time)}</TableCell>
                                                                    <TableCell>
                                                                        <Image src={getWeatherIcon(day.weathercode).weatherIcon} boxSize={"5rem"} alt="天気アイコン" />
                                                                    </TableCell>
                                                                    <TableCell color={"red"}>{day.temperature_2m_max}°C</TableCell>
                                                                    <TableCell color={"blue"}>{day.temperature_2m_min}°C</TableCell>
                                                                    <TableCell>{day.precipitation_probability_max}%</TableCell>
                                                                    <TableCell>{day.windspeed_10m_max} m/s</TableCell>
                                                                </TableRow>
                                                            ))}
                                                        </TableBody>
                                                    </TableRoot>
                                                </ListItem>
                                            </ListRoot>
                                        </Flex>
                                    ) : (
                                        <Text fontSize={"lg"} fontWeight={"bold"}>天気情報の取得に失敗しました</Text>
                                    )}
                                </Box>
                            </ListItem>
                        </ListRoot>
                    </ScrollAreaContent>
                </ScrollAreaViewport>
                <ScrollAreaScrollbar my={20} />
                <ScrollAreaCorner />
            </ScrollAreaRoot>
        </GridItem>
    );
};

export default Sidebar;
