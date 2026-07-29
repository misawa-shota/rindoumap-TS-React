<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\Radar\RadarTileService;

class RadarTileController extends Controller
{
    public function __invoke(
        string $targetTime,
        int $z,
        int $x,
        int $y,
        RadarTileService $service
    ) {
        $png = $service->getTile($targetTime, $z, $x, $y);

        return response($png)
            ->header('Content-Type', 'image/png')
            ->header('Cache-Control', 'public, max-age=300');
    }
}
