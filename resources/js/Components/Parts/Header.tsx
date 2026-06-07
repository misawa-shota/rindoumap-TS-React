import { Box, HStack, Heading, InputGroup, Group, Input, TabsList, TabsTrigger, Image, Text, Link, Grid, GridItem, Button } from '@chakra-ui/react';
import { CiSearch, } from "react-icons/ci";
import { FaMap, FaList } from "react-icons/fa6";
import { usePage } from '@inertiajs/react';
import type { PageProps } from '@/types/index';
import AppLogo from './AppLogo';
import { useState, useEffect } from 'react';

const Header = ({
    toggleSelectedMarkerIds,
    searchRindouId,
    getSearchData
}: {
    toggleSelectedMarkerIds: (id: number) => void;
    searchRindouId: number | null;
    getSearchData: (searchQuery: string) => void;
}) => {
    const { auth } = usePage<PageProps>().props;
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        if (searchRindouId !== null) {
            toggleSelectedMarkerIds(searchRindouId);
        }
    }, [searchRindouId]);

    return (
        <Box px={5} py={3} w={"100%"} h={20} bg={"gray.100"}>
            <HStack alignItems="center" justifyContent={"space-between"}>
                <AppLogo />
                <Group attached>
                    <InputGroup
                        startElement={<CiSearch />}
                        w={"2xl"}
                    >
                        <Input
                            placeholder="林道名で検索"
                            roundedLeft={"md"}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </InputGroup>
                    <Button
                        bg={"red"}
                        color={"white"}
                        roundedRight={"md"}
                        borderTopWidth={"thin"}
                        borderRightWidth={"thin"}
                        borderBottomWidth={"thin"}
                        borderColor={"gray.500"}
                        p={2}
                        onClick={() => {
                            getSearchData(searchQuery);
                            setSearchQuery("");
                        }}
                    >検索</Button>
                </Group>
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
                {auth?.user ? (
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
    );
};

export default Header;
