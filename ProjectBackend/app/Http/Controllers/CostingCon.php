<?php

namespace App\Http\Controllers;

use App\Http\Requests\CostingReq;
use App\Models\CashAmountModel;
use App\Models\CostingModel;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;

class CostingCon extends Controller
{
    public function index(CostingReq $request)
    { $user = JWTAuth::parseToken()->authenticate();
       return CostingModel::where('User_ID',$user->User_ID)->get();
    } 
    
    public function store(CostingReq $request)
    {  $user = JWTAuth::parseToken()->authenticate();

      $shopcost = new CostingModel();
      $shopcost->User_ID = $user->User_ID;
      $shopcost->Date = $request->input('Date');
      $shopcost->Amount = $request->input('Amount');
      $shopcost->Status = $request->input('Status');
      $shopcost->Details = $request->input('Details');
      
      if ($shopcost->save()) {
         $cash = new CashAmountModel;
    
         $cash->User_ID = $user->User_ID;
         $cash->Status = 'Devit';
         $cash->Amount = $request->input('Amount');
         $cash->Details =  $request->input('Details').'/Costing';
         $cash->Date = $request->input('Date');
         if ($cash->save()) {
             return $cash;
         };
      };

    } 
    
    public function update(CostingReq $request)
    { $user = JWTAuth::parseToken()->authenticate();
        CostingModel::where('User_ID', $user->User_ID)
        ->where('id', $request->input('id'))
        ->where('Date', $request->input('Date'))
        ->where('Details', $request->input('Details'))
        ->update(array(
            'Amount' => $request->input('Amount'),
            'Status' => $request->input('Status')
        ));
       
           $cash = new CashAmountModel;
      
           $cash->User_ID = $user->User_ID;
           $cash->Status = $request->input('CStatus');
           $cash->Amount = $request->input('CAmount');
           $cash->Details =  $request->input('Details').'/Edit Cost';
           $cash->Date = $request->input('CDate');
           if ($cash->save()) {
               return $cash;
           };
    }
    
    public function delete(CostingReq $request)
    {   $user = JWTAuth::parseToken()->authenticate();
        CostingModel::where('User_ID', $user->User_ID)
            ->where('id', $request->input('id'))->delete();

            $cash = new CashAmountModel;
    
            $cash->User_ID = $user->User_ID;
            $cash->Status = 'Credit';
            $cash->Amount = $request->input('Amount');
            $cash->Details =  $request->input('Details').'/Delete Costing';
            $cash->Date = $request->input('Date');
            if ($cash->save()) {
                return $cash;
            };
    }
}
