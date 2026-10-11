import { Box, Button, Flex, Grid, GridItem, Image, Link, HStack, Text, Tabs, Container, ScrollArea, Card, Stack, VStack, Span, Pagination, ButtonGroup, IconButton, ListRoot, DialogRoot, DialogTrigger, ListItem, Portal, DialogBackdrop, DialogContent, DialogPositioner, DialogBody } from "@chakra-ui/react";
import type { User } from "@/types";
import type { Post } from "@/types/Post";
import type { postImage } from "@/types/postImage";
import type { Rindou } from "@/types/Rindou";
import { Link as InertiaLink, router } from "@inertiajs/react";
import { FaArrowLeftLong, FaList } from "react-icons/fa6";
import { CiCalendar, CiLocationOn } from "react-icons/ci";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { GrEdit } from "react-icons/gr";
import { MdDelete } from "react-icons/md";

const PostShow = ({
    user,
    post,
    iconImage,
    postImages,
    rindous,
}: {
    user: User,
    post: Post,
    iconImage: string,
    postImages: postImage[],
    rindous: Rindou[],
}) => {
    return (
        <Grid
            templateRows={"repeat(10, 1fr)"}
            h={"100vh"}
        >
            <GridItem
                backgroundImage={`url(${iconImage})`}
                backgroundSize="cover"
                backgroundPosition="center"
                width="100%"
                rowSpan={3}
                position={"relative"}
                _before={{
                    content: '""',
                    position: "absolute",
                    inset: 0,
                    background: "rgba(255, 255, 255, 0.5)",
                }}
            >
                <Container>
                    <Flex
                        direction={"column"}
                        gap={5}
                        position={"relative"}
                        zIndex={1}
                        pt={5}
                    >
                        <Link
                            as={InertiaLink}
                            href={route("map.index")}
                            color={"white"}
                            bg={"gray.500"}
                            p={2}
                            w={"fit-content"}
                            borderRadius={"4xl"}
                        >
                            <HStack>
                                <FaArrowLeftLong />
                                <Text>戻る</Text>
                            </HStack>
                        </Link>
                        <Image
                            src={iconImage}
                            fit={"cover"}
                            w={"200px"}
                            h={"200px"}
                            borderRadius={"4xl"}
                            filter={"drop-shadow(0 0 0.75rem rgba(255, 255, 255, 0.7))"}
                        />
                    </Flex>
                </Container>
            </GridItem>
            <GridItem
                rowSpan={7}
            >
                <Container>
                    <Flex
                        direction={"column"}
                        gap={5}
                        pt={5}
                    >
                        <HStack justifyContent={"space-between"} alignItems={"center"}>
                            <Text fontSize={"2xl"} fontWeight={"bold"}>{post.title}</Text>
                            <HStack gap={3} alignItems={"center"}>
                                <Link
                                    as={InertiaLink}
                                    // href={route("post.edit", post.id)}
                                    bg={"green.500"}
                                >
                                    <HStack gap={1} alignItems={"center"} p={2} borderRadius={"xl"}>
                                        <GrEdit color={"white"} />
                                        <Text color={"white"}>編集する</Text>
                                    </HStack>
                                </Link>
                                <Link
                                    as={InertiaLink}
                                    // href={route("post.destroy", post.id)}
                                    bg={"red.500"}
                                >
                                    <HStack gap={1} alignItems={"center"} p={2} borderRadius={"xl"}>
                                        <MdDelete color={"white"} />
                                        <Text color={"white"}>削除する</Text>
                                    </HStack>
                                </Link>
                            </HStack>
                        </HStack>
                        <HStack>
                            <CiCalendar />
                            <Text>{new Date(post.created_at).toLocaleDateString("ja-JP")}</Text>
                        </HStack>
                        <HStack>
                            <CiLocationOn />
                            {rindous.map((rindou) => (
                                rindou.id === post.rindou_id && (
                                    <Text>{rindou.name}</Text>
                                )
                            ))}
                        </HStack>
                        <Text fontSize={"md"} lineHeight={"tall"}>{post.content}</Text>
                        <ListRoot py={10} >
                            <Grid templateColumns={"repeat(3, 1fr)"} gap={5} pr={5} >
                                {post.img && post.img.split(",").map((postImg) => (
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
                    </Flex>
                </Container>
            </GridItem>
        </Grid>
    );
};

export default PostShow;
