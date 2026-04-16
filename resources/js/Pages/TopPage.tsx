import { Box, HStack, Heading, InputGroup, Input, TabsRoot, TabsList, TabsTrigger, Image, Text, Link } from '@chakra-ui/react';
import { CiSearch, } from "react-icons/ci";
import { FaMap, FaList } from "react-icons/fa6";
import { usePage } from '@inertiajs/react';

const TopPage = (auth: { user: string | undefined }) => {
    const { imageUrl } = usePage().props as { imageUrl?: string };
    const url = imageUrl || '';

    return (
        <>
            <Box>
                <Box px={5} py={3} w={"100%"} bg={"gray.100"}>
                    <HStack alignItems="center" justifyContent={"space-between"}>
                        <Heading as={"h1"}>
                            <HStack alignItems="center">
                                <Image src={url} alt="RindouMap Logo" boxSize="40px" mr={2} />
                                <Text fontSize="2xl" fontWeight="bold">林道マップ</Text>
                            </HStack>
                        </Heading>
                        <InputGroup startElement={<CiSearch />} w={"3xl"}>
                            <Input placeholder="林道名で検索" rounded={"md"} />
                        </InputGroup>
                        <TabsRoot defaultValue={"index_map"} variant={"enclosed"} w={"fit-content"}>
                            <TabsList bg={"gray.200"} rounded={"md"} p={2} gap={3}>
                                <TabsTrigger
                                    value='index_map'
                                    _selected={{bg: "white", color: "black"}}
                                    rounded={"md"} p={2} textAlign={"center"}
                                    color={"gray"}>
                                    <FaMap />
                                    マップで検索
                                </TabsTrigger>
                                <TabsTrigger
                                    value='index_list'
                                    _selected={{bg: "white", color: "black"}}
                                    rounded={"md"} p={2} textAlign={"center"}
                                    color={"gray"}>
                                    <FaList />
                                    一覧で検索
                                </TabsTrigger>
                            </TabsList>
                        </TabsRoot>
                        {auth.user ? (
                            <Link href={route("dashboard")} color={"white"} rounded={"md"} p={2} textAlign={"center"} bg={"red"}>
                                マイページ
                            </Link>
                        ) : (
                            <HStack gap={2}>
                                <Link href={route("login")} color={"white"} rounded={"md"} p={2} textAlign={"center"} bg={"red"}>
                                    ログイン
                                </Link>
                                <Link href={route("register")} color={"white"} rounded={"md"} p={2} textAlign={"center"} bg={"red"}>
                                    新規登録
                                </Link>
                            </HStack>
                        )}
                    </HStack>
                </Box>
            </Box>
        </>
    );
};

export default TopPage;
