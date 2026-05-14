import axios from "axios";
import type { Rindou } from "@/types/Rindou";
import { useCallback, useState } from "react";
import type { SearchImages } from "@/types/SearchImages";

const useSearchRindou = ({ selectedLastRindou }: { selectedLastRindou: Rindou | undefined }) => {
    const [ searchImages, setSearchImages ] = useState<SearchImages[]>([]);

    const handleSearchRindou = useCallback(async () => {
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

    return {
        handleSearchRindou,
        searchImages,
    };
};

export default useSearchRindou;
