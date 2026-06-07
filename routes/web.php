<?php

use App\Http\Controllers\MapController;
use App\Http\Controllers\SidebarController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\HeaderController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Route::get('/', function () {
//     return Inertia::render('Welcome', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// });

Route::get('/', [MapController::class, 'index'])->name('map.index');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// サイドバーのルート
Route::post('/sidebar/search', [SidebarController::class, 'search'])->name('sidebar.search');
Route::post('/sidebar/posts', [SidebarController::class, 'posts'])->name('sidebar.posts');
Route::post('/sidebar/weather', [SidebarController::class, 'weather'])->name('sidebar.weather');

// ヘッダーのルート
Route::post('/header/search', [HeaderController::class, 'search'])->name('header.search');
require __DIR__.'/auth.php';
