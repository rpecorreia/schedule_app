<?php

use App\Http\Controllers;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
| Routes for the web interface. Provides features like CSRF protection and session state
|
*/

// redirect / to recruiter dashboard (if already authenticated) 
Route::get('/', function () {
    return redirect('/home');
});

// get guest dashboard
Route::get('/guest', [App\Http\Controllers\GuestController::class, 'index'])->name('guest');

//authentication
Auth::routes();

// get recuiter dashboard
Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');

