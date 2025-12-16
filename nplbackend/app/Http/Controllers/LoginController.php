<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class LoginController extends Controller
{
    function login(Request $request)
    {
        $user = $request->input('userid');
        $pass = $request->input('password');

        // Validate input
        if (!$user || !$pass) {
            return response()->json([
                'status' => false,
                'message' => 'User ID and password required'
            ]);
        }

        // Fetch only needed columns
        $userdata = DB::table('admin')
            ->where('userId', $user)
            ->where('password', $pass)
            ->select('id', 'userId', 'rollid')
            ->first();
            //return $userdata;

        if ($userdata) {
            return response()->json([
                'status' => true,
                'message' => 'Login successful',
                'data' => $userdata
            ]); // success
        } else {
            return response()->json([
                'status' => false,
                'message' => 'Invalid credentials'
            ]); // unauthorized
        }
    }
}
