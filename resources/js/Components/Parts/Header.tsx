import { Box, HStack, Heading, InputGroup, Group, Input, TabsList, TabsTrigger, Image, Text, Link, Grid, GridItem, Button, DialogRoot, DialogTrigger, Portal, DialogBackdrop, DialogCloseTrigger, DialogPositioner, DialogContent, DialogHeader, DialogTitle, CloseButton, DialogBody, DialogFooter, FieldRoot, FieldLabel, FieldErrorText, FieldErrorIcon, NativeSelectRoot, NativeSelectField, ListRoot, ListItem, Textarea, NativeSelectIndicator, FieldRequiredIndicator, FileUploadRoot, FileUploadHiddenInput, FileUploadTrigger, FileUploadList, FileUpload, FileUploadItemGroup } from '@chakra-ui/react';
import { CiSearch, } from "react-icons/ci";
import { FaMap, FaList } from "react-icons/fa6";
import { MdError } from "react-icons/md";
import { usePage } from '@inertiajs/react';
import type { PageProps } from '@/types/index';
import type { Rindou } from '@/types/Rindou';
import AppLogo from './AppLogo';
import { useState, useEffect } from 'react';
import { HiUpload } from 'react-icons/hi';

const Header = ({
    toggleSelectedMarkerIds,
    searchRindouId,
    getSearchData,
    getSelectedPrefecture,
    formSelectedRindous,
    storePost,
    postMessage,
}: {
    toggleSelectedMarkerIds: (id: number) => void;
    searchRindouId: number | null;
    getSearchData: (searchQuery: string) => void;
    getSelectedPrefecture: (prefecture: string) => void;
    formSelectedRindous: Rindou[];
    storePost: (postTitle: string, postContent: string, postRindouName: string, postImages: File[]) => void;
    postMessage: string;
}) => {
    const { auth } = usePage<PageProps>().props;
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedPrefecture, setSelectedPrefecture] = useState("");
    const [postTitle, setPostTitle] = useState("");
    const [postContent, setPostContent] = useState("");
    const [postRindouId, setPostRindouId] = useState("");
    const [postImages, setPostImages] = useState<File[]>([]);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if (searchRindouId !== null) {
            toggleSelectedMarkerIds(searchRindouId);
        }
    }, [searchRindouId]);

    useEffect(() => {
        getSelectedPrefecture(selectedPrefecture);
    }, [selectedPrefecture]);

    useEffect(() => {
        if (formSelectedRindous.length > 0) {
            setPostRindouId(String(formSelectedRindous[0].id));
        } else {
            setPostRindouId("");
        }
    }, [formSelectedRindous])

    useEffect(() => {
        if (postMessage === "") {
            return;
        } else if (postMessage === "post-create") {
            setIsOpen(false);
        } else if(postMessage === "post-create-error" ) {
            setIsOpen(true);
        }
    }, [ postMessage ]);

    const handlePostSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (
            postRindouId === "" ||
            postTitle.trim() === "" ||
            postContent.trim() === ""
        ) return;

        storePost(postTitle, postContent, postRindouId, postImages);
    };

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
                    <HStack gap={2} alignItems={"center"}>
                        <DialogRoot
                            size={"xl"}
                            placement={"center"}
                            motionPreset={"slide-in-bottom"}
                            open={isOpen}
                            onOpenChange={(e) => setIsOpen(e.open)}
                        >
                            <DialogTrigger asChild>
                                <Link
                                    color={"white"}
                                    rounded={"md"}
                                    p={2}
                                    textAlign={"center"}
                                    bg={"red"}
                                    onClick={() => setIsOpen(true)}
                                >
                                    投稿作成
                                </Link>
                            </DialogTrigger>
                                <DialogBackdrop />
                                <DialogPositioner>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle fontSize={"lg"} fontWeight={"bold"}>投稿作成</DialogTitle>
                                            <DialogCloseTrigger asChild>
                                                <CloseButton size={"lg"} onClick={() => setIsOpen(false)} />
                                            </DialogCloseTrigger>
                                        </DialogHeader>
                                        <DialogBody>
                                            <form onSubmit={handlePostSubmit}>
                                                <ListRoot gapY={5}>
                                                    <ListItem w={"lg"}>
                                                        <FieldRoot invalid required>
                                                            <FieldLabel>県名を選択<FieldRequiredIndicator /></FieldLabel>
                                                            <NativeSelectRoot>
                                                                <NativeSelectField
                                                                    value={selectedPrefecture}
                                                                    onChange={(e) => setSelectedPrefecture(e.target.value)}
                                                                >
                                                                    <option value="">県名を選択してください</option>
                                                                    <option value="北海道">北海道</option>
                                                                    <option value="青森県">青森県</option>
                                                                    <option value="岩手県">岩手県</option>
                                                                    <option value="宮城県">宮城県</option>
                                                                    <option value="秋田県">秋田県</option>
                                                                    <option value="山形県">山形県</option>
                                                                    <option value="福島県">福島県</option>
                                                                    <option value="茨城県">茨城県</option>
                                                                    <option value="栃木県">栃木県</option>
                                                                    <option value="群馬県">群馬県</option>
                                                                    <option value="埼玉県">埼玉県</option>
                                                                    <option value="千葉県">千葉県</option>
                                                                    <option value="東京都">東京都</option>
                                                                    <option value="神奈川県">神奈川県</option>
                                                                    <option value="新潟県">新潟県</option>
                                                                    <option value="富山県">富山県</option>
                                                                    <option value="石川県">石川県</option>
                                                                    <option value="福井県">福井県</option>
                                                                    <option value="山梨県">山梨県</option>
                                                                    <option value="長野県">長野県</option>
                                                                    <option value="岐阜県">岐阜県</option>
                                                                    <option value="静岡県">静岡県</option>
                                                                    <option value="愛知県">愛知県</option>
                                                                    <option value="三重県">三重県</option>
                                                                    <option value="滋賀県">滋賀県</option>
                                                                    <option value="京都府">京都府</option>
                                                                    <option value="大阪府">大阪府</option>
                                                                    <option value="兵庫県">兵庫県</option>
                                                                    <option value="奈良県">奈良県</option>
                                                                    <option value="和歌山県">和歌山県</option>
                                                                    <option value="鳥取県">鳥取県</option>
                                                                    <option value="島根県">島根県</option>
                                                                    <option value="岡山県">岡山県</option>
                                                                    <option value="広島県">広島県</option>
                                                                    <option value="山口県">山口県</option>
                                                                    <option value="徳島県">徳島県</option>
                                                                    <option value="香川県">香川県</option>
                                                                    <option value="愛媛県">愛媛県</option>
                                                                    <option value="高知県">高知県</option>
                                                                    <option value="福岡県">福岡県</option>
                                                                    <option value="佐賀県">佐賀県</option>
                                                                    <option value="長崎県">長崎県</option>
                                                                    <option value="熊本県">熊本県</option>
                                                                    <option value="大分県">大分県</option>
                                                                    <option value="宮崎県">宮崎県</option>
                                                                    <option value="鹿児島県">鹿児島県</option>
                                                                    <option value="沖縄県">沖縄県</option>
                                                                </NativeSelectField>
                                                            </NativeSelectRoot>
                                                            {selectedPrefecture === "" && (
                                                                <FieldErrorText><FieldErrorIcon />県名を選択してください</FieldErrorText>
                                                            )}
                                                        </FieldRoot>
                                                    </ListItem>
                                                    <ListItem w={"lg"}>
                                                        <FieldRoot invalid required>
                                                            <FieldLabel>林道名を選択<FieldRequiredIndicator /></FieldLabel>
                                                            <NativeSelectRoot>
                                                                {formSelectedRindous.length > 0 ? (
                                                                    <NativeSelectField
                                                                        value={postRindouId}
                                                                        onChange={(e) => setPostRindouId(e.target.value)}
                                                                    >
                                                                        {formSelectedRindous.map((rindou) => (
                                                                            <option key={rindou.id} value={rindou.id}>{rindou.name}</option>
                                                                        ))}
                                                                    </NativeSelectField>
                                                                ) : (
                                                                    <NativeSelectField defaultValue="">
                                                                        <option value="">選択された県に林道が存在しません</option>
                                                                    </NativeSelectField>
                                                                )}
                                                            </NativeSelectRoot>
                                                        </FieldRoot>
                                                    </ListItem>
                                                    <ListItem w={"3xl"}>
                                                        <FieldRoot invalid required>
                                                            <FieldLabel>投稿タイトル<FieldRequiredIndicator /></FieldLabel>
                                                            <Input
                                                                placeholder='投稿タイトルを入力してください'
                                                                value={postTitle}
                                                                onChange={(e) => setPostTitle(e.target.value)}
                                                            />
                                                            {postTitle.trim() === "" && (
                                                                <FieldErrorText><FieldErrorIcon />投稿タイトルを入力してください</FieldErrorText>
                                                            )}
                                                        </FieldRoot>
                                                    </ListItem>
                                                    <ListItem w={"3xl"}>
                                                        <FieldRoot invalid required>
                                                            <FieldLabel>投稿内容<FieldRequiredIndicator /></FieldLabel>
                                                            <Textarea
                                                                h={"sm"}
                                                                placeholder='投稿内容を入力してください'
                                                                value={postContent}
                                                                onChange={(e) => setPostContent(e.target.value)}
                                                            />
                                                            {postContent.trim() === "" && (
                                                                <FieldErrorText><FieldErrorIcon />投稿内容を入力してください</FieldErrorText>
                                                            )}
                                                        </FieldRoot>
                                                    </ListItem>
                                                    <ListItem>
                                                        <FieldRoot>
                                                            <FieldLabel>画像をアップロード（複数選択可能）</FieldLabel>
                                                            <FileUpload.Root maxFiles={10} >
                                                                <FileUpload.HiddenInput
                                                                    multiple
                                                                    accept='.jpeg,.jpg,.png,.JPEG,.JPG,.PNG'
                                                                    onChange=
                                                                        {
                                                                            (e) =>{
                                                                                if (e.target.files) {setPostImages(Array.from(e.target.files))}
                                                                            }
                                                                        }
                                                                />
                                                                <FileUpload.Trigger asChild>
                                                                    <Button p={3} borderWidth={"thin"} borderColor={"gray.500"} size={"sm"} >
                                                                        <HiUpload />
                                                                        画像を選択
                                                                    </Button>
                                                                </FileUpload.Trigger>
                                                                <FileUpload.ItemGroup mt={3}>
                                                                    <FileUpload.Context>
                                                                        {({rejectedFiles}) => (
                                                                            rejectedFiles.length > 0 &&
                                                                            <HStack>
                                                                                <MdError color={"red"} />
                                                                                <Text color={"red"}>
                                                                                    アップロードできる画像は10件までで、.jpeg,.jpg,.png,.JPEG,.JPG,.PNGの画像だけです。
                                                                                </Text>
                                                                            </HStack>
                                                                        )}
                                                                    </FileUpload.Context>
                                                                    <FileUpload.Context>
                                                                        {({ acceptedFiles }) => (
                                                                            <Grid templateColumns={"repeat(3, 1fr)"} gapX={3}>
                                                                                {acceptedFiles.map((file) => (
                                                                                    <GridItem key={file.name}>
                                                                                        <FileUpload.Item file={file}>
                                                                                            <FileUpload.ItemPreviewImage boxSize={"100px"} objectFit={"cover"} />
                                                                                            <FileUpload.ItemName />
                                                                                            <FileUpload.ItemSizeText />
                                                                                            <FileUpload.ItemDeleteTrigger />
                                                                                        </FileUpload.Item>
                                                                                    </GridItem>
                                                                                ))}
                                                                            </Grid>
                                                                        )}
                                                                    </FileUpload.Context>
                                                                </FileUpload.ItemGroup>
                                                            </FileUpload.Root>
                                                        </FieldRoot>
                                                    </ListItem>
                                                    <Button type={"submit"} fontWeight={"bold"} p={5} bg={"blue"} color={"white"}>
                                                        投稿する
                                                    </Button>
                                                </ListRoot>
                                            </form>
                                        </DialogBody>
                                    </DialogContent>
                                </DialogPositioner>
                        </DialogRoot>
                        <Link href={route("dashboard")} color={"white"} rounded={"md"} p={2} textAlign={"center"} bg={"red"}>
                            マイページ
                        </Link>
                    </HStack>
                ) : (
                    <HStack gap={2} alignItems={"center"}>
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
