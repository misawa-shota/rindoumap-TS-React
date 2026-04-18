import { useMap } from 'react-leaflet';
import L from 'leaflet';
import { useEffect } from 'react';

const ZoomControl = () => {
    const map = useMap();
    useEffect(() => {
        L.control.zoom({
            position: 'topleft',
        }).addTo(map);
    }, [map]);

    return null;
};

export default ZoomControl;
