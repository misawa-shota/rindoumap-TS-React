<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Rindou;

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
}
