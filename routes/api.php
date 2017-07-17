<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});


Route::group(['prefix' => 'v1/appointments', 'middleware' => ['cors']], function () {
    Route::get('/list', 'Api\AppointmentController@listApps');
    Route::post('/result/save', 'Api\AppointmentController@saveResultApp');
    Route::post('/status/save', 'Api\AppointmentController@updateStatusApp');
    Route::post('/update', 'Api\AppointmentController@updateApp');
    Route::get('/{id}', 'Api\AppointmentController@getApp')->where('id', '[0-9]+');
});