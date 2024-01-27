<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;

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
        $token = $user->createToken('auth_token')->plainTextToken;
        $cookie = cookie('token', $token, 60);

        return response()->json(['User' => $user,'success' => true, 'access_token' => $token, 'cookie' => $cookie, 'token_type' => 'Bearer']);
    }
    

    public function register(Request $request){
        $validator=Validator::make($request->all(),[
            'username'=>'required|string|max:255',
            'email'=>'required|string|max:255|email|unique:users',
            'password'=>'required|string|min:8'
        ]);
        if ($validator->fails()) {
            return response()->json($validator->errors());
        }

        $user= User::create([
            'name'=>$request->username,
            'email'=>$request->email,
            'password'=>Hash::make($request->password)
        ]);

        $token=$user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'data'=>$user,
            'access_token'=>$token,
            'token_type'=>'Bearer'
        ]);
    }

    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();

        return response()->json(['message' => 'Logged out successfully']);
    }
}
