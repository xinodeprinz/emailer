<?php

use App\Http\Controllers\HomeController;
use App\Http\Controllers\MainController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::controller(MainController::class)
    ->middleware(['guest'])
    ->group(function () {
        Route::match(['GET', 'POST'], '/', 'login')->name('login');
    });

Route::controller(HomeController::class)
    ->middleware(['auth'])
    ->group(function () {
        Route::get('/home', 'index')->name('home');
        Route::post('/image/upload', 'uploadImage');
        Route::post('/logout', 'logout')->name('logout');
        Route::post('/email/send', 'sendEmail');
    });
