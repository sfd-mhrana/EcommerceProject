<?php

namespace App\Http\Controllers\Publicshops;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\OrderList;
use Illuminate\Http\Request;
use App\Http\Requests\OrderReq;
use Illuminate\Support\Facades\DB;

class Publiccontroller extends Controller
{
    public function allShops()
    {
        return User::all();
    } 

    public function getAllProduct()
    {
        $allcategory=DB::select("
                SELECT * FROM `StockListView` GROUP BY `Name`
            ");

            foreach ($allcategory as $name) {
                $names[] = $name->Name;
            }

            $myArray =array();
            foreach ($names as $name) {
               $allproductincategory= DB::select("
                        SELECT * FROM `StockListView` WHERE `Name`='".$name."'
                ");
                $myArray[$name] =  $allproductincategory;
            }
            $returnarray=[$myArray];
       return $returnarray;
    }
    
    public function orderlist(OrderReq $request ){
        $complete=TRUE;
        if($request->input('Order_List')){
            $datas = json_decode($request->input('Order_List'));
            for($i=0;$i<sizeof($datas);$i++){
                $orderlist = new OrderList();
                $orderlist->PUser_ID = "rana";
                $orderlist->SUser_ID =  $datas[$i]->User_ID;
                $orderlist->Invoice_No = $request->input('Invoice_No');
                $orderlist->Product_Id = $datas[$i]->Product_Id;
                $orderlist->OderDate = $request->input('OderDate');
                $orderlist->DaliveryDate = $request->input('DaliveryDate');
                $orderlist->Quantaty =$datas[$i]->Order_Quantaty;
                $orderlist->Sales_Price =$datas[$i]->Producut_Price;
                $orderlist->Total_Price =($datas[$i]->Order_Quantaty*$datas[$i]->Producut_Price);
                if($orderlist->save()){
                    $complete=TRUE;
                }
            }
            if($complete){
                return "OK";
            }
            
        }else{
            return  "Error";
        }
        
        
    }
    
}
