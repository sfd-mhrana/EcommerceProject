<?php

namespace App\Http\Controllers;

use App\Http\Requests\PurchasesReq;
use App\Models\PurchasesAccModel;
use App\Models\PurchasesModel;
use App\Models\PurchasesReturnModel;
use App\Models\salesModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Tymon\JWTAuth\Facades\JWTAuth;

class PurchasesCon extends Controller
{
  
    public function store(PurchasesReq $request)
    {
        $user = JWTAuth::parseToken()->authenticate();
        // get product byEmployeeAccModel 
        if ($request->input('checkbill') == 'frist') {
            if (PurchasesModel::where('User_ID', $user->User_ID)
                ->where('Company_Name', $request->input('Company_Name'))
                ->where('Invoice_No', $request->input('Invoice_No'))->exists()
            ) {
                return response()->json(['title' => 'Warning', 'message' => 'This Invoice Already Have,, Please Check Invoice No']);
            } else {
                $purchases = new PurchasesModel;

                $purchases->User_ID = $user->User_ID;
                $purchases->Company_Name = $request->input('Company_Name');
                $purchases->Invoice_No = $request->input('Invoice_No');
                $purchases->Product_Id = $request->input('Product_Id');
                $purchases->Category_Id = $request->input('Category_Id');
                $purchases->Purchase_Date = $request->input('Purchase_Date');
                $purchases->Quantaty = $request->input('Quantaty');
                $purchases->Producut_Price = $request->input('Producut_Price');
                $purchases->Total_Price = $request->input('Total_Price');
                if ($purchases->save()) {
                    return response()->json(['message' => 'Data Update Successfull']);
                };
            }
        } else {
            $purchases = new PurchasesModel;

            $purchases->User_ID = $user->User_ID;
            $purchases->Company_Name = $request->input('Company_Name');
            $purchases->Invoice_No = $request->input('Invoice_No');
            $purchases->Product_Id = $request->input('Product_Id');
            $purchases->Category_Id = $request->input('Category_Id');
            $purchases->Purchase_Date = $request->input('Purchase_Date');
            $purchases->Quantaty = $request->input('Quantaty');
            $purchases->Producut_Price = $request->input('Producut_Price');
            $purchases->Total_Price = $request->input('Total_Price');
            if ($purchases->save()) {
                return response()->json(['message' => 'Data Update Successfull']);
            };
        }
    }

    public function getAllInvoiceProduct(PurchasesReq $request)
    {$user = JWTAuth::parseToken()->authenticate();
        return PurchasesModel::where('User_ID', $user->User_ID)
            ->where('Company_Name', $request->input('Company_Name'))
            ->where('Invoice_No', $request->input('Invoice_No'))->with(['category', 'product'])->get();
    }

    public function getAllProduct(PurchasesReq $request)
    {$user = JWTAuth::parseToken()->authenticate();
        if ($request->has('id')) {
            return PurchasesModel::where('User_ID', $user->User_ID)
                ->where('id', $request->input('id'))
                ->with(['category', 'product'])->get();
        } else {
            return PurchasesModel::where('User_ID', $user->User_ID)
                ->with(['category', 'product'])->get();
        }
    }

    public function nonMatchBill(PurchasesReq $request)
    {
        $user = JWTAuth::parseToken()->authenticate();
        return PurchasesModel::leftJoin('Product_Account', function ($join) {
            $join->on('Product_Purchase.Invoice_No', '=', 'Product_Account.Invoice_No');
            $join->on('Product_Purchase.Company_Name', '=', 'Product_Account.Company_Name');
        })->where('Product_Account.Invoice_No', null)->where('Product_Account.User_ID', null)->where('Product_Purchase.User_ID', $user->User_ID)
            ->select('Product_Purchase.*')
            ->with(['category', 'product'])
            ->get();
    }

