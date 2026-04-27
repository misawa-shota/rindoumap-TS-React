import { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";

const ZoomToPolylines = ({ latlngsList }: { latlngsList: L.LatLngExpression[][] }): null => {
    const map = useMap();

    useEffect(() => {
        if (!latlngsList || latlngsList.length === 0) return;

        const allPoints = latlngsList.flat();
        const bounds = L.latLngBounds(allPoints);

        map.fitBounds(bounds, { padding: [50, 50] });
    }, [latlngsList]);

    return null;
};

export default ZoomToPolylines;
