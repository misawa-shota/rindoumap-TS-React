<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\Radar\RadarTileService;

class RadarController extends Controller
{
    public function latest(RadarTileService $service)
    {
        return response()->json([
            'targetTime' => $service->latestTargetTime(),
        ]);
    }
}
