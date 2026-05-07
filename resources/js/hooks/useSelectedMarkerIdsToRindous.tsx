import { useMemo } from 'react';
import type { Rindou } from '@/types/Rindou';

const useSelectedMarkerIdsToRindous = ({rindouList, selectedMarkerIds}: { rindouList: Rindou[]; selectedMarkerIds: number[] }): Rindou[] => {
    // 選択されたマーカーIDに対応するRindouを抽出するロジック
    // console.log('SelectedMarkerIds:', selectedMarkerIds); // デバッグ用ログ

    const selectedRindous: Rindou[] = useMemo(() => {
        if (selectedMarkerIds.length === 0) return [];  // 選択されたマーカーがない場合は空配列を返す

        return selectedMarkerIds
            .map((id) => rindouList.find((rindou) => rindou.id === id))  // selectedMarkerIdsの各IDに対して、rindouListから対応するRindouを見つける
            .filter((rindou): rindou is Rindou => rindou !== undefined);  // undefinedを除外してRindou型の配列を返す
    }, [selectedMarkerIds, rindouList]);

    return selectedRindous;
};

export default useSelectedMarkerIdsToRindous;
