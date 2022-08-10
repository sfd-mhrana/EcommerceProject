<?php

namespace App\Http\Controllers;

use App\Http\Requests\InvestmentReq;
use App\Models\CashAmountModel;
use App\Models\InvestmentModel;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;

class InvestmentCon extends Controller
{
    public function index(InvestmentReq $request)
    { $user = JWTAuth::parseToken()->authenticate();
       return InvestmentModel::where('User_ID',$user->User_ID)->get();
    } 
    
    public function store(InvestmentReq $request)
    {  $user = JWTAuth::parseToken()->authenticate();
      $product = new InvestmentModel;
      
      $product->User_ID = $user->User_ID;
      $product->Date = $request->input('Date');
      $product->Amount = $request->input('Amount');
      $product->Parson_Name = $request->input('Parson_Name');
      if ($product->save()) {
         $cash = new CashAmountModel;
    
         $cash->User_ID = $user->User_ID;
         $cash->Status ='Credit';
         $cash->Amount = $request->input('Amount');
         $cash->Details =  $request->input('Parson_Name').'/Investing Amount';
         $cash->Date = $request->input('Date');
         if ($cash->save()) {
             return $cash;
         };
      };

    } 
    
    public function delete(InvestmentReq $request)
    { $user = JWTAuth::parseToken()->authenticate();
        InvestmentModel::where('User_ID', $user->User_ID)
            ->where('id', $request->input('id'))->delete();

            $cash = new CashAmountModel;
    
            $cash->User_ID = $user->User_ID;
            $cash->Status = 'Devit';
            $cash->Amount = $request->input('Amount');
            $cash->Details =  $request->input('Parson_Name').'/Delete Investing Amount';
            $cash->Date = $request->input('Date');
            if ($cash->save()) {
                return $cash;
            };
    }

}
