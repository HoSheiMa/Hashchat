<?php

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

Route::get('/', function () {
    return view('App');
});
Route::post('/access/logIn', "Access@LogIn");
Route::post('/access/isLogIn', "Access@isLogIn");
Route::post('/access/getUserGroups', "chat@getUserGroups");
Route::post('/access/getTagChatData', "chat@getTagChatData");