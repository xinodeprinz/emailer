<?php

namespace App\Http\Controllers;

use App\Models\BridonUser;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Validator;

class CleanseEmailController extends Controller
{
    public function index()
    {
        $data = DB::table('test')
            // ->where('email_verified_at', '!=', null)
            ->get(['username', 'email']);
        foreach ($data as $d) {
            BridonUser::create([
                'name' => $d->username,
                'email' => $d->email,
            ]);
        }
        return response()->json(['message' => 'Email data cleansed']);
    }

    public static function ValError(Validator $val)
    {
        return array_values($val->getMessageBag()->toArray())[0][0];
    }

    public static function types()
    {
        return [
            'bridon',
            'crypto',
            'crystal',
            'prime',
            'swift'
        ];
    }
}
