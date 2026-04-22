import { useMap } from 'react-leaflet';
import L from 'leaflet';
import { useRef } from 'react';

const useLocate = () => {
    const map = useMap();
    const markerRef = useRef<L.Marker | null>(null);

    const locate = () => {
        // 仮マーカー
        const center = map.getCenter();

        if (!markerRef.current) {
            markerRef.current = L.marker(center).addTo(map);
        } else {
            markerRef.current.setLatLng(center);
        }

        markerRef.current
            .bindPopup('現在地取得中...')
            .openPopup();

        // 位置取得
        map.locate({
            setView: true,
            maxZoom: 16,
            enableHighAccuracy: false,
            timeout: 160000,
            maximumAge: 60000,
        });

        // 成功
        map.once('locationfound', (e) => {
            markerRef.current?.setLatLng(e.latlng);
            markerRef.current?.setPopupContent('現在地');
        });

        // 失敗
        map.once('locationerror', (e) => {
            markerRef.current?.setPopupContent('取得失敗');
        });
    };

    return { locate };
};

export default useLocate;
