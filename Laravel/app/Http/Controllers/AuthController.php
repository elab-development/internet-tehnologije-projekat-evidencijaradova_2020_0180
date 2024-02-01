<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        if (!Auth::attempt($request->only('email', 'password'))) {
            return response()->json(['success' => false], 401);
        }
    
        $user = User::where('email', $request['email'])->firstOrFail();
        if(!$user){
            return response()->json(['failed'=>'User not found.']);
        }

        if ($user && Hash::check($request->password, $user->password)) {
            $tokenResult = $user->createToken('Personal Access Token');
            $token = $tokenResult->accessToken;
            return response()->json([
                'success' => true,
                'access_token' => $token,
                'token_type' => 'Bearer',
                'expires_at' => $tokenResult->token->expires_at->toDateTimeString(),
                'role' => $user->role
            ]);
        } else {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

    }
    

    public function register(Request $request){
        $validator = Validator::make($request->all(), [
            'username' => 'required|string|max:255',
            'email' => 'required|string|max:255|email|unique:users',
            'password' => 'required|string|min:8'
        ]); 
        if ($validator->fails()) {
            return response()->json($validator->errors());
        }
    
        $user = User::create([
            'name' => $request->username,
            'email' => $request->email,
            'password' => Hash::make($request->password)
        ]);
    
        $tokenResult = $user->createToken('auth_token');
        $token = $tokenResult->accessToken;
    
        return response()->json([
            'data' => $user,
            'access_token' => $token,
            'token_type' => 'Bearer'
        ], 200);
    }
    

    public function logout(Request $request)
    {
        $request->user()->token()->delete();

        return response()->json(['message' => 'Logged out successfully']);
    }
}
