import axios from "axios";
import { useState } from "react";

const useSearchRindou = () => {
    const [ searchRindouId, setSearchRindouId ] = useState<number | null>(null);
    const [ searchStatus, setSearchStatus] = useState<string>("");

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
                setSearchStatus("search-error");
            }
        } catch (error: any) {
            console.error(error);
            console.error(error.response.data);
            console.error(error.response.status);
        }
    };
    return { searchStatus, searchRindouId, getSearchData };
};

export default useSearchRindou;
