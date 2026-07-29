import { TileRequest } from "@/types/TileRequest";

export default class TileCalculator {
    private readonly nativeZoom = 10;

    public calculate(
        z: number,
        x: number,
        y: number,
    ): TileRequest {
        // ネイティブズームを決める
        const nativeZoom = Math.min(
            this.nativeZoom,
            z % 2 === 0 ? z : z - 1,
        );

        const diff = z - nativeZoom;

        const factor = 1 << diff;

        const nativeX = Math.floor(
            x / factor
        );

        const nativeY = Math.floor(
            y / factor
        );

        const srcSize = 256 / factor;

        const srcX = (x % factor) * srcSize;
        const srcY = (y % factor) * srcSize;

        return {
            zoom: nativeZoom,
            x: nativeX,
            y: nativeY,
            srcX,
            srcY,
            srcSize,
            dstSize: 256,
            key: `${nativeZoom}/${nativeX}/${nativeY}`,
        };
    }
}
