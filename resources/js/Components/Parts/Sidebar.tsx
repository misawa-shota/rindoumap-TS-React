import { GridItem, HStack, Heading, ScrollAreaContent, ScrollAreaRoot, ScrollAreaViewport, Span, ScrollAreaScrollbar, ScrollAreaCorner, LinkBox, LinkOverlay, Image, Text, VStack, ListRoot, ListItem } from '@chakra-ui/react';
import { IoClose } from "react-icons/io5";
import type { Rindou } from '@/types/Rindou';
import type { SearchImages } from '@/types/SearchImages';

const Sidebar = ({
        selectedLastRindou,
        handleCloseSidebar,
        images,
    } : {
        selectedLastRindou: Rindou | undefined;
        handleCloseSidebar: () => void;
        images: SearchImages[];
    }) => {
    const distance = selectedLastRindou?.distance ?? 0;

    return (
        <GridItem colSpan={3} p={5}>
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
                    <ScrollAreaRoot height={"35rem"} size={"lg"} variant={"always"} my={5}>
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
                </ListItem>
            </ListRoot>
        </GridItem>
    );
};

export default Sidebar;
