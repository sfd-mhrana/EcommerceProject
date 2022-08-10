<?php

namespace App\Http\Controllers;


use App\Http\Requests\PurchasesAccReq;
use App\Http\Requests\PurchasesReq;
use App\Models\CashAmountModel;
use App\Models\PurchasesAccModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Tymon\JWTAuth\Facades\JWTAuth;

class PurchasesAccCon extends Controller
{
    public function store(PurchasesAccReq $request)
    { $user = JWTAuth::parseToken()->authenticate();
        // get product byEmployeeAccModel 
        $purchases = new PurchasesAccModel;
 
        $purchases->User_ID = $user->User_ID;
        $purchases->Company_Name = $request->input('Company_Name');
        $purchases->Invoice_No = $request->input('Invoice_No');
        $purchases->Purchase_Date = $request->input('Purchase_Date');
        $purchases->Total_Item = $request->input('Total_Item');
        $purchases->Total_Amount = $request->input('Total_Amount');
        $purchases->Discount = $request->input('Discount');
        $purchases->Paid = $request->input('Paid');
        $purchases->Status = $request->input('Status');
        if ($purchases->save()) {
        };
    }
  
    public function getAllbill(PurchasesAccReq $request){
        $user = JWTAuth::parseToken()->authenticate();
        if( $request->has('Company_Name')){
             return PurchasesAccModel::select('Invoice_No')->
       selectRaw("SUM(Total_Amount) as Total_Amount,SUM(Discount) as Discount,Total_Item,Purchase_Date,Company_Name,User_ID")
        ->selectRaw("SUM(Paid) as Paid")->groupBy('Invoice_No')
        ->where('Company_Name','=', $request->input('Company_Name'))
        ->where('User_ID','=',$user->User_ID)->with(['invoiceProduct'])->get();
        }else{
            return PurchasesAccModel::select('Invoice_No')->
            selectRaw("SUM(Total_Amount) as Total_Amount,SUM(Discount) as Discount,Total_Item,Purchase_Date,Company_Name,User_ID")
             ->selectRaw("SUM(Paid) as Paid")->groupBy('Invoice_No')->groupBy('Company_Name')
             ->where('User_ID','=',$user->User_ID)->with(['invoiceProduct'])->get();
        }
      
    }
    
    public function getSingleInvoiceAcc(PurchasesAccReq $request){
        $user = JWTAuth::parseToken()->authenticate();
        if($request->input('Company_Name')!=''){
            return DB::select("
            SELECT `id`, `Invoice_No`,`Purchase_Date`,`Total_Item`,`Total_Amount`,`Discount`,`Paid`,
            (SELECT SUM(p.`Paid`) FROM `shooping_project`.`Product_Account` AS p WHERE p.id<=r.`id`  AND p.`Invoice_No`=r.`Invoice_No`) AS SPaid,
            (SELECT SUM(d.`Discount`) FROM `shooping_project`.`Product_Account` AS d WHERE d.id<=r.`id`  AND d.`Invoice_No`=r.`Invoice_No`) AS SDiscount,
            (SELECT SUM(t.`Total_Amount`) FROM `shooping_project`.`Product_Account` AS t WHERE t.id<=r.`id`  AND t.`Invoice_No`=r.`Invoice_No`) AS STotal_Amount
            FROM `Product_Account` r 
            WHERE r.`User_ID`='".$user->User_ID."' AND 
            r.`Company_Name`='".$request->input('Company_Name')."' AND
            r.`Invoice_No`=".$request->input('Invoice_No').";
            ");
        }else{
            return $request;
        }
      
    }

    public function updateInvoiceAcc(PurchasesAccReq $request){
        $user = JWTAuth::parseToken()->authenticate();
        PurchasesAccModel::where('User_ID', $user->User_ID)
            ->where('Company_Name', $request->input('Company_Name'))
            ->where('Invoice_No',$request->input('Invoice_No'))
            ->where('Purchase_Date',$request->input('Purchase_Date'))
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
            $cashamount->Details = $request->input('Company_Name').'/'.$request->input('Invoice_No').'/PurchasesEdit';
            if ($cashamount->save()) {
            };
    }

    public function delectInvoiceACC(PurchasesAccReq $request){
        $user = JWTAuth::parseToken()->authenticate();
        PurchasesAccModel::where('User_ID', $user->User_ID)
        ->where('Company_Name', $request->input('Company_Name'))
        ->where('Invoice_No',$request->input('Invoice_No'))
        ->where('Purchase_Date',$request->input('Purchase_Date'))
        ->where('id', $request->input('id'))
        ->delete() ;



        $cashamount = new CashAmountModel();
        $cashamount->User_ID = $user->User_ID;
        $cashamount->Date = $request->input('Date');
        $cashamount->Amount = $request->input('Amount');
        $cashamount->Status = $request->input('Status');
        $cashamount->Details = $request->input('Company_Name').'/'.$request->input('Invoice_No').'/PurchasesEdit';
        if ($cashamount->save()) {
        };
        
    }

}
