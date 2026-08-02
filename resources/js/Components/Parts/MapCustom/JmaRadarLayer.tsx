import { useEffect, useRef } from "react";
import { useMap } from "react-leaflet";
import JmaRadarGridLayer from "./layers/JmaRadarGridLayer";

type Props = {
    targetTime: string;
};

const JmaRadarLayer = ({ targetTime }: Props) => {
    const map = useMap();
    const targetTimeRef = useRef(targetTime);
    const layerRef = useRef<JmaRadarGridLayer | null>(null);

    useEffect(() => {
        targetTimeRef.current = targetTime;

        if (layerRef.current) {
            layerRef.current.redraw();
        }
    },[targetTime])

    useEffect(() => {
        // Paneが作成されていない場合は作成する
        if (!map.getPane("rainPane")) {
            const pane = map.createPane("rainPane");

            pane.style.zIndex = "650"; // 既存のレイヤーの上に表示されるようにz-indexを設定
            pane.style.pointerEvents = "none"; // マウスイベントを無効化
        }

        const layer = new JmaRadarGridLayer({
            pane: "rainPane",
            getTargetTime: () => targetTimeRef.current,
            tileSize: 256,
            updateWhenZooming: false,
            updateWhenIdle: true,
            keepBuffer: 2,
        });

        layerRef.current = layer;

        map.addLayer(layer);
        return () => {
            map.removeLayer(layer);
        };

    }, [map]);

    return null;
};

export default JmaRadarLayer;
