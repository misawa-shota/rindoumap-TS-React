<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\RadarController;
use App\Http\Controllers\RadarTileController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// レーダー画像のルート
Route::get('/jma-radar/latest', [RadarController::class, 'latest']);
Route::get('/jma-radar/{targetTime}/{z}/{x}/{y}.png',RadarTileController::class);
