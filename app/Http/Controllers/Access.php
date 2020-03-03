<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App;

class Access extends Controller
{
    public function isLogIn(Request $request)
    {
        $json = array(
            'isLogIn' => $request->session()->get('logIn')
        );
        return json_encode($json, true);
    }


    public function LogIn(Request $request)
    {
        $values = $request->validate([
            "email" => "required",
            "pass" => "required",
        ]);

        $users = new App\Users;
        $users = $users->where('email', $values['email'])->where('pass', $values['pass']);
        $request->session()->put('logIn', false);
        if ($users->get()->first()) {
            $request->session()->put('logIn', true);
            $request->session()->put('userId', $users->get()->first()->id);
            $res = array(
                "logIn" => true,
            );
            return json_encode($res, true);
        } else {
            $res = array(
                "logIn" => false,
            );
            return json_encode($res, true);
        }
    }
}