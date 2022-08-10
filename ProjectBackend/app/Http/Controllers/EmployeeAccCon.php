<?php

namespace App\Http\Controllers;

use App\Http\Requests\EmployeeAccReq;
use App\Models\CashAmountModel;
use App\Models\EmployeeAccModel;
use App\Models\EmployeeModel;
use Tymon\JWTAuth\Facades\JWTAuth;

class EmployeeAccCon extends Controller
{
    public function index(EmployeeAccReq $request)
    {  $user = JWTAuth::parseToken()->authenticate();
        //$this->data['products']=ModelsProducts::all();
        if($request->has('Date')){
            return EmployeeAccModel::where('User_ID', $user->User_ID)
                    ->where('Date', $request->input('Date'))->with(['employee'])
                    ->get();
        }else{
            return EmployeeAccModel::where('User_ID', $user->User_ID)
            ->with(['employee'])->get();
        }
        
    }

    public function getSelectedUser(EmployeeAccReq $request)
    { $user = JWTAuth::parseToken()->authenticate();
        return EmployeeModel::where('User_ID', $user->User_ID)
            ->where('Employee_ID', $request->input('Employee_ID'))
            ->get();
    }

    public function store(EmployeeAccReq $request)
    {$user = JWTAuth::parseToken()->authenticate();
        // get product byEmployeeAccModel
       $fornewvalid= EmployeeAccModel::where('User_ID', $user->User_ID)
        ->where('Date', $request->input('Date'))
        ->where('Employee_ID', $request->input('Employee_ID'))
        ->where('Type', $request->input('Type'))
        ->get();

        $selectedsize=$fornewvalid->count();

        if($selectedsize>0){
            return response()->json(['title'=>'Wrong','message' => 'This Details Amount Already Have,, Please Change Something']);
        }else{
            $custommer = new EmployeeAccModel;

            $custommer->User_ID = $user->User_ID;
            $custommer->Employee_ID = $request->input('Employee_ID');
            $custommer->Amount = $request->input('Amount');
            $custommer->Type = $request->input('Type');
            $custommer->Date = $request->input('Date');
            if ($custommer->save()) {
    
                $cash = new CashAmountModel;
    
                $cash->User_ID = $user->User_ID;
                $cash->Status = 'Devit';
                $cash->Amount = $request->input('Amount');
                $cash->Details = $request->input('Employee_ID').'/'.$request->input('Type');
                $cash->Date = $request->input('Date');
                if ($cash->save()) {
                    return response()->json(['title'=>'Success','message' => 'Account Has been Saved..']);

                };
            };
    
        }
       
    }

    public function destroy(EmployeeAccReq $request)
    {$user = JWTAuth::parseToken()->authenticate();
        EmployeeAccModel::where('User_ID', $user->User_ID)
        ->where('Employee_ID', $request->input('Employee_ID'))
        ->where('Type',$request->input('OType'))
        ->where('Date', $request->input('Date'))->delete();


        CashAmountModel::where('User_ID', $user->User_ID)
        ->where('Details',$request->input('Employee_ID').'/'.$request->input('OType'))
        ->where('Date', $request->input('Date'))->delete();

        return response()->json(['title' =>'Success','message' => 'Account Deleted Successfull']);

    } 

    public function updateEmployeeAcc(EmployeeAccReq $request)
    {$user = JWTAuth::parseToken()->authenticate();
        EmployeeAccModel::where('User_ID', $user->User_ID)
            ->where('Employee_ID', $request->input('OEmployee_ID'))
            ->where('Type', 'LIKE','%'.$request->input('OType').'%')
            ->where('Date', $request->input('Date'))
            ->update(array(
                'Employee_ID' => $request->input('Employee_ID'),
                'Amount' => $request->input('Amount'),
                'Type' => $request->input('Type')
            ));
 
        CashAmountModel::where('User_ID', $user->User_ID)
            ->where('Details', 'LIKE','%'.$request->input('OEmployee_ID').'/'.$request->input('OType').'%')
            ->where('Date', $request->input('Date'))
            ->update(array(
                'Amount' => $request->input('Amount'),
                'Details' => $request->input('Employee_ID').'/'.$request->input('Type')
            ));
        

            return response()->json(['message' => 'Data Update Successfull']);
    }
}
