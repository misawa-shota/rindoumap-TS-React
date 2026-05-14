<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Rindou;
use App\Models\Clear;
use App\Models\RindouImage;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;
use Inertia\Inertia;

class MapController extends Controller
{
    public function index()
    {
        $rindouList = Rindou::all();

        // ログインユーザーがいるか確認、ユーザーのIDとClearテーブルに登録されているユーザーのIDに一致しているデータを取得
        $isLogin = Auth::check();

        if($isLogin) {
            $status = "login-success";
            $clearList = Clear::where('user_id', Auth::user()->id)->get();

            return Inertia::render('TopPage', [
                'rindouList' => $rindouList,
                'isLogin' => $isLogin,
                'clearList' => $clearList,
                'status' => $status,
            ]);
        }

        return Inertia::render('TopPage', [
            'rindouList' => $rindouList,
        ]);
    }
}
