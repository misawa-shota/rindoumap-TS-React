import { useState } from 'react';

const useSelectedMarkerIds = () => {
    // 選択されたマーカーのIDを管理するstate
    const [selectedMarkerIds, setSelectedMarkerIds] = useState<number[]>([]);

    // 選択されたマーカーのIDを切り替える関数（同じマーカーが選択された場合は配列から削除する）
    const toggleSelectedMarkerIds = (id: number) => {
        setSelectedMarkerIds((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]));
        // setSelectedMarkerIds((prev) => {
        //     const next = prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id];
        //     console.log('before: ', prev);
        //     console.log('after: ', next);
        //     return next;
        // });

    };

    const clearSelectedMarkerIds = () => {
        setSelectedMarkerIds([]);
    };

    // console.log('Selected IDs:', selectedMarkerIds); // デバッグ用ログ

    return { selectedMarkerIds, toggleSelectedMarkerIds, clearSelectedMarkerIds };
};

export default useSelectedMarkerIds;
