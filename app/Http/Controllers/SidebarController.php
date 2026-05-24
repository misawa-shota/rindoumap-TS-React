<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use App\Models\RindouImage;
use App\Models\Post;
use Illuminate\Support\Facades\Storage;

class SidebarController extends Controller
{
    public function search(Request $request)
    {
        $searchRindou = $request->searchRindou;

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
            ->filter(fn ($image) => is_array($image) && !empty($image))
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

    public function posts(Request $request)
    {
        $postsRindou = $request->postsRindou;

        // 選択状態の林道に応じたユーザーの投稿を取得
        $posts = Post::with('user')->where('rindou_id', $postsRindou['id'])->get();

        // s3からicon_imgフォルダ内のファイルを取得
        $iconImages = collect(
            Storage::disk('s3')->files('icon_img')
        )->map(function($path) {
            return [
                'path' => $path,
                'fileName' => basename($path),
                'url' => Storage::disk('s3')->url($path),
            ];
        });

        // s3からpost_imgフォルダ内のファイルを取得
        $postImages = collect(
            Storage::disk('s3')->files('post_img')
        )->map(function($path) {
            return [
                'path' => $path,
                'fileName' => basename($path),
                'url' => Storage::disk('s3')->url($path),
            ];
        });

        return [
            'posts' => $posts,
            'iconImages' => $iconImages,
            'postImages' => $postImages,
        ];
    }

    public function weather(Request $request)
    {
        $weatherRindou = $request->weatherRindou;

        $response = Http::get(
            'https://api.open-meteo.com/v1/forecast',
            [
                'latitude' => $weatherRindou['lat'],
                'longitude' => $weatherRindou['lng'],
                'hourly' => 'temperature_2m,precipitation_probability,weathercode,precipitation,wind_speed_10m,wind_direction_10m',
                'daily' => 'temperature_2m_max,temperature_2m_min,precipitation_sum,weathercode',
                'timezone' => 'Asia/Tokyo',
            ]
        );

        $weather = $response->json();

        $hourly = collect($weather['hourly']['time'] ?? [])->map(function ($time, $index) use ($weather) {
            return [
                'time' => $time,
                'temperature_2m' => $weather['hourly']['temperature_2m'][$index] ?? null,
                'precipitation_probability' => $weather['hourly']['precipitation_probability'][$index] ?? null,
                'weathercode' => $weather['hourly']['weathercode'][$index] ?? null,
                'precipitation' => $weather['hourly']['precipitation'][$index] ?? null,
                'wind_speed_10m' => $weather['hourly']['wind_speed_10m'][$index] ?? null,
                'wind_direction_10m' => $weather['hourly']['wind_direction_10m'][$index] ?? null,
            ];
        });

        $daily = collect($weather['daily']['time'] ?? [])->map(function ($time, $index) use ($weather) {
            return [
                'time' => $time,
                'temperature_2m_max' => $weather['daily']['temperature_2m_max'][$index] ?? null,
                'temperature_2m_min' => $weather['daily']['temperature_2m_min'][$index] ?? null,
                'precipitation_sum' => $weather['daily']['precipitation_sum'][$index] ?? null,
                'weathercode' => $weather['daily']['weathercode'][$index] ?? null,
            ];
        });

        return [
            'hourly' => $hourly,
            'daily' => $daily,
        ];
    }
}
