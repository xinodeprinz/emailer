<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;
use App\Http\Controllers\CleanseEmailController as Help;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class MainController extends Controller
{
    public function login(Request $request)
    {
        if ($request->isMethod('GET')) {
            return Inertia::render('login');
        }

        $val = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required|string',
        ]);

        if ($val->fails()) {
            $error = Help::ValError($val);
            return response()->json(['message' => $error], 422);
        }

        if (Auth::attempt($request->all())) {
            $request->session()->regenerate();
            return response()->json(['message' => 'Login successful!']);
        }

        return response()->json(['message' => 'Wrong username or password!'], 401);
    }

    public function register(Request $request)
    {
        $val = Validator::make($request->all(), [
            'name' => 'required|string|min:3|unique:users',
            'email' => 'required|email|unique:users',
            'password' => 'required|string|min:6',
        ]);

        if ($val->fails()) {
            $error = Help::ValError($val);
            return response()->json(['message' => $error], 422);
        }

        $data = $request->all();
        $data['password'] = Hash::make($request->password);

        User::create($data);
        return response()->json(['message' => 'User created!'], 201);
    }
}
