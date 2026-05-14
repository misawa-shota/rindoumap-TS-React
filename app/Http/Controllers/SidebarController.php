<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use App\Models\Rindou;
use App\Models\RindouImage;
use App\Models\Clear;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class SidebarController extends Controller
{
    public function search(Request $request)
    {
        $searchRindou = $request->searchRindou;
        // dd($searchRindou);
        $cachedImages = RindouImage::where('rindou_id', $searchRindou['id'])->get();

        if ($cachedImages->isNotEmpty()) {
            return $cachedImages;
        };

        // RindouImageにデータがない場合は、serpapiを利用して選択状態の林道を画像検索して検索結果を取得
        $response = Http::get(
            'https://serpapi.com/search.json',
            [
                'engine' => 'google_images',
                'q' => $searchRindou['name'],
                'hl' => 'ja',
                'gl' => 'jp',
                'api_key' => env('SERP_API_KEY'),
            ]
        );

        $images = collect($response->json('images_results', []))
            ->filter(fn ($image) => is_array($image))
            ->take(10)
            ->map(function ($image) {
                return [
                    'position' => data_get($image, 'position'),
                    'thumbnail' => data_get($image, 'thumbnail'),
                    'original' => data_get($image, 'original'),
                    'link' => data_get($image, 'link'),
                    'title' => data_get($image, 'title'),
                    'source' => data_get($image, 'source'),
                ];
            })
            ->values();

        foreach ($images as $image) {
            RindouImage::create([
                'rindou_id' => $searchRindou['id'],
                'position' => data_get($image, 'position'),
                'thumbnail' => data_get($image, 'thumbnail'),
                'original' => data_get($image, 'original'),
                'link' => data_get($image, 'link'),
                'title' => data_get($image, 'title'),
                'source' => data_get($image, 'source'),
            ]);
        }

        return $images;
    }
}
