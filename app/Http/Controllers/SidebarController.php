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
}
