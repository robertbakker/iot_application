<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::get('/', 'IndexController@index');

Route::group(['prefix' => 'api/v0'], function() {

    Route::group(['prefix' => 'sensors'], function() {

        Route::post('temperatures', '\App\Http\Controllers\Api\TemperatureController@store');
        Route::get('temperatures/getAveragePerHour', '\App\Http\Controllers\Api\TemperatureController@getAveragePerHour');
        Route::resource('humidities', '\App\Http\Controllers\Api\HumidityController');
    });
});