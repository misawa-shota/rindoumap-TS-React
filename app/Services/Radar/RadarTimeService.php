<?php

namespace App\Services\Radar;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Cache;

class RadarTimeService
{
    public function latest(): string
    {
        return Cache::remember('jma_latest_target_time', now()->addMinutes(5), function () {
            $response = Http::timeout(10)->get(
                'https://www.jma.go.jp/bosai/jmatile/data/nowc/targetTimes_N1.json'
            );

            if (!$response->successful()) {
                throw new \RuntimeException("targetTimes取得失敗");
            }

            return $response->json()[0]['basetime'];
            // $json = $response->json();

            // logger()->info('JMA targetTimes', $json[0]);

            // return $json[0]['basetime'];
            // return [
            //     'baseTime' => $json()[0]['basetime'],
            //     'validTime' => $json()[0]['validtime'],
            // ];
        });
    }
}
