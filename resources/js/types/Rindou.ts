type Rindou = {
    id: number;
    name: string;
    prefecture: string;
    lat: number;
    lng: number;
    created_at: Date;
    updated_at: Date;
    description: string;
    polyline_latlngs: Text;
    drive_infomation: Text;
    rindou_img: string;
};

export type { Rindou };
