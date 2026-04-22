import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup, LayersControl } from 'react-leaflet';
import { useMap } from 'react-leaflet';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import FullScreen from './MapCustom/FullScreen';
import ZoomControl from './MapCustom/ZoomControl';
import LocateButton from './MapCustom/LocateButton';
import InitialLocate from './MapCustom/InitialLocate';

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
            <LayersControl position="topright">
                <LayersControl.BaseLayer checked name="国土地理院 標準">
                    <TileLayer
                        attribution="&copy; 国土地理院"
                        url="https://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png"
                        minZoom={2}
                        maxZoom={18}
                    />
                </LayersControl.BaseLayer>
                <LayersControl.BaseLayer name="国土地理院 写真">
                    <TileLayer
                        attribution="&copy; 国土地理院"
                        url="https://cyberjapandata.gsi.go.jp/xyz/seamlessphoto/{z}/{x}/{y}.jpg"
                        minZoom={2}
                        maxZoom={18}
                    />
                </LayersControl.BaseLayer>
                <LayersControl.BaseLayer name="国土地理院 陰影起伏図">
                    <TileLayer
                        attribution="&copy; 国土地理院"
                        url="https://cyberjapandata.gsi.go.jp/xyz/relief/{z}/{x}/{y}.png"
                        maxZoom={15}
                    />
                </LayersControl.BaseLayer>
                <LayersControl.BaseLayer name="OpenTopoMap">
                    <TileLayer
                        attribution="© OpenTopoMap contributors"
                        url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
                        minZoom={0}
                        maxZoom={17}
                    />
                </LayersControl.BaseLayer>
                <LayersControl.BaseLayer name="OpenStreetMap">
                    <TileLayer
                        attribution='&copy; OpenStreetMap contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        minZoom={0}
                        maxZoom={19}
                    />
                </LayersControl.BaseLayer>
                <LayersControl.Overlay name="雲レイヤー">
                    <TileLayer
                        url="https://tile.openweathermap.org/map/clouds_new/{z}/{x}/{y}.png?appid=d334b90a323d9d1c6fa75f5758ec6e69"
                        opacity={0.9}
                        zIndex={80}
                    />
                </LayersControl.Overlay>
                <LayersControl.Overlay checked name="雨レイヤー">
                    <TileLayer
                        url="https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=d334b90a323d9d1c6fa75f5758ec6e69"
                        zIndex={100}
                        className="rain-layer"
                    />
                </LayersControl.Overlay>
                <LayersControl.Overlay name="気温レイヤー">
                    <TileLayer
                        url="https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=d334b90a323d9d1c6fa75f5758ec6e69"
                        opacity={0.7}
                        zIndex={50}
                    />
                </LayersControl.Overlay>
            </LayersControl>
            <LocateButton />
            <ZoomControl />
            <FullScreen />
            <InitialLocate />
            <Marker position={[35.681236, 139.767125]}>
                <Popup>東京駅</Popup>
            </Marker>
        </MapContainer>
    );
};

export default Map;
