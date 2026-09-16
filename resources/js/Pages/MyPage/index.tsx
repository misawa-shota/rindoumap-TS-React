import { Box, Button, Flex, Grid, GridItem, Image, Link, HStack, Text, Tabs, Container, ScrollArea, Card, Stack, VStack, Span, Pagination, ButtonGroup, IconButton } from "@chakra-ui/react";
import type { User } from "@/types";
import type { PaginatedPosts } from "@/types/PaginatedPosts";
import type { postImage } from "@/types/postImage";
import type { Rindou } from "@/types/Rindou";
import { Link as InertiaLink, router } from "@inertiajs/react";
import { FaArrowLeftLong, FaList } from "react-icons/fa6";
import { CiCalendar, CiLocationOn } from "react-icons/ci";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const MyPage = ({
    user,
    posts,
    iconImage,
    postImages,
    rindous,
}: {
    user: User,
    posts: PaginatedPosts,
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
                <Tabs.Root
                    defaultValue={"posts"}
                    bg={"gray.100"}
                >
                    <Flex
                        flexDirection={"column"}
                    >
                        <Box
                            bg={"white"}
                        >
                            <Container>
                                <Tabs.List>
                                    <Tabs.Trigger
                                        value="posts"
                                        p={8}
                                        color={"gray.800"}
                                        fontSize={"lg"}
                                        _selected={{
                                            _before: {
                                                content: '""',
                                                borderBottom: "2px solid",
                                                borderColor: "red.500",
                                            }
                                        }}
                                    >
                                        <HStack
                                            gapX={2}
                                            alignItems={"center"}
                                        >
                                            <FaList />
                                            <Text>投稿一覧</Text>
                                        </HStack>
                                    </Tabs.Trigger>
                                    <Tabs.Trigger
                                        value="clears"
                                        p={8}
                                        color={"gray.800"}
                                        fontSize={"lg"}
                                        _selected={{
                                            _before: {
                                                content: '""',
                                                borderBottom: "2px solid",
                                                borderColor: "red.500",
                                            }
                                        }}
                                    >
                                        <HStack
                                            gapX={2}
                                            alignItems={"center"}
                                        >
                                            <FaList />
                                            <Text>走破した林道</Text>
                                        </HStack>
                                    </Tabs.Trigger>
                                </Tabs.List>
                            </Container>
                        </Box>
                        <Box
                            flex={1}
                        >
                            <Container maxWidth={"4xl"}>
                                <Tabs.Content value="posts">
                                    <ScrollArea.Root pb={5}>
                                        <ScrollArea.Viewport>
                                            <ScrollArea.Content>
                                                <Stack gap={5}>
                                                    {posts.data.map((post) => {
                                                        const postImage = post.img
                                                            .split(',')
                                                            .map((image) => (
                                                                postImages.find((storagePostImage) => storagePostImage.fileName === image)
                                                            ))
                                                            .find((image) => image !== undefined);
                                                        return (
                                                            <Card.Root
                                                                key={post.id}
                                                                flexDirection={"row"}
                                                                overflow={"hidden"}
                                                                border={"1px solid"}
                                                                maxW={"3xl"}
                                                                alignItems={"center"}
                                                            >
                                                                {post.img &&
                                                                        <Image
                                                                            src={postImage?.url}
                                                                            w={"200px"}
                                                                            height={"200px"}
                                                                            fit={"cover"}
                                                                        />
                                                                }
                                                                <Card.Body  p={5}>
                                                                    {rindous.map((rindou) => (
                                                                        rindou.id === post.rindou_id && (
                                                                            <Flex flexDirection={"row"} justifyContent={"space-between"} alignItems={"center"} key={rindou.id}>
                                                                                <HStack gap={10}>
                                                                                    <VStack alignItems={"flex-start"}>
                                                                                        <Card.Title fontWeight={"bold"} fontSize={"xl"}>{rindou.name}</Card.Title>
                                                                                        <HStack gapX={5}>
                                                                                            <CiCalendar/>
                                                                                            <Text>{new Date(post.created_at).toLocaleDateString("ja-JP")}</Text>
                                                                                        </HStack>
                                                                                        <HStack gapX={5}>
                                                                                            <CiLocationOn />
                                                                                            <Text>{rindou.prefecture}</Text>
                                                                                        </HStack>
                                                                                    </VStack>
                                                                                    {rindou.distance >= 1000 ? (
                                                                                        <Text fontWeight={"bold"} fontSize={"xl"}>
                                                                                            約
                                                                                            <Span fontSize={"3xl"}>{(rindou.distance / 1000).toFixed(1)}</Span>
                                                                                            km
                                                                                        </Text>
                                                                                        ) : (
                                                                                            <Text fontWeight={"bold"} fontSize={"xl"}>
                                                                                            約
                                                                                            <Span fontSize={"3xl"}>{rindou.distance.toFixed(1)}</Span>
                                                                                            m
                                                                                        </Text>
                                                                                    )}
                                                                                </HStack>
                                                                                <IoIosArrowForward size={30}/>
                                                                            </Flex>
                                                                        )
                                                                    ))}
                                                                </Card.Body>
                                                            </Card.Root>
                                                        )
                                                    })}
                                                </Stack>
                                            </ScrollArea.Content>
                                        </ScrollArea.Viewport>
                                        <Pagination.Root
                                            count={posts.total}
                                            pageSize={posts.per_page}
                                            page={posts.current_page}
                                            onPageChange={(details) => {
                                                router.get(
                                                    route("header.mypage"),
                                                    {
                                                        page: details.page,
                                                    },
                                                    {
                                                        preserveState: true,
                                                        preserveScroll: true,
                                                    }
                                                );
                                            }}
                                        >
                                            <ButtonGroup mt={5} justifyContent={"center"} variant={"ghost"} size={"sm"} gap={2} w={"100%"} >
                                                <Pagination.PrevTrigger asChild>
                                                    <IconButton>
                                                        <IoIosArrowBack size={30}/>
                                                    </IconButton>
                                                </Pagination.PrevTrigger>

                                                <Pagination.Items
                                                    render={(page) => {
                                                        return (
                                                            <Pagination.Item
                                                                key={page.value}
                                                                {...page}
                                                                border={"1px solid"}
                                                                borderColor={"transparent"}
                                                                _selected={{
                                                                    borderColor: "red.500",
                                                                    bg: "white",
                                                                }}
                                                                px={3}
                                                                py={1}
                                                            >
                                                                {page.value}
                                                            </Pagination.Item>
                                                        );
                                                    }}
                                                />

                                                <Pagination.NextTrigger asChild>
                                                    <IconButton>
                                                        <IoIosArrowForward size={30}/>
                                                    </IconButton>
                                                </Pagination.NextTrigger>
                                            </ButtonGroup>
                                        </Pagination.Root>
                                    </ScrollArea.Root>
                                </Tabs.Content>
                                <Tabs.Content value="clears">
                                    <Text>走破した林道の内容</Text>
                                </Tabs.Content>
                            </Container>
                        </Box>
                    </Flex>
                </Tabs.Root>
            </GridItem>
        </Grid>
    );
}

export default MyPage;
