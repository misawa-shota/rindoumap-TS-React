import L from 'leaflet';

type Rindou = {
    id: number;
    name: string;
    prefecture: string;
    lat: number;
    lng: number;
    created_at: Date;
    updated_at: Date;
    description: string;
    polyline_latlngs: L.LatLngExpression[] | null;
    drive_infomation: string;
    rindou_img: string;
};

export type { Rindou };
