<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthController extends Controller
{
    public function authenticate(Request $request)
    {
        $credentials = $request->only('email', 'password');

        try {
            if (!$token = JWTAuth::attempt($credentials)) {
                return response()->json(['error' => 'invalid_credentials'], 400);
            }
        } catch (JWTException $e) {
            return response()->json(['error' => 'could_not_create_token'], 500);
        }

        return response()->json(compact('token'));
    }

    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'Shop_Name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6|confirmed',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors()->toJson(), 400);
        }


        if ($request->has('Owner_Image')) {

            $filea = $request->file('Owner_Image');
            $filesnameWithExt = $filea->getClientOriginalName();
            $filesname = pathinfo($filesnameWithExt, PATHINFO_FILENAME);
            $extensions = $filea->getClientOriginalExtension();
            $fielsNameToStore = $filesname . '_' . time() . '.' . $extensions;
            $data = $filea->storeAs('public/shopuserImage/', $fielsNameToStore);
        }
        if (User::where('email', $request->get('email'))->exists()) {
            return response()->json(['message' => 'This Email Already Have']);
        } else {
            $user = User::create([
                'Shop_Name' => $request->get('Shop_Name'),
                'User_ID' => $request->get('User_ID'),
                'Owner_Name' => $request->get('Owner_Name'),
                'Owner_Image' =>  $fielsNameToStore,
                'Shop_Address' => $request->get('Shop_Address'),
                'Mobile' => $request->get('Mobile'),
                'email' => $request->get('email'),
                'password' => Hash::make($request->get('password')),
            ]);

            $token = JWTAuth::fromUser($user);

            return response()->json(compact('user', 'token'), 201);
        }
    }

    public function getAuthenticatedUser()
    {
        try {

            if (!$user = JWTAuth::parseToken()->authenticate()) {
                return response()->json(['user_not_found'], 404);
            }else{
                return response()->json(compact('user'));
            }
        } catch (Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {

            return response()->json(['token_expired'], $e->getStatusCode());
        } catch (Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {

            return response()->json(['token_invalid'], $e->getStatusCode());
        } catch (Tymon\JWTAuth\Exceptions\JWTException $e) {

            return response()->json(['token_absent'], $e->getStatusCode());
        }

    }
}
