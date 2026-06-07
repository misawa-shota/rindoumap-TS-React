import axios from "axios";
import { useState } from "react";

const useSearchRindou = () => {
    const [ searchRindouId, setSearchRindouId ] = useState<number | null>(null);

    const getSearchData = async (searchQuery: string) => {
        if (searchQuery.trim() === "") return;

        try {
            const response = await axios.post("/header/search", {
                searchQuery: searchQuery,
            });
            console.log(response.data.id);
            setSearchRindouId(response.data.id);
        } catch (error: any) {
            console.error(error);
            console.error(error.response.data);
            console.error(error.response.status);
        }
    };
    return { searchRindouId, getSearchData };
};

export default useSearchRindou;
