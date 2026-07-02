import axios from "axios";
import { useState } from "react";
import { Rindou } from "@/types/Rindou";

const useHeaderHandler = () => {
    const [ searchRindouId, setSearchRindouId ] = useState<number | null>(null);
    const [ searchMessage, setSearchMessage] = useState<string>("");
    const [ formSelectedRindous, setFormSelectedRindous ] = useState<Rindou[]>([]);
    const [ postMessage, setPostMessage ] = useState("");

    const getSearchData = async (searchQuery: string) => {
        if (searchQuery.trim() === "") return;

        try {
            const response = await axios.post("/header/search", {
                searchQuery: searchQuery,
            });
            if (response.data.status === "search-success") {
                setSearchRindouId(response.data.result.id);
            } else if (response.data.status === "search-error") {
                setSearchRindouId(null);
                setSearchMessage("search-error");
            }
        } catch (error: any) {
            console.error(error);
            console.error(error.response.data);
            console.error(error.response.status);
        }
    };

    const getSelectedPrefecture = async (selectedPrefecture: string) => {
        if (selectedPrefecture.trim() === "") setFormSelectedRindous([]);

        try {
            const response = await axios.post("/header/getPrefecture", {
                selectedPrefecture: selectedPrefecture,
            });
            setFormSelectedRindous(response.data.rindous);
        } catch (error: any) {
            console.error(error);
            console.error(error.response.data);
            console.error(error.response.status);
        }
    };

    const storePost = async (postTitle: string, postContent: string, postRindouId: string, postImages: File[]) => {
        if (
            postRindouId === "" ||
            postTitle.trim() === "" ||
            postContent.trim() === ""
        ) return false;

        try {
            const formData = new FormData();
            formData.append('title', postTitle);
            formData.append('content', postContent);
            formData.append('rindou_id', postRindouId);
            if (postImages.length > 0) {
                postImages.forEach((image) => {
                    formData.append('img[]', image);
                });
            };

            const response = await axios.post("/header/storePost", formData);
            setPostMessage(response.data.status);
            console.log(response.data.status);
        } catch (error: any) {
            console.log(error);
            console.error(error.response.data);
            console.error(error.response.status);

            return false;
        }
    };

    return { searchMessage, searchRindouId, getSearchData, getSelectedPrefecture, formSelectedRindous, storePost, postMessage };
};

export default useHeaderHandler;
