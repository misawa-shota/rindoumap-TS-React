<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class SidebarController extends Controller
{
    public function test()
    {
        $response = Http::get(
            'https://serpapi.com/search.json',
            [
                'engine' => 'google_images',
                'q' => '剣山スーパー林道',
                'hl' => 'ja',
                'gl' => 'jp',
                'api_key' => env('SERP_API_KEY'),
            ]
        );
        // dd($response->json('images_results'));  // デバッグ用
        // $data = $response->json();
        // $imagesResults = $data['images_results'] ?? [];
        // dd($imagesResults[0]);  // デバッグ用

        // foreach($imagesResults as $image) {
        //     dd($image);
        // };

        $images = collect($response->json('images_results', []))
            ->filter(fn ($image) => is_array($image))
            ->take(10)
            ->map(function ($image) {
                // dd($image);
                return [
                    'position' => data_get($image, 'position'),
                    'thumbnail' => data_get($image, 'thumbnail'),
                    'original' => data_get($image, 'original'),
                    'link' => data_get($image, 'link'),
                    'title' => data_get($image, 'title'),
                    'source' => data_get($image, 'source'),
                ];
            });

        // dd($response->json($images));
        return $images;
    }
}
