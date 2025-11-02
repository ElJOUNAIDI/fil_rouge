<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\TerrainController;
use App\Http\Controllers\ReservationController;

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
Route::post('/register',[AuthController::class,'register']);
Route::post('/login',[AuthController::class,'login']);

Route::get('/terrains',[TerrainController::class,'index']);
Route::get('/terrains/{id}', [TerrainController::class, 'show']);

Route::middleware('auth:sanctum')->group(function(){
    Route::post('/logout',[AuthController::class,'logout']);
    Route::get('/me',[AuthController::class,'me']);

    Route::post('/reservations',[ReservationController::class,'store']);
    Route::get('/reservations',[ReservationController::class,'myReservations']);
    Route::delete('/reservations/{id}',[ReservationController::class,'destroy']);

    Route::get('/admin/reservations',[ReservationController::class,'allReservations']);
    Route::post('/admin/terrains',[TerrainController::class,'store']);
    Route::put('/admin/terrains/{id}',[TerrainController::class,'update']);
    Route::delete('/admin/terrains/{id}',[TerrainController::class,'destroy']);
});

