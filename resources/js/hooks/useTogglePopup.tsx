import { useRef } from "react";

const useTogglePopup = () => {
    const markerRefs = useRef<Record<number, L.Marker | null>>({});

    const setMarkerRef = (id: number) => (marker: L.Marker | null) => {
        markerRefs.current[id] = marker;
    };

    const togglePopup = ({ id, isOpen }: { id: number; isOpen: boolean }) => {
        setTimeout(() => {
            const marker = markerRefs.current[id];

            if (!marker) return;

            if (isOpen) {
                marker.openPopup();
            } else {
                marker.closePopup();
            }
        }, 0);
    };

    const closeAllPopups = () => {
        setTimeout(() => {
            Object.values(markerRefs.current).forEach((marker) => {
                if (!marker) return;
                marker.closePopup();
            });
        }, 0);
    };

    return { setMarkerRef, togglePopup, closeAllPopups };
};

export default useTogglePopup;
