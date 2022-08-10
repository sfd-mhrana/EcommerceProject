<?php

namespace App\Http\Controllers;

use App\Http\Requests\bankdatareq;
use App\Models\bankdatamodel;
use App\Models\CashAmountModel;
use Tymon\JWTAuth\Facades\JWTAuth;

class bankdatacon extends Controller
{
    public function index(bankdatareq $request)
    { $user = JWTAuth::parseToken()->authenticate();
      if($request->has('type')){
        return bankdatamodel::where('User_ID',$user->User_ID)->where('type',$request->input('type'))->with(['bankdetails'])->get();
      
      }else if($request->has('Date')){
        return bankdatamodel::where('User_ID',$user->User_ID)->where('date',$request->input('Date'))
        ->where('type','bankamount')
        ->with(['bankdetails'])->get();
      }else{
        return bankdatamodel::where('User_ID',$user->User_ID)->with(['bankdetails'])->get();
      }
       
    } 
    
    public function store(bankdatareq $request)
    {  $user = JWTAuth::parseToken()->authenticate();
      $bankdata = new bankdatamodel();
      $bankdata->User_ID = $user->User_ID;
      $bankdata->bank_id = $request->input('bank_id');
      $bankdata->details = $request->input('details');
      $bankdata->amount = $request->input('amount');
      $bankdata->date = $request->input('date');
      $bankdata->status = $request->input('status');
      $bankdata->type = $request->input('type');
      
      if ($bankdata->save()) {
        if( $request->input('type')=='Shop'){
          
         $cashamount = new CashAmountModel();
         $cashamount->User_ID = $user->User_ID;
         $cashamount->Date = $request->input('date');
         $cashamount->Amount = $request->input('amount');
         $cashamount->Status = $request->input('cashstatus');
         $cashamount->Details = $request->input('bankcashname');
         if ($cashamount->save()) {
            return response()->json(['title' => 'Success', 'message' => 'Data Add Successfully']);
         };
        }else{
          return response()->json(['title' => 'Success', 'message' => 'Data Add Successfully']);
        }
       
      };

    } 
    
    public function update(bankdatareq $request)
    { $user = JWTAuth::parseToken()->authenticate();
        bankdatamodel::where('User_ID', $user->User_ID)
        ->where('id', $request->input('id'))
        ->update(array(
            'amount' => $request->input('amount'),
            'details' => $request->input('details'),
            'status' => $request->input('status'),
        ));
        return response()->json(['title' => 'Success', 'message' => 'Data Update Successfully']);
       
    }
     
    public function delete(bankdatareq $request)
    { $user = JWTAuth::parseToken()->authenticate();
        bankdatamodel::where('User_ID', $user->User_ID)
            ->where('id', $request->input('id'))->delete();
            return response()->json(['title' => 'Success', 'message' => 'Data Delete Successfully']);

    }

}
