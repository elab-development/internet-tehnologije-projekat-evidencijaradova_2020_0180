<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::controller(AuthController::class)->group(function () {
    Route::name('auth.')->group(function () {
        Route::post('login', 'login')->name('login');
        Route::post('register', 'register')->name('register');

        Route::middleware('auth:api')->group(function () {
            Route::post('/logout', 'logout')->name('logout');
        });
    });
});
Route::group(['middleware' => ['auth:api', 'role:professor']], function () {
    Route::controller(UserController::class)->group(function(){
        Route::name('user.')->group(function(){
            Route::get('users', 'index')->name('index');
            Route::get('user/{id}', 'show')->name('show')->whereNumber('id');
            Route::post('create-user', 'store')->name('store');
            Route::put('update-user/{id}', 'update')->name('update');
            Route::delete('destroy-user/{id}', 'destroy')->name('destroy');
        });
    });
});