    public function updateInvoiceItem(PurchasesReq $request)
    {$user = JWTAuth::parseToken()->authenticate();
        if (salesModel::where('User_ID', $user->User_ID)
            ->where('GRN', $request->input('id'))->exists()
        ) {
            $salesQuantaty =  salesModel::where('User_ID', $user->User_ID)
                ->where('GRN', $request->input('id'))->selectraw("SUM(Quantaty) as Quantaty")->get();
            if ($request->input('Quantaty') < $salesQuantaty[0]->Quantaty) {
                return response()->json(['title' => 'Warning', 'message' => $salesQuantaty[0]->Quantaty . ' Item Sales From This Product, You Can not Edit It Less Than ' . $salesQuantaty[0]->Quantaty]);
            } else {
                PurchasesModel::where('User_ID', $user->User_ID)
                    ->where('Company_Name', $request->input('Company_Name'))
                    ->where('Invoice_No', $request->input('Invoice_No'))
                    ->where('id', $request->input('id'))
                    ->update(array(
                        'Product_Id' => $request->input('Product_Id'),
                        'Category_Id' => $request->input('Category_Id'),
                        'Purchase_Date' => $request->input('Purchase_Date'),
                        'Quantaty' => $request->input('Quantaty'),
                        'Producut_Price' => $request->input('Producut_Price'),
                        'Total_Price' => $request->input('Total_Price')
                    ));
                return response()->json(['title' => 'Success', 'message' => ' Product Updated from Invoice']);
            }
        } else {
            PurchasesModel::where('User_ID', $user->User_ID)
                ->where('Company_Name', $request->input('Company_Name'))
                ->where('Invoice_No', $request->input('Invoice_No'))
                ->where('id', $request->input('id'))
                ->update(array(
                    'Product_Id' => $request->input('Product_Id'),
                    'Category_Id' => $request->input('Category_Id'),
                    'Purchase_Date' => $request->input('Purchase_Date'),
                    'Quantaty' => $request->input('Quantaty'),
                    'Producut_Price' => $request->input('Producut_Price'),
                    'Total_Price' => $request->input('Total_Price')
                ));
            return response()->json(['title' => 'Success', 'message' => ' Product Updated from Invoice']);
        }
    }

    public function deletePformInvoice(PurchasesReq $request)
    {$user = JWTAuth::parseToken()->authenticate();
        if (salesModel::where('User_ID', $user->User_ID)
            ->where('GRN', $request->input('id'))->exists()
        ) {
            return response()->json(['title' => 'Warning', 'message' => 'You Can not Delete this Product Because this product already sales..']);
        } else {

            PurchasesModel::where('User_ID', $user->User_ID)
                ->where('Company_Name', $request->input('Company_Name'))
                ->where('Invoice_No', $request->input('Invoice_No'))
                ->where('id', $request->input('id'))->delete();
            return response()->json(['title' => 'Success', 'message' => 'Deleted Product from Invoice Success']);
        }
    }

    public function productbycustommer(PurchasesReq $request)
    {$user = JWTAuth::parseToken()->authenticate();
        return PurchasesModel::where('User_ID', $user->User_ID)
            ->where('Company_Name', $request->input('Company_Name'))->with(['category', 'product'])->get();
    }

