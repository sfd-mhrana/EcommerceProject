<?php

namespace App\Http\Controllers;

use App\Http\Requests\CashAmountReq;
use App\Models\CashAmountModel;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;

class CashAmountContro extends Controller
{
    public function getAllCosting(CashAmountReq $request){
      $user = JWTAuth::parseToken()->authenticate();
        return CashAmountModel::where('User_ID',$user->User_ID)->get();
     }

    public function store(CashAmountReq $request)
    { $user = JWTAuth::parseToken()->authenticate();
         // get product byEmployeeAccModel 
   
         $cashamount = new CashAmountModel();
         $cashamount->User_ID = $user->User_ID;
         $cashamount->Date = $request->input('Date');
         $cashamount->Amount = $request->input('Amount');
         $cashamount->Status = $request->input('Status');
         $cashamount->Details = $request->input('Details');
         if ($cashamount->save()) {
            return $cashamount;
         };
 }
}
 