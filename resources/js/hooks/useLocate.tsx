import { useMap } from 'react-leaflet';
import L from 'leaflet';
import { useRef } from 'react';

const useLocate = () => {
    const map = useMap();
    const templateMarkerRef = useRef<L.Marker | null>(null);
    const markerRef = useRef<L.Marker | null>(null);

    const locate = () => {
        // 仮マーカー削除
        templateMarkerRef.current?.remove();
        templateMarkerRef.current = null;

        // 既存の本マーカーを削除
        markerRef.current?.remove();
        markerRef.current = null;

        // 仮マーカーの設置
        const center = map.getCenter();
        templateMarkerRef.current = L.marker(center)
            .addTo(map)
            .bindPopup('現在地取得中...')
            .openPopup();

        // 現在位置取得
        map.locate({
            setView: true,
            maxZoom: 10,
            enableHighAccuracy: false,
            timeout: 160000,
            maximumAge: 60000,
        });

        // 成功
        map.once('locationfound', (e) => {
            // 仮マーカー削除
            templateMarkerRef.current?.remove();
            templateMarkerRef.current = null;

            // 本マーカーの設置
            markerRef.current = L.marker(e.latlng)
                .addTo(map)
                .bindPopup('現在地')
                .openPopup();
        });

        // 失敗
        map.once('locationerror', (e) => {
            templateMarkerRef.current?.setPopupContent('取得失敗');
        });
    };

    return { locate };
};

export default useLocate;
