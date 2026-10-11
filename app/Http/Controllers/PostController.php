<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use App\Models\Post;
use App\Models\Rindou;
use Inertia\Inertia;

class PostController extends Controller
{
    public function show($id)
    {
        $post = Post::find($id);

        if (!$post) {
            return response()->json(['error' => '選択した投稿が見つかりません。'], 404);
        }

        $user = Auth::user();
        $iconImage = Storage::disk('s3')->url('icon_img/' . $user->icon_img);

        $rindous = Rindou::all();

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

        return Inertia::render('Post/Show', [
            'post' => $post,
            'user' => $user,
            'iconImage' => $iconImage,
            'postImages' => $postImages,
            'rindous' => $rindous,
        ]);
    }
}
