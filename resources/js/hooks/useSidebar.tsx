import axios from "axios";
import { useCallback, useState } from "react";
import type { Rindou } from "@/types/Rindou";
import type { SearchImages } from "@/types/SearchImages";
import type { Posts } from "@/types/Posts";
import type { iconImage } from "@/types/iconImage";
import type { postImage } from "@/types/postImage";

const useSidebar = ({ selectedLastRindou }: { selectedLastRindou: Rindou | undefined }) => {
    const [ searchImages, setSearchImages ] = useState<SearchImages[]>([]);
    const [ posts, setPosts ] = useState<Posts[]>([]);
    const [ iconImages, setIconImages ] = useState<iconImage[]>([]);
    const [ postImages, setPostImages ] = useState<postImage[]>([]);

    const getSearchRindou = useCallback(async () => {
        if (!selectedLastRindou) return;

        try {
            const response = await axios.post("/sidebar/search", {
                searchRindou: selectedLastRindou,
            });

            setSearchImages(response.data);

        } catch (error: any) {
            console.error(error);
            console.error(error.response.data);
            console.error(error.response.status);
        }
    }, [selectedLastRindou]);

    const getPostsRindou = useCallback(async () => {
        if (!selectedLastRindou) return;

        try {
            const response = await axios.post("/sidebar/posts", {
                postsRindou: selectedLastRindou,
            });

            setPosts(response.data.posts);
            setIconImages(response.data.iconImages);
            setPostImages(response.data.postImages);
        } catch (error: any) {
            console.log(error);
            console.error(error.response.data);
            console.error(error.response.status);
        }
    }, [selectedLastRindou]);

    return {
        getSearchRindou,
        getPostsRindou,
        searchImages,
        posts,
        iconImages,
        postImages,
    };
};

export default useSidebar;
