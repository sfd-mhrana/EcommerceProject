<?php

namespace App\Http\Controllers;

use App\Http\Requests\salesAccReq;
use App\Models\CashAmountModel;
use App\Models\salesAccModel;
use Illuminate\Support\Facades\DB;
use Tymon\JWTAuth\Facades\JWTAuth;

class SalesAccCon extends Controller
{

    public function store(salesAccReq $request)
    {  $user = JWTAuth::parseToken()->authenticate();
        // get product byEmployeeAccModel 
        $salesacc = new salesAccModel();

        $salesacc->User_ID = $user->User_ID;
        $salesacc->Company_Name = $request->input('Company_Name');
        $salesacc->Invoice_No = $request->input('Invoice_No');
        $salesacc->Sales_Date = $request->input('Sales_Date');
        $salesacc->Total_Item = $request->input('Total_Item');
        $salesacc->Total_Amount = $request->input('Total_Amount');
        $salesacc->Discount = $request->input('Discount');
        $salesacc->Paid = $request->input('Paid');
        $salesacc->SR_ID = $request->input('SR_ID');
        $salesacc->Status = $request->input('Status');
        if ($salesacc->save()) {
        };
    }


    function getAllbill(salesAccReq $request){
        $user = JWTAuth::parseToken()->authenticate();
        return salesAccModel::select('id')
        ->selectRaw("User_ID,Company_Name,Invoice_No,Sales_Date,
        SUM(`Total_Item`) AS Total_Item,SUM(`Total_Amount`)AS Total_Amount,SUM(`Discount`)AS Discount, SUM(`Paid`) AS Paid,
        `SR_ID` ")->groupBy('Invoice_No')
        ->where('User_ID','=',$user->User_ID)->with(['invoiceProduct','employee'])->get();;
    }

    function getSingleInvoiceAcc(salesAccReq $request){
        $user = JWTAuth::parseToken()->authenticate();
        return DB::select("
            SELECT `id`, `Invoice_No`,`Sales_Date`,`Total_Item`,`Total_Amount`,`Discount`,`Paid`,`Status`,
            (SELECT SUM(p.`Paid`) FROM `shooping_project`.`Sales_Account` AS p WHERE p.id<=r.`id`  AND p.`Invoice_No`=r.`Invoice_No`) AS SPaid,
            (SELECT SUM(d.`Discount`) FROM `shooping_project`.`Sales_Account` AS d WHERE d.id<=r.`id`  AND d.`Invoice_No`=r.`Invoice_No`) AS SDiscount,
            (SELECT SUM(t.`Total_Amount`) FROM `shooping_project`.`Sales_Account` AS t WHERE t.id<=r.`id`  AND t.`Invoice_No`=r.`Invoice_No`) AS STotal_Amount
            FROM `Sales_Account` r 
            WHERE r.`User_ID`='".$user->User_ID."' AND 
            r.`Invoice_No`='".$request->input('Invoice_No')."';
            ");
    }

    public function updateInvoiceAcc(salesAccReq $request){
        $user = JWTAuth::parseToken()->authenticate();
        salesAccModel::where('User_ID','=',$user->User_ID)
        ->where('Invoice_No',$request->input('Invoice_No'))
        ->where('Sales_Date',$request->input('Sales_Date'))
        ->where('id', $request->input('id'))
            ->update(array(
                'Discount' => $request->input('Discount'),
                'Paid' => $request->input('Paid'),
                'Status' => $request->input('Status')
            ));

            $cashamount = new CashAmountModel();
            $cashamount->User_ID = $user->User_ID;
            $cashamount->Date = $request->input('Date');
            $cashamount->Amount = $request->input('Amount');
            $cashamount->Status = $request->input('Status');
            $cashamount->Details = $request->input('Company_Name').'/'.$request->input('Invoice_No').'/SalesPaidUpdate';
            if ($cashamount->save()) {
            };
    }

    function delectInvoiceACC(salesAccReq $request){
        $user = JWTAuth::parseToken()->authenticate();
        salesAccModel::where('User_ID','=',$user->User_ID)
        ->where('Invoice_No',$request->input('Invoice_No'))
        ->where('Sales_Date',$request->input('Sales_Date'))
        ->where('id', $request->input('id'))->delete();;

        $cashamount = new CashAmountModel();
        $cashamount->User_ID = $user->User_ID;
        $cashamount->Date = $request->input('Date');
        $cashamount->Amount = $request->input('Amount');
        $cashamount->Status = $request->input('Status');
        $cashamount->Details = $request->input('Company_Name').'/'.$request->input('Invoice_No').'/SalesPaidDelete';
        if ($cashamount->save()) {
        };
        
    }

}
