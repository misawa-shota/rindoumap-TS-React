<?php

namespace App\Services\Radar;

class RadarTileCompositor
{
    public function __construct(
        private RadarDownloader $downloader,
    ) {}

    public function compose(
        string $targetTime,
        int $mapZoom,
        int $mapX,
        int $mapY
    ): string {
        $factor = 2 ** (10 - $mapZoom);

        $radarZoom = 10;

        $startX = $mapX * $factor;
        $startY = $mapY * $factor;

        $canvasSize = 256 * $factor;

        $canvas = imagecreatetruecolor($canvasSize, $canvasSize);

        imagealphablending($canvas, false);
        imagesavealpha($canvas, true);

        $transparent = imagecolorallocatealpha($canvas, 0, 0, 0, 127);
        imagefill($canvas, 0, 0, $transparent);

        for ($dy = 0; $dy < $factor; $dy++) {
            for ($dx = 0; $dx < $factor; $dx++) {

                $png = $this->downloader->download($targetTime, $radarZoom, $startX + $dx, $startY + $dy);
                $tile = imagecreatefromstring($png);

                if (!$tile) {
                    continue;
                }

                imagecopy($canvas, $tile, 256 * $dx, 256 * $dy, 0, 0, 256, 256);
                imagedestroy($tile);
            }
        }

        $result = imagecreatetruecolor(256, 256);

        imagealphablending($result, false);
        imagesavealpha($result, true);

        imagecopyresampled($result, $canvas, 0, 0, 0, 0, 256, 256, $canvasSize, $canvasSize);

        ob_start();
        imagepng($result);
        $png = ob_get_clean();

        imagedestroy($canvas);
        imagedestroy($result);

        return $png;
    }
}
