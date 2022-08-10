<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoanDetails as RequestsLoanDetails;
use App\Models\CashAmountModel;
use App\Models\LoanDetails as ModelsLoanDetails;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;

class LoanDetails extends Controller
{
    public function index(RequestsLoanDetails $request)
    { $user = JWTAuth::parseToken()->authenticate();
       return ModelsLoanDetails::where('User_ID',$user->User_ID)->get();
    } 
    
    public function store(RequestsLoanDetails $request)
    {  $user = JWTAuth::parseToken()->authenticate();
      $product = new ModelsLoanDetails;
      
      $product->User_ID = $user->User_ID;
      $product->LoanID = $request->input('LoanID');
      $product->Date = $request->input('Date');
      $product->Amount = $request->input('Amount');
      $product->Status = $request->input('Status');
      $product->Details = $request->input('Details');
      if ($product->save()) {
         $cash = new CashAmountModel;
    
         $cash->User_ID = $user->User_ID;
         $cash->Status = $request->input('Status');
         $cash->Amount = $request->input('Amount');
         $cash->Details =  $request->input('Details').'/New Loan';
         $cash->Date = $request->input('Date');
         if ($cash->save()) {
             return $cash;
         };
      };

    } 
    
    public function update(RequestsLoanDetails $request)
    { $user = JWTAuth::parseToken()->authenticate();
        ModelsLoanDetails::where('User_ID', $user->User_ID)
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
           $cash->Details =  $request->input('Details').'/Edit Loan';
           $cash->Date = $request->input('CDate');
           if ($cash->save()) {
               return $cash;
           };
    }
    
    public function delete(RequestsLoanDetails $request)
    { $user = JWTAuth::parseToken()->authenticate();
        ModelsLoanDetails::where('User_ID', $user->User_ID)
            ->where('LoanID', $request->input('LoanID'))
            ->where('id', $request->input('id'))->delete();

            $cash = new CashAmountModel;
    
            $cash->User_ID = $user->User_ID;
            $cash->Status = 'Credit';
            $cash->Amount = $request->input('Amount');
            $cash->Details =  $request->input('Details').'/Delete Loan Paid';
            $cash->Date = $request->input('Date');
            if ($cash->save()) {
                return $cash;
            };
    }
}
