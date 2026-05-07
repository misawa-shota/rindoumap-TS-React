import { useMemo } from 'react';
import type { Rindou } from '@/types/Rindou';

const useTogglePolyline = ({rindouList, selectedRindous}: { rindouList: Rindou[]; selectedRindous: Rindou[] }) => {
    // ポリラインの表示/非表示を切り替えるロジックをここに実装

    const getLatlngs = useMemo(() => {
        if (selectedRindous.length === 0) return [];  // 選択されたRindouがない場合も空配列を返す

        return selectedRindous
            .map((rindou) => {
                if (typeof rindou.polyline_latlngs !== 'string') return null;
                return JSON.parse(rindou.polyline_latlngs);
            })
            .filter((latlngs): latlngs is L.LatLngExpression[] => latlngs !== null);

        // console.log('Selected Rindou Latlngs:', selectedRindouLatlngs); // デバッグ用ログ

    }, [selectedRindous]);


    return {
        getLatlngs
    };
};

export default useTogglePolyline;
