import { TileRequest } from "@/types/TileRequest";

export default class TileRenderer {
    public render(
        canvas: HTMLCanvasElement,
        image: HTMLImageElement,
        request: TileRequest,
    ): void {

        const ctx = canvas.getContext("2d");

        if (!ctx) {
            return;
        }

        ctx.clearRect(
            0,
            0,
            canvas.width,
            canvas.height,
        );

        ctx.imageSmoothingEnabled = false;

        ctx.globalAlpha = 0.6;

        ctx.drawImage(
            image,

            // 元画像のどこを切り出すか
            request.srcX,
            request.srcY,
            request.srcSize,
            request.srcSize,

            // Canvas全体へ描画
            0,
            0,
            canvas.width,
            canvas.height,
        );
    }
}
