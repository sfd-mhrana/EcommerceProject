<?php

namespace App\Http\Controllers;

use App\Http\Requests\salesReq;
use App\Models\salesAccModel;
use App\Models\salesModel;
use App\Models\SalesReturnModel;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;

class SalesCon extends Controller
{

    public function store(salesReq $request)
    {
        $user = JWTAuth::parseToken()->authenticate();
        if ($request->input('checkbill') == 'first') {
            if (salesModel::where('User_ID', $user->User_ID)->where('Invoice_No', $request->input('Invoice_No'))->exists()) {
                return response()->json(['title' => 'Warning', 'message' => 'This Invoice Already Have,, Please Check Invoice No']);
            } else {
                // get product byEmployeeAccModel 

                $sales = new salesModel;

                $sales->User_ID = $user->User_ID;
                $sales->Company_Name = $request->input('Company_Name');
                $sales->Invoice_No = $request->input('Invoice_No');
                $sales->Product_Id = $request->input('Product_Id');
                $sales->Category_Id = $request->input('Category_Id');
                $sales->Sales_Date = $request->input('Sales_Date');
                $sales->GRN = $request->input('GRN');
                $sales->Quantaty = $request->input('Quantaty');
                $sales->Sales_Price = $request->input('Sales_Price');
                $sales->Total_Price = $request->input('Total_Price');
                $sales->SR_ID = $request->input('SR_ID');
                if ($sales->save()) {
                    return response()->json(['message' => 'Data Update Successfull']);
                };
            }
        } else {
            // get product byEmployeeAccModel 

            $sales = new salesModel;

            $sales->User_ID = $user->User_ID;
            $sales->Company_Name = $request->input('Company_Name');
            $sales->Invoice_No = $request->input('Invoice_No');
            $sales->Product_Id = $request->input('Product_Id');
            $sales->Category_Id = $request->input('Category_Id');
            $sales->Sales_Date = $request->input('Sales_Date');
            $sales->GRN = $request->input('GRN');
            $sales->Quantaty = $request->input('Quantaty');
            $sales->Sales_Price = $request->input('Sales_Price');
            $sales->Total_Price = $request->input('Total_Price');
            $sales->SR_ID = $request->input('SR_ID');
            if ($sales->save()) {
                return response()->json(['message' => 'Data Update Successfull']);
            };
        }
    }

    public function invoicep(salesReq $request)
    {
        $user = JWTAuth::parseToken()->authenticate();
        if ($request->has('Invoice_No')) {
            return salesModel::where('User_ID', $user->User_ID)
                ->where('Invoice_No', $request->input('Invoice_No'))->with(['category', 'product', 'productGRN', 'employee'])->get();
        } else {
            return salesModel::where('User_ID', $user->User_ID)
                ->with(['category', 'product', 'productGRN', 'employee'])->get();
        }
    }


    public function getAllbyProductName(salesReq $request)
    {  $user = JWTAuth::parseToken()->authenticate();
        return salesModel::where('User_ID', $user->User_ID)
            ->where('Product_Id', $request->input('Product_Id'))->with(['category', 'product', 'productGRN'])->get();
    }

    public function nonMatchBill(salesReq $request)
    {
        $user = JWTAuth::parseToken()->authenticate();
        return salesModel::leftJoin('Sales_Account', function ($join) {
            $join->on('Product_Sales.Invoice_No', '=', 'Sales_Account.Invoice_No');
        })->where('Sales_Account.Invoice_No', null)->where('Sales_Account.User_ID', null)->where('Product_Sales.User_ID', $user->User_ID)
            ->select('Product_Sales.*')
            ->with(['category', 'product', 'productGRN', 'employee'])
            ->get();
    }

    public function updateInvoiceItem(salesReq $request)
    {
        $user = JWTAuth::parseToken()->authenticate();
        return  salesModel::where('User_ID', $user->User_ID)
            ->where('Invoice_No', $request->input('Invoice_No'))
            ->where('id', $request->input('id'))
            ->update(array(
                'Product_Id' => $request->input('Product_Id'),
                'Category_Id' => $request->input('Category_Id'),
                'Sales_Date' => $request->input('Sales_Date'),
                'GRN' => $request->input('GRN'),
                'Quantaty' => $request->input('Quantaty'),
                'Sales_Price' => $request->input('Sales_Price'),
                'Total_Price' => $request->input('Total_Price'),
                'SR_ID' => $request->input('SR_ID')
            ));
    }

