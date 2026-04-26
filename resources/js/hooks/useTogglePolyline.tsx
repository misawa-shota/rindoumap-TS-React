import { useState, useMemo } from 'react';
import type { Rindou } from '@/types/Rindou';

const useTogglePolyline = (rindouList: Rindou[]) => {
    // ポリラインの表示/非表示を切り替えるロジックをここに実装
    const [selectedId, setSelectedId] = useState<number[]>([]);

    const toggle = (id: number) => {
        setSelectedId((prevId) => (prevId.includes(id) ? prevId.filter((i) => i !== id) : [...prevId, id]));
    }

    const getLatlngs = useMemo(() => {
        if (selectedId.length === 0) return null;
        // console.log('Selected IDs:', selectedId); // デバッグ用ログ

        const selectedRindou: Rindou[] = rindouList.filter((rindou) => selectedId.includes(rindou.id));
        // console.log('Selected Rindou:', selectedRindou); // デバッグ用ログ
        if (selectedRindou.length === 0) return null;

        const selectedRindouLatlngs: L.LatLngExpression[][] = selectedRindou.map((rindou) => {
            if (typeof rindou.polyline_latlngs !== 'string') return null;
            return JSON.parse(rindou.polyline_latlngs);
        });

        // console.log('Selected Rindou Latlngs:', selectedRindouLatlngs); // デバッグ用ログ

        if (!Array.isArray(selectedRindouLatlngs) || selectedRindouLatlngs.length === 0) return null;
        return selectedRindouLatlngs;

    }, [selectedId, rindouList]);


    return {
        toggle,
        getLatlngs
    };
};

export default useTogglePolyline;
