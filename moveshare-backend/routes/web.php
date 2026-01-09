<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

// Serve storage files for API (images, documents, etc)
Route::get('/storage/{path}', function ($path) {
    $full_path = storage_path('app/public/' . $path);
    
    if (!file_exists($full_path)) {
        abort(404);
    }
    
    return response()->file($full_path);
})->where('path', '.*');

