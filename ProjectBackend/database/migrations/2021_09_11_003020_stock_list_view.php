<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class StockListView extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::statement("
        CREATE VIEW `shooping_project`.`StockListView` 
                AS
            (
                SELECT stokbyproduct.User_ID ,stokbyproduct.Category_Id ,
                stokbyproduct.Product_Id,
                stokbyproduct.pQuantaty,
                stokbyproduct.sQuantaty,
                stokbyproduct.Quantaty,
                stokbyproduct.`Product_Name` ,
                stokbyproduct.`Producut_Images`,
                stokbyproduct.`Producut_Details`,
                stokbyproduct.`Producut_Price`,
                cate.`Name`
                    FROM ( SELECT  
    sto.User_ID,
                        sto.Category_Id ,
                        sto.Product_Id,
                        sto.pQuantaty,
                        sto.sQuantaty,
                        sto.Quantaty,
                        pro.`Product_Name` ,
                        pro.`Producut_Images`,
                        pro.`Producut_Details`,
                        pro.`Producut_Price`
                            FROM (SELECT p.`User_ID`, p.`Category_Id`, p.`Product_Id`, p.Quantaty AS pQuantaty,
                                    (CASE WHEN s.sQuantaty>0 THEN s.sQuantaty
                                    ELSE '0'
                                    END)AS sQuantaty
                                    ,(CASE WHEN p.Quantaty>s.sQuantaty
                                    THEN (p.Quantaty-s.sQuantaty)
                                    ELSE p.Quantaty
                                    END
                                    ) AS Quantaty FROM
                                        (SELECT `User_ID`,`Category_Id`, `Product_Id`, SUM(`Quantaty`) AS Quantaty
                                                    FROM `shooping_project`.`Product_Purchase` GROUP BY `Category_Id` , `Product_Id`,`User_ID`)AS p
                                        LEFT JOIN
                                        (SELECT `User_ID`,`Category_Id`, `Product_Id`,SUM(`Quantaty`)AS sQuantaty 
                                                    FROM `shooping_project`.`Product_Sales` GROUP BY `Category_Id` , `Product_Id`,`User_ID`)AS s
            
                                        ON s.Category_Id=p.Category_Id  AND s.Product_Id=p.Product_Id AND s.User_ID=p.User_ID) AS sto
                    INNER JOIN `Products` AS pro ON sto.Product_Id=pro.`Product_ID` AND pro.`User_ID`=sto.`User_ID`) AS stokbyproduct
                INNER JOIN `Category` AS cate ON stokbyproduct.Category_Id=cate.`id` AND stokbyproduct.User_ID=cate.`User_ID`
            );
        ");
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        DB::statement('DROP VIEW IF EXISTS  `shooping_project`.`StockListView`');
    }
}
