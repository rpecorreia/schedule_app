<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| stateless routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. 
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

// add a new event in schedule
Route::post('/addevent', [App\Http\Controllers\EventController::class, 'add'])->name('addevent');
// remove a avent in schedule
Route::post('/removeevent', [App\Http\Controllers\EventController::class, 'remove'])->name('removeevent');
// get all events in schedule
Route::get('/getevents', [App\Http\Controllers\EventController::class, 'get'])->name('getevents');
