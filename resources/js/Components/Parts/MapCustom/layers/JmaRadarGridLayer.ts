import L from "leaflet";

import TileCalculator from "./TileCalculator";
import TileFetcher from "./TileFetcher";
import TileRenderer from "./TileRenderer";

interface JmaRadarGridLayerOptions extends L.GridLayerOptions {
    getTargetTime: () => string;
}

export default class JmaRadarGridLayer extends L.GridLayer {
    private readonly calculator = new TileCalculator();
    private readonly renderer = new TileRenderer();
    private readonly fetcher = new TileFetcher();
    private readonly jmaOptions: JmaRadarGridLayerOptions;

    constructor(options: JmaRadarGridLayerOptions) {
        super({
            ...options,
            updateWhenZooming: false,
            updateWhenIdle: true,
            keepBuffer: 4,
        });
        // デバッグ用
        // console.log("JmaRadarGridLayer created");
        this.jmaOptions = options;
    }

    override createTile(
        coords: L.Coords,
        done: L.DoneCallback,
    ): HTMLElement {
        const canvas = document.createElement("canvas");

        canvas.width = 256;
        canvas.height = 256;

        // 奇数ズームだけ2倍表示
        if (coords.z % 2 === 1) {
            canvas.style.width = "512px";
            canvas.style.height = "512px";
        }

        void this.loadTile(
            coords,
            canvas,
            done,
        );

        // console.log("return canvas =", canvas);

        return canvas;
    }

    private async loadTile(
        coords: L.Coords,
        canvas: HTMLCanvasElement,
        done: L.DoneCallback,
    ): Promise<void> {

        try {
            const id = `${coords.z}/${coords.x}/${coords.y}`;
            // console.log("coords", coords);
            const request = this.calculator.calculate(
                coords.z,
                coords.x,
                coords.y,
            );
            // console.log(`[${id}] request`, request);

            const targetTime = this.jmaOptions.getTargetTime();
            // console.log(targetTime);

            if (!targetTime) {
                done(undefined, canvas);
                return;
            }

            const image = await this.fetcher.fetch(
                targetTime,
                request,
            );

            // console.log("image", image);
            // console.log("image.width", image?.width);
            // console.log("image.height", image?.height);

            if (!image) {
                done(undefined, canvas);
                return;
            }

            this.renderer.render(
                canvas,
                image,
                request,
            );

            // ===== デバッグ開始 =====
            // console.log("----- canvas debug -----");
            // console.log("isConnected =", canvas.isConnected);
            // console.log("parent =", canvas.parentElement);
            // console.log("class =", canvas.className);
            // console.log("width =", canvas.width);
            // console.log("height =", canvas.height);
            // console.log("style =", canvas.getAttribute("style"));

            const ctx = canvas.getContext("2d");
            if (ctx) {
                const pixel = ctx.getImageData(128, 128, 1, 1).data;
                // console.log("center pixel =", pixel);
            }

            // _tiles 内でこの canvas を探す
            // const tiles = (this as unknown as {
            //     _tiles: Record<
            //         string,
            //         {
            //             el: HTMLCanvasElement;
            //             coords: L.Coords;
            //             current: boolean;
            //         }
            //     >;
            // })._tiles;

            // let found = false;

            // for (const key of Object.keys(tiles)) {
            //     if (tiles[key].el === canvas) {
            //         found = true;
            //         console.log("FOUND TILE =", key);
            //         console.log(tiles[key]);
            //     }
            // }

            // console.log("found =", found);
            // console.log("------------------------");
            // ===== デバッグ終了 =====


            done(undefined, canvas);

            // console.log("render canvas =", canvas);
        } catch (error) {
            console.error(error);
            done(error as Error, canvas);
        }
    }
}