    public function deletePformInvoice(salesReq $request)
    {  $user = JWTAuth::parseToken()->authenticate();
        return salesModel::where('User_ID', $user->User_ID)
            ->where('Invoice_No', $request->input('Invoice_No'))
            ->where('id', $request->input('id'))->delete();
    }

    public function productbycustommer(salesReq $request)
    {  $user = JWTAuth::parseToken()->authenticate();
        return salesModel::where('User_ID', $user->User_ID)
            ->where('Company_Name', $request->input('Company_Name'))->with(['category', 'product', 'productGRN'])->get();
    }

    public function getallsalesCustommer(salesReq $request)
    {  $user = JWTAuth::parseToken()->authenticate();
        return salesModel::where('User_ID', $user->User_ID)
            ->groupby('Company_Name')
            ->with(['category', 'product', 'productGRN', 'employee'])->get();
    }

    public function getallproductbyInvoice(salesReq $request)
    {  $user = JWTAuth::parseToken()->authenticate();
        return salesModel::where('User_ID', $user->User_ID)
            ->with(['category', 'product', 'productGRN', 'employee'])->get();
    }

    public function salesreturn(salesReq $request){
        $user = JWTAuth::parseToken()->authenticate();
            salesModel::where('User_ID', $user->User_ID)
            ->where('Invoice_No', $request->input('Invoice_No'))
            ->where('id', $request->input('id'))
            ->update(array(
                'Quantaty' => $request->input('Quantaty'),
                'Total_Price' => $request->input('Total_Price')
            ));

            $sales = new SalesReturnModel;

            $sales->User_ID = $user->User_ID;
            $sales->Company_Name = $request->input('Company_Name');
            $sales->Invoice_No = $request->input('Invoice_No');
            $sales->Product_Id = $request->input('Product_Id');
            $sales->Category_Id = $request->input('Category_Id');
            $sales->Return_Date = $request->input('Return_Date');
            $sales->GRN = $request->input('GRN');
            $sales->Quantaty = $request->input('Return_Quantaty');
            $sales->Sales_Price = $request->input('Sales_Price');
            $sales->Total_Price = $request->input('Return_Total_Price');
            $sales->SR_ID = $request->input('SR_ID');
            if ($sales->save()) {
                $totalamount=0-$request->input('Return_Total_Price');

                $salesacc = new salesAccModel;

                $salesacc->User_ID = $user->User_ID;
                $salesacc->Company_Name = $request->input('Company_Name');
                $salesacc->Invoice_No = $request->input('Invoice_No');
                $salesacc->Sales_Date = $request->input('Sales_Date');
                $salesacc->Total_Item = '0';
                $salesacc->Total_Amount = $totalamount;
                $salesacc->Discount = '0';
                $salesacc->Paid ='0';
                $salesacc->SR_ID = $request->input('SR_ID');
                $salesacc->Status = 'Sales Return';
                if ($salesacc->save()) {
                    return response()->json(['title' => 'Success', 'message' => 'Return Product Successfully']);
                }else{
                    return response()->json(['title' => 'Warning', 'message' => 'Something Else.. Try again Letter']);
                } 
            };
    }

    public function topcustommer(salesReq $request){
        $user = JWTAuth::parseToken()->authenticate();
        return salesModel::groupBy('Company_Name')
        ->selectRaw(' `User_ID`,
        `Company_Name`,
        SUM(`Total_Price`) AS Total_Amount')->
        where('User_ID', $user->User_ID)->orderBy('Total_Amount', 'DESC')->get();
    }

    public function topsalesproduct(salesReq $request){
        $user = JWTAuth::parseToken()->authenticate();
        return salesModel::groupBy('Product_Id')->groupBy('Category_Id')
        ->selectRaw(' `User_ID`,
        `Company_Name`,`Product_Id`,`Category_Id`,`id`,`SR_ID`,
        SUM(`Total_Price`) AS Total_Amount')->
        where('User_ID', $user->User_ID)->orderBy('Total_Amount', 'DESC')
        ->with(['category', 'product', 'productGRN', 'employee'])->get();
    }

}
