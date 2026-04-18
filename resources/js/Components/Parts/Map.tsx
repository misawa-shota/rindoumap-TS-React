import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import FullScreen from './MapCustom/FullScreen';
import ZoomControl from './MapCustom/ZoomControl';

const Map = () => {
    delete (L.Icon.Default.prototype as any)._getIconUrl;

    L.Icon.Default.mergeOptions({
        iconRetinaUrl: markerIcon2x,
        iconUrl: markerIcon,
        shadowUrl: markerShadow,
    });

    return (
        <MapContainer
            center={[35.681236, 139.767125]} // 東京駅
            zoom={13}
            zoomControl={false}
            style={{ height: '100%', width: '100%' }}
        >
            <TileLayer
                attribution='&copy; OpenStreetMap contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <ZoomControl />
            <FullScreen />
            <Marker position={[35.681236, 139.767125]}>
                <Popup>東京駅</Popup>
            </Marker>
        </MapContainer>
    );
};

export default Map;
