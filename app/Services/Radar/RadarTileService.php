<?php

namespace App\Services\Radar;

class RadarTileService
{
    public function __construct(
        private RadarDownloader $downloader,
        private RadarTimeService $timeService,
        private RadarTileCompositor $compositor,
        // private RadarColorConverter $colorConverter,
    ) {}

    public function latestTargetTime(): string
    {
        return $this->timeService->latest();
    }

    public function getTile(
        string $targetTime,
        int $z,
        int $x,
        int $y
    ) {
        if ($z >= 10) {
            return $this->downloader->download($targetTime, $z, $x, $y);
        }
        return $this->compositor->compose($targetTime, $z, $x, $y);
        // dd($this->analyzer->analyze($image));
        // return $this->colorConverter->convert($image);
    }
}
