import { useEffect } from 'react';
import L from 'leaflet';
import { useMap } from 'react-leaflet';
import 'leaflet-fullscreen';

const FullScreen = () => {
    const map = useMap();
    useEffect(() => {
        L.control.fullscreen({
            position: 'topleft',
        }).addTo(map);
    }, [map]);

    return null;
};

export default FullScreen;
