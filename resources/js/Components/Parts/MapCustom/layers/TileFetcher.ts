import { TileRequest } from "@/types/TileRequest";
import TileCache from "./TileCache";

export default class TileFetcher {
    // タイルがぞうを取得する
    public async fetch(
        targetTime: string,
        request: TileRequest,
    ): Promise<HTMLImageElement | null> {
        // console.log("request", request);
        const image = new Image();
        image.crossOrigin = "anonymous";
        const url =
            `https://www.jma.go.jp/bosai/jmatile/data/nowc/` +
            `${targetTime}/none/${targetTime}/surf/hrpns/` +
            `${request.zoom}/${request.x}/${request.y}.png`;

        // console.log("URL =", url);

        image.src = url;

        return new Promise((resolve) => {
            image.onload = () => {
                resolve(image);
            };
            image.onerror = () => {
                console.error(
                    `Failed to load tile: ${image.src}`,
                );
                resolve(null);
            };
        });
    }
}
