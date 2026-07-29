<?php

namespace App\Services\Rain;

class RainColorConverter
{
    public function convert(string $imageData)
    {
        $image = imagecreatefromstring($imageData);

        if (!$image) {
            throw new \RuntimeException('PNG画像の読み込みに失敗しました。');
        }

        if (!imageistruecolor($image)) {
            imagepalettetotruecolor($image);
        }

        imagesavealpha($image, true);

        $width = imagesx($image);
        $height = imagesy($image);

        // 最小・最大のアルファ値を取得
        $minAlpha = 127;
        $maxAlpha = 0;

        for ($y = 0; $y < $height; $y++) {
            for ($x = 0; $x < $width; $x++) {
                $index = imagecolorat($image, $x, $y);
                $rgba = imagecolorsforindex($image, $index);

                $alpha = $rgba['alpha'];

                if ($alpha == 127) {
                    continue; // 完全に透明なピクセルは無視
                }

                $minAlpha = min($minAlpha, $alpha);
                $maxAlpha = max($maxAlpha, $alpha);
            }
        }

        // 雨なし
        if ($minAlpha == 127) {
            ob_start();
            imagepng($image);
            return ob_get_clean();
        }

        // 雨あり
        $cache = [];

        for ($y = 0; $y < $height; $y++) {
            for ($x = 0; $x < $width; $x++) {
                $index = imagecolorat($image, $x, $y);
                $rgba = imagecolorsforindex($image, $index);

                $alpha = $rgba['alpha'];

                if ($alpha == 127) {
                    continue; // 完全に透明なピクセルは無視
                }

                $intensity = $this->getRainIntensity($alpha, $minAlpha, $maxAlpha);
                $intensity = pow($intensity, 0.6);

                [$r, $g, $b] = $this->rainColor($intensity);

                // 雨を見やすくするために、アルファ値を調整
                $newAlpha = max(0, (int) (35 - $intensity * 35));

                $key = "{$r},{$g},{$b},{$newAlpha}";

                if (!isset($cache[$key])) {
                    $cache[$key] = imagecolorallocatealpha($image, $r, $g, $b, $newAlpha);
                }

                imagesetpixel($image, $x, $y, $cache[$key]);
            }
        }
        ob_start();
        imagepng($image);
        return ob_get_clean();
    }

    // アルファ値を0-1の範囲に正規化して雨の強さを計算
    private function getRainIntensity(int $alpha, int $minAlpha, int $maxAlpha): float
    {
        if ($maxAlpha == $minAlpha) {
            return 1.0; // 最大値と最小値が同じ場合、強さは最大とする
        }
        return ($maxAlpha - $alpha) / ($maxAlpha - $minAlpha);
    }

    // Yahoo風グラデーション
    private function rainColor(float $t): array
    {
        $colors = [
            // 弱い雨
            [198, 242, 255],
            [170, 232, 255],
            [126, 216, 255],
            [90, 190, 255],

            // 青
            [41, 151, 255],
            [25, 110, 255],
            [6, 92, 245],
            [0, 70, 220],

            // 紫
            [70, 45, 235],
            [123, 44, 255],
        ];

        $count = count($colors) - 1;
        $position = $t * $count;
        $index = (int) floor($position);

        if ($index >= $count) {
            return $colors[$count];
        }

        $rate = $position - $index;

        return $this->interpolate($colors[$index], $colors[$index + 1], $rate);
    }

    // 色補完
    private function interpolate(array $from, array $to, float $t): array
    {
        return [
            (int) round($from[0] + ($to[0] - $from[0]) * $t),
            (int) round($from[1] + ($to[1] - $from[1]) * $t),
            (int) round($from[2] + ($to[2] - $from[2]) * $t),
        ];
    }
}
