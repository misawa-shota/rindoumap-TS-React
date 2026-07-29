<?php

namespace App\Services\Rain;

class RainAnalyzer
{
    // PNG内で使用されている色を集計する

    public function analyze(string $imageData): array
    {
        $image = imagecreatefromstring($imageData);
        if (!$image) {
            throw new \RuntimeException('PNG画像の読み込みに失敗しました。');
        }

        if (!imageistruecolor($image)) {
            imagepalettetotruecolor($image);
        }

        $width = imagesx($image);
        $height = imagesy($image);

        $alphas = [];

        for ($y = 0; $y < $height; $y++) {
            for ($x = 0; $x < $width; $x++) {
                $index = imagecolorat($image, $x, $y);
                $rgba = imagecolorsforindex($image, $index);

                $alpha = $rgba['alpha'];

                if (!isset($alphas[$alpha])) {
                    $alphas[$alpha] = 0;
                }
                $alphas[$alpha]++;
            }
        }

        krsort($alphas); // 出現頻度の高い順にソート

        return $alphas;
    }
}
