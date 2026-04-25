<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Rindou;
use App\Models\Clear;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class MapController extends Controller
{
    public function index()
    {
        $rindouList = Rindou::all();
        $imageUrl = asset('storage/images/icon.svg');

        if(Auth::check()) {
            $clearList = Clear::where('user_id', Auth::user()->id)->get();
            $clearList = json_encode($clearList);

            return Inertia::render('TopPage', [
                'rindouList' => $rindouList,
                'clearList' => $clearList,
                'imageUrl' => $imageUrl
            ]);
        }

        return Inertia::render('TopPage', [
            'rindouList' => $rindouList,
            'imageUrl' => $imageUrl
        ]);
    }
}
