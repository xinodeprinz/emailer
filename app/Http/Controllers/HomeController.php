<?php

namespace App\Http\Controllers;

use App\Mail\Users;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Http\Controllers\CleanseEmailController as Help;
use App\Models\BridonUser;
use App\Models\CryptoUser;
use App\Models\CrystalUser;
use App\Models\PrimeUser;
use App\Models\SwiftUser;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;

class HomeController extends Controller
{
    public function index()
    {
        $types = Help::types();
        $result = [];
        foreach ($types as $type) {
            $count = DB::table($type . '_users')->count();
            $result[] = [$type, $count];
        }
        return Inertia::render('home', compact('result'));
    }

    public function uploadImage(Request $request)
    {
        $request->validate(['image' => 'required|image']);
        $imagePath = $request->file('image')->store('images', 'public');
        return config('app.url') . "/storage/" . $imagePath;
    }

    public function logout(Request $request)
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return response()->json(['message' => 'Logout successful!']);
    }

    public function sendEmail(Request $request)
    {
        $val = Validator::make($request->all(), [
            'type' => 'required|string',
            'skip' => 'required|integer',
            'take' => 'required|integer',
            'subject' => 'required|string',
            'body' => 'required|string',
        ]);

        if ($val->fails()) {
            $error = Help::ValError($val);
            return response()->json(['message' => $error], 422);
        }

        $users = $this->getUsers($request);

        if (!$users) {
            return response()->json(['message' => 'Invalid Type'], 400);
        }

        $success = 0;
        $failed = 0;

        foreach ($users as $user) {
            try {
                Mail::to($user->email)->send(new Users($request));
                $success += 1;
            } catch (\Throwable $th) {
                $failed += 1;
                continue;
            }
        }

        return response()->json([
            'message' => 'Success',
            'success' => $success,
            'failed' => $failed,
        ]);
    }

    protected function getUsers(Request $request)
    {
        $type = strtolower($request->type);
        $users = false;
        if ($type === 'bridon') {
            $users = BridonUser::skip($request->skip)
                ->take($request->take)->get();
        } elseif ($type === 'crypto') {
            $users = CryptoUser::skip($request->skip)
                ->take($request->take)->get();
        } elseif ($type === 'crystal') {
            $users = CrystalUser::skip($request->skip)
                ->take($request->take)->get();
        } elseif ($type === 'prime') {
            $users = PrimeUser::skip($request->skip)
                ->take($request->take)->get();
        } elseif ($type === 'swift') {
            $users = SwiftUser::skip($request->skip)
                ->take($request->take)->get();
        }

        return $users;
    }
}
