<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Rindou;
use App\Models\Post;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class HeaderController extends Controller
{
    public function search(Request $request)
    {
        // dd($request->all());
        $searchQuery = $request->input('searchQuery');

        // ここで検索クエリを処理し、必要なデータを取得します。
        // 例えば、Rindouモデルを検索する場合は以下のようになります。
        $result = Rindou::where('name', 'like', '%' . $searchQuery . '%')->first();

        if ($result) {
            return response()->json([
                'result' => $result,
                'status' => 'search-success',
            ]);
        } else {
            return response()->json(['status' => 'search-error']);
        }
    }

    public function getPrefecture(Request $request)
    {
        $selectedPrefecture = $request->selectedPrefecture;

        // ここで選択された都道府県に該当するRindouデータを取得します。
        $rindous = Rindou::where('prefecture', $selectedPrefecture)->get();

        return response()->json([
            'rindous' => $rindous,
        ]);
    }

    public function storePost(Request $request)
    {
        $request->validate([
            "title" => ['required', "string"],
            "content" => ['required', "string"],
            "rindou_id" => ['required', "string"],
            "img" => ['nullable', 'array', 'max:10'],
            "img.*" => ['file', "mimes:png,jpg,jpeg,PNG,JPG,JPEG"],
        ]);

        DB::beginTransaction();
        try {
            $post = new Post;
            $post->user_id = Auth::user()->id;
            $post->rindou_id = (int)$request->rindou_id;
            $post->title = $request->title;
            $post->content = $request->content;
            $files = $request->file('img');
            $dir = 'post_img';
            if($request->hasFile('img')) {
                $rindouImgArray = [];
                foreach ($files as $file) {
                    $path = Storage::disk('s3')->putFile("/".$dir, $file, 'public');
                    $rindouImgArray[] = basename($path);
                }
                $rindouImgString = implode(",", $rindouImgArray);
                $post->img = $rindouImgString;
            } else {
                $post->img = '';
            }
            $post->save();
            DB::commit();
            $status = "post-create";

            return response()->json([
                'status' => $status
            ]);
        } catch(\Exception $e) {
            $message = $e->getMessage();
            Log::error($message);
            DB::rollBack();

            $status = "post-create-error";
            return response()->json([
                'status' => $status
            ]);
        }

        return $status;
    }
}
