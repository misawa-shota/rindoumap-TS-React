<?php

namespace App\Services\Radar;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Cache;

class RadarDownloader
{
    public function download(
        string $targetTime,
        int $z,
        int $x,
        int $y
    ): string {
        $url = sprintf(
            'https://www.jma.go.jp/bosai/jmatile/data/nowc/%1$s/none/%1$s/surf/hrpns/%2$d/%3$d/%4$d.png',
            $targetTime,
            $z,
            $x,
            $y
        );

        $cacheKey = sprintf('jma_png_%s_%d_%d_%d', $targetTime, $z, $x, $y);

        return Cache::remember($cacheKey, now()->addMinutes(5), function () use ($url) {
            $response = Http::timeout(10)->get($url);

            if (!$response->successful()) {
                return $this->transparentTile();
            }
            return $response->body();
        });

        // file_put_contents(storage_path('app/radar.png'), $response->body());

        // dd('saved');
    }

    private function transparentTile(): string
    {
        $image = imagecreatetruecolor(256, 256);

        imagealphablending($image, false);
        imagesavealpha($image, true);

        $transparent = imagecolorallocatealpha($image, 0, 0, 0, 127);
        imagefill($image, 0, 0, $transparent);

        ob_start();
        imagepng($image);
        $png = ob_get_clean();
        return $png;
    }
}
