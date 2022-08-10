<?php

namespace App\Http\Controllers;

use App\Models\Bank_Account_Group;
use App\Models\StockView;
use App\Models\Total_Account;
use DateInterval;
use DatePeriod;
use DateTime;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Storage;
use SebastianBergmann\Type\ObjectType;
use Tymon\JWTAuth\Facades\JWTAuth;

class PublicController extends Controller
{
    public function index(Request $request)
    { 
        $user = JWTAuth::parseToken()->authenticate();
        return StockView::where('User_ID',$user->User_ID)->get();
    }

    public function accountall(Request $request)
   { 
       $user = JWTAuth::parseToken()->authenticate();
       return Total_Account::where('User_ID',$user->User_ID)->orderBy('Date', 'ASC')->get();
   }

    public function bankaccoutgroup(Request $request){
        $user = JWTAuth::parseToken()->authenticate();
        return Bank_Account_Group::where('User_ID',$user->User_ID)->with(['bankdetails'])->get();
    }
   
    public function bardetails(Request $request){
        $user = JWTAuth::parseToken()->authenticate();
      return Total_Account::groupBy('Date1')
      ->selectRaw(' 
               MONTHNAME(`Date`) AS MONTH,
               YEAR(`Date`) AS YEAR,
               SUBSTRING(`Date`, 1, 7) AS `Date1`,
               SUM(`Purchases_Total`)AS Purchases_Total,
               SUM(`Sales_Total`)AS Sales_Total,
               SUM(`Cost_Amount`)AS Cost_Amount')->
      where('User_ID', $user->User_ID)->orderBy('Date', 'ASC')->get();
    }

    public function stockAmount(Request $request){
        $user = JWTAuth::parseToken()->authenticate();
        $startDate=DB::select("
            SELECT MIN(`Purchase_Date`) AS `FromDate` FROM `Product_Purchase` WHERE `User_ID`='". $user->User_ID."'
            "); 
            $todate=$request->input('Date');
            $period = new DatePeriod(new DateTime($startDate[0]->FromDate), new DateInterval('P1D'), new DateTime( $todate.' +1 day'));
            foreach ($period as $date) {
                $dates[] = $date->format("Y-m-d");
            }

        $myArray =array();
        foreach ($dates as $date) {
           $getStock=
            DB::select(
                "
                SELECT 
                CUser_ID,Category_Id,CProduct_Id,PQuantaty,sQuantaty,stockQuantaty,StockPrice,CName,
                Product_Name,Producut_Images
                FROM (
                SELECT * FROM (
                SELECT User_ID AS CUser_ID ,Category_Id,Product_Id AS CProduct_Id,PQuantaty,sQuantaty,stockQuantaty,StockPrice,`Name` AS CName FROM (
                SELECT * FROM (SELECT User_ID AS StockUser_ID,Category_Id,Product_Id,SUM(Quantaty)AS PQuantaty ,SUM(sQuantaty)AS sQuantaty,
                SUM(stockQuantaty)AS stockQuantaty,SUM(StockPrice)AS StockPrice
                FROM (
                SELECT id,User_ID,Category_Id,Product_Id,Purchase_Date,Quantaty,Producut_Price,sQuantaty ,stockQuantaty,
                (stockQuantaty*Producut_Price)AS StockPrice FROM(
                SELECT id,User_ID,Category_Id,Product_Id,Purchase_Date,Quantaty,Producut_Price,sQuantaty ,
                (Quantaty-sQuantaty)AS stockQuantaty
                FROM(
                SELECT
                p.id,p.User_ID,p.Category_Id,p.Product_Id,p.Purchase_Date,p.Quantaty,p.Producut_Price,
                (CASE WHEN  s.SQuantaty IS NULL THEN 0 ELSE s.SQuantaty  END) AS sQuantaty
                FROM 
                (
                SELECT `id`, `User_ID`, `Category_Id`, `Product_Id`, `Purchase_Date`, `Quantaty` , `Producut_Price` FROM `shooping_project`.`Product_Purchase`
                WHERE `Purchase_Date`<='". $date."') AS p
                LEFT JOIN
                (SELECT `User_ID`,`Category_Id`, `Product_Id`, `Sales_Date`,`GRN`, SUM(`Quantaty`)AS SQuantaty FROM `shooping_project`.`Product_Sales` 
                WHERE `Sales_Date`<='". $date."'
                GROUP BY `GRN`,`User_ID`) AS s ON p.id=s.GRN) AS lasttable) AS lasttable1)AS stockamount WHERE User_ID='". $user->User_ID."' GROUP BY User_ID,Category_Id,Product_Id
                ) AS stock LEFT JOIN `category` ON category.`id`=stock.Category_Id AND `category`.`User_ID`=stock.StockUser_ID) AS categoryname) AS category LEFT JOIN `products` ON category.CProduct_Id=products.`Product_ID` AND category.CUser_ID=products.`User_ID`
                ) AS product
                "
            );
         
            $myArray[$date] =  $getStock;

        }
    $returnarray=[$myArray];
       return $returnarray;

    }

    
}
