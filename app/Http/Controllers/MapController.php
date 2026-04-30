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

        if(Auth::check()) {
            $clearList = Clear::where('user_id', Auth::user()->id)->get();
            $clearList = json_encode($clearList);
            $status = "login-success";

            return Inertia::render('TopPage', [
                'rindouList' => $rindouList,
                'clearList' => $clearList,
                'status' => $status,
            ]);
        }

        return Inertia::render('TopPage', [
            'rindouList' => $rindouList,
        ]);
    }
}