    public function prodivedGRN(PurchasesReq $request)
    {$user = JWTAuth::parseToken()->authenticate();
        $getSalesofProduct = salesModel::where('User_ID', $user->User_ID)
            ->where('Category_Id', $request->input('Category_Id'))
            ->where('Product_Id', $request->input('Product_Id'))
            ->get();

        if (!$getSalesofProduct->isEmpty()) {
            if ($request->has('GRN')) {
                return  DB::select('
                SELECT p.id,
                (case when s.Quantaty!=null then (p.Quantaty-s.Quantaty)
                else p.Quantaty
                end) AS Quantaty
                FROM 
                (SELECT `id`,`Quantaty` FROM `Product_Purchase` WHERE `User_ID`="' . $user->User_ID . '" AND `Category_Id`="' . $request->input('Category_Id') . '" AND`Product_Id`="' . $request->input('Product_Id') . '")AS p 
                LEFT JOIN
                (SELECT SUM(`Quantaty`) AS Quantaty,`GRN` FROM `shooping_project`.`Product_Sales`WHERE `User_ID`="' . $user->User_ID . '" AND `Category_Id`="' . $request->input('Category_Id') . '" AND `Product_Id`="' . $request->input('Product_Id') . '" GROUP BY `GRN`) AS s 
                ON p.id=s.GRN
                WHERE p.Quantaty>s.Quantaty AND 
                id="' . $request->input('GRN') . '"
               ');
            } else {
                return DB::select('
                SELECT * FROM (
                SELECT p.id,
                (CASE WHEN s.Quantaty IS NULL THEN p.Quantaty
                ELSE  (p.Quantaty-s.Quantaty)
                END)
                AS Quantaty
                FROM 
                (SELECT `id`,`Quantaty` FROM `Product_Purchase` WHERE `User_ID`="' . $user->User_ID . '" AND `Category_Id`="' . $request->input('Category_Id') . '" AND`Product_Id`="' . $request->input('Product_Id') . '")AS p 
                LEFT JOIN
                (SELECT SUM(`Quantaty`) AS Quantaty,`GRN` FROM `shooping_project`.`Product_Sales`WHERE `User_ID`="' . $user->User_ID . '" AND `Category_Id`="' . $request->input('Category_Id') . '" AND `Product_Id`="' . $request->input('Product_Id') . '" GROUP BY `GRN`) AS s 
                ON p.id=s.GRN
                ) AS q WHERE q.Quantaty !=0
                ');
            }
        } else {
            return DB::select('
                SELECT `id`,`Quantaty` FROM `Product_Purchase` WHERE `User_ID`="' . $user->User_ID . '" AND `Category_Id`="' . $request->input('Category_Id') . '" AND`Product_Id`="' . $request->input('Product_Id') . '"
            ');
        }
    }

    public function purchsesreturn(PurchasesReq $request)
    {$user = JWTAuth::parseToken()->authenticate();
        if (salesModel::where('User_ID', $user->User_ID)
            ->where('GRN', $request->input('id'))->exists()
        ) {
            $salesQuantaty =  salesModel::where('User_ID', $user->User_ID)
                ->where('GRN', $request->input('id'))->selectraw("SUM(Quantaty) as Quantaty")->get();
            if ($request->input('Quantaty') < $salesQuantaty[0]->Quantaty) {
                return response()->json(['title' => 'Warning', 'message' => $salesQuantaty[0]->Quantaty . ' Item Sales From This Product, You Need to Edit in a range ']);
            } else {
                PurchasesModel::where('User_ID', $user->User_ID)
                    ->where('Company_Name', $request->input('Company_Name'))
                    ->where('Invoice_No', $request->input('Invoice_No'))
                    ->where('id', $request->input('id'))
                    ->where('Product_Id', $request->input('Product_Id'))
                    ->where('Category_Id', $request->input('Category_Id'))
                    ->update(array(
                        'Quantaty' => $request->input('Quantaty'),
                        'Total_Price' => $request->input('Total_Price')
                    ));
                    return $this->addtoreturn( $request);
            }
        } else {
            PurchasesModel::where('User_ID', $user->User_ID)
                ->where('Company_Name', $request->input('Company_Name'))
                ->where('Invoice_No', $request->input('Invoice_No'))
                ->where('id', $request->input('id'))
                ->where('Product_Id', $request->input('Product_Id'))
                ->where('Category_Id', $request->input('Category_Id'))
                ->update(array(
                    'Quantaty' => $request->input('Quantaty'),
                    'Total_Price' => $request->input('Total_Price')
                ));

              return  $this->addtoreturn($request);
        }
    }
    
    public function addtoreturn($request)
    {$user = JWTAuth::parseToken()->authenticate();
        $purchases = new PurchasesReturnModel;

        $purchases->User_ID = $user->User_ID;
        $purchases->Company_Name = $request->input('Company_Name');
        $purchases->Invoice_No = $request->input('Invoice_No');
        $purchases->Product_Id = $request->input('Product_Id');
        $purchases->Category_Id = $request->input('Category_Id');
        $purchases->Return_Date = $request->input('Return_Date');
        $purchases->Return_Quantaty = $request->input('Return_Quantaty');
        $purchases->Producut_Price = $request->input('Producut_Price');
        $purchases->Total_Price = $request->input('Return_Total_Price');
        if ($purchases->save()) {
            $totalamount=0-$request->input('Return_Total_Price');

            $purchases = new PurchasesAccModel;
    
            $purchases->User_ID = $user->User_ID;
            $purchases->Company_Name = $request->input('Company_Name');
            $purchases->Invoice_No = $request->input('Invoice_No');
            $purchases->Purchase_Date = $request->input('Return_Date');
            $purchases->Total_Item = '0';
            $purchases->Total_Amount =  $totalamount;
            $purchases->Discount ='0';
            $purchases->Paid = '0';
            $purchases->Status = 'Purchases Return';
            if ($purchases->save()) {
                return response()->json(['title' => 'Success', 'message' => 'Return Product Successfully']);
            }else{
                return response()->json(['title' => 'Warning', 'message' => 'Something Else.. Try again Letter']);
            } 
            
        };
    }

    public function topsuppliyer(PurchasesReq $request){
        $user = JWTAuth::parseToken()->authenticate();
        return PurchasesModel::groupBy('Company_Name')
        ->selectRaw(' `User_ID`,
        `Company_Name`,
        SUM(`Total_Price`) AS Total_Amount')->
        where('User_ID', $user->User_ID)->orderBy('Total_Amount', 'DESC')->get();
    }

}
