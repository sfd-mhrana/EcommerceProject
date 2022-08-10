<?php

namespace App\Http\Controllers;

use App\Http\Requests\bankdatareq;
use App\Http\Requests\bankreq;
use App\Models\bankmodel;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;

class bankcon extends Controller
{
    public function index(bankreq $request)
    { $user = JWTAuth::parseToken()->authenticate();
        return bankmodel::where('User_ID', $user->User_ID)->get();
    }

    public function store(bankreq $request)
    { $user = JWTAuth::parseToken()->authenticate();
        if (bankmodel::where('User_ID', $user->User_ID)
            ->where('bank_name', $request->input('bank_name'))
            ->where('account_number', $request->input('account_number'))->exists()
        ) {
            return response()->json(['title' => 'Wrong', 'message' => 'This Bank Already Have. Please Change Bank Name Or Account Number For Defferent Account..']);
        } else {
            $bank = new bankmodel;
            $bank->User_ID = $user->User_ID;
            $bank->bank_name = $request->input('bank_name');
            $bank->account_number = $request->input('account_number');
            $bank->bank_type = $request->input('bank_type');
            if ($bank->save()) {
                return response()->json(['title' => 'Success', 'message' => 'New Bank Add Successfully']);
            }
        }
    }

    public function update(bankreq $request)
    { $user = JWTAuth::parseToken()->authenticate();
        bankmodel::where('User_ID', $user->User_ID)
            ->where('id', $request->input('id'))
            ->update(array(
                'bank_name' => $request->input('bank_name'),
                'account_number' => $request->input('account_number'),
                'bank_type' => $request->input('bank_type')
            ));
        return response()->json(['title' => 'Success', 'message' => 'Bank Update Successfully']);
    }

    public function delete(bankreq $request)
    { $user = JWTAuth::parseToken()->authenticate();
        bankmodel::where('User_ID', $user->User_ID)
            ->where('id', $request->input('id'))->delete();
        return response()->json(['title' => 'Success', 'message' => 'Bank Delete Successfully']);
    }
}
