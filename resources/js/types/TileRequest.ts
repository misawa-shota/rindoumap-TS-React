export interface TileRequest {
    // 取得するJMAタイル
    zoom: number;
    x: number;
    y: number;

    // 元画像内の切り出し位置
    srcX: number;
    srcY: number;

    // 元画像内の切り出しサイズ
    srcSize: number

    // Canvasへ描くサイズ
    dstSize: number;

    key: string;
}
