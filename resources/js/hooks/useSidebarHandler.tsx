import { useState, useMemo, useEffect } from 'react';
import type { Rindou } from '@/types/Rindou';

const useSidebarHandler = ({selectedRindous, clearSelectedMarkerIds, closeAllPopups}: { selectedRindous: Rindou[]; clearSelectedMarkerIds: () => void; closeAllPopups: () => void }) => {
    // サイドバーの表示/非表示を切り替えるロジックをここに実装
    // console.log('Selected Rindous in SidebarHandler:', selectedRindous); // デバッグ用ログ

    const [isOpen, setIsOpen] = useState(false);

    const selectedLastRindou: Rindou | undefined = useMemo(() => {
        if (selectedRindous.length === 0) return undefined;  // 選択されたRindouがない場合はundefinedを返す

        return selectedRindous[selectedRindous.length - 1];  // 最後に選択されたRindouを返す
    }, [selectedRindous]);

    useEffect(() => {
        setIsOpen(selectedRindous.length > 0);  // selectedRindousの長さが0より大きい場合はサイドバーを開く
    }, [selectedRindous]);

    // console.log('selectedLasrtRindou in SidebarHandler:', selectedLastRindou); // デバッグ用ログ

    const handleCloseSidebar = () => {
        closeAllPopups();
        setTimeout(() => {
            clearSelectedMarkerIds();
        }, 0);
    };

    return {
        isOpen,
        selectedLastRindou,
        handleCloseSidebar,
    };
};

export default useSidebarHandler;
