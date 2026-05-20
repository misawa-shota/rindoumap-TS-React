import { GridItem, HStack, Heading, ScrollAreaContent, ScrollAreaRoot, ScrollAreaViewport, Span, ScrollAreaScrollbar, ScrollAreaCorner, LinkBox, LinkOverlay, Image, Text, VStack, ListRoot, ListItem, DialogRoot, DialogTrigger, CardRoot, CardHeader, CardBody, Portal, DialogBackdrop, DialogPositioner, DialogContent, DialogHeader, DialogTitle, DialogCloseTrigger, CloseButton, DialogBody, Grid } from '@chakra-ui/react';
import { IoClose } from "react-icons/io5";
import type { Rindou } from '@/types/Rindou';
import type { SearchImages } from '@/types/SearchImages';
import type { Posts } from '@/types/Posts';
import type { iconImage } from '@/types/iconImage';
import type { postImage } from '@/types/postImage';

const Sidebar = ({
        selectedLastRindou,
        handleCloseSidebar,
        images,
        posts,
        iconImages,
        postImages,
    } : {
        selectedLastRindou: Rindou | undefined;
        handleCloseSidebar: () => void;
        images: SearchImages[];
        posts: Posts[];
        iconImages: iconImage[];
        postImages: postImage[];
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
                            <ListItem _marker={{color: "inherit"}}>
                                <Heading fontSize={20}>{selectedLastRindou?.name}に関する検索結果</Heading>
                                <ScrollAreaRoot h={"35rem"} size={"lg"} variant={"always"} my={5}>
                                    <ScrollAreaViewport>
                                        <ScrollAreaContent>
                                            <VStack gap={4}>
                                                {Array.isArray(images) && images.map((image) => (
                                                    <LinkBox key={image.original ?? image.position} as={"article"} maxW={"md"} p={5} borderWidth={"1px"} rounded={"md"} overflow={"hidden"}>
                                                        <Image src={image.original} alt={image.title} />
                                                        <Heading>
                                                            <LinkOverlay href={image.link}>
                                                                <Text>{image.source}</Text>
                                                                <Text>{image.title}</Text>
                                                            </LinkOverlay>
                                                        </Heading>
                                                    </LinkBox>
                                                ))}
                                            </VStack>
                                        </ScrollAreaContent>
                                    </ScrollAreaViewport>
                                    <ScrollAreaScrollbar />
                                    <ScrollAreaCorner />
                                </ScrollAreaRoot>
                            </ListItem>
                            <ListItem _marker={{color: "inherit"}}>
                                <Heading fontSize={20}>{selectedLastRindou?.name}に関する投稿</Heading>
                                <ScrollAreaRoot height={"35rem"} size={"lg"} variant={"always"} my={5}>
                                    <ScrollAreaViewport>
                                        <ScrollAreaContent>
                                            <VStack gap={4}>
                                                {Array.isArray(posts) && posts.map((post) => (
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
                                                ))}
                                            </VStack>
                                        </ScrollAreaContent>
                                    </ScrollAreaViewport>
                                    <ScrollAreaScrollbar />
                                    <ScrollAreaCorner />
                                </ScrollAreaRoot>
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
