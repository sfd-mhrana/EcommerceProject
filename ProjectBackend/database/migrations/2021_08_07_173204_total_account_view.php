<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class TotalAccountView extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::statement("
        CREATE VIEW `shooping_project`.`totalAmmount` 
                AS
            (
            
               SELECT 
               (CASE WHEN User_ID IS NULL THEN 
                           CASE WHEN Sales_Paid_User IS NULL THEN 
                                   NULL
                                ELSE Sales_Paid_User END
                  ELSE User_ID END)AS `User_ID`,
                 (CASE WHEN `Date` IS NULL THEN 
                           CASE WHEN Sales_Paid_Date IS NULL THEN 
                                   NULL
                                ELSE Sales_Paid_Date END
                  ELSE `Date` END)AS `Date`,
                  (CASE WHEN Credit IS NULL THEN 0 ELSE Credit END) AS Credit,
                  (CASE WHEN Devit IS NULL THEN 0 ELSE Devit END) AS Devit,
                  (CASE WHEN Cost_Amount IS NULL THEN 0 ELSE Cost_Amount END) AS Cost_Amount,
                  (CASE WHEN Purchases_Total IS NULL THEN 0 ELSE Purchases_Total END) AS Purchases_Total,
                  (CASE WHEN Purchases_Paid IS NULL THEN 0 ELSE Purchases_Paid END) AS Purchases_Paid,
                  (CASE WHEN Purchases_Paid_R IS NULL THEN 0 ELSE Purchases_Paid_R END) AS Purchases_Paid_R,
                  (CASE WHEN Sales_Total IS NULL THEN 0 ELSE Sales_Total END) AS Sales_Total,
                  (CASE WHEN Paid IS NULL THEN 0 ELSE Paid END) AS Sales_Paid,
                  (CASE WHEN Paid_R IS NULL THEN 0 ELSE Paid_R END) AS Sales_Paid_R
               FROM(SELECT * FROM(SELECT * FROM(
               SELECT 
               (CASE WHEN User_ID IS NULL THEN 
                           CASE WHEN Sales_User IS NULL THEN 
                                   NULL
                                ELSE Sales_User END
                  ELSE User_ID END)AS `User_ID`,
                  (CASE WHEN `Date` IS NULL THEN 
                           CASE WHEN Sales_Date IS NULL THEN 
                                   NULL
                                ELSE Sales_Date END
                  ELSE `Date` END)AS `Date`,
                  (CASE WHEN Credit IS NULL THEN 0 ELSE Credit END) AS Credit,
                  (CASE WHEN Devit IS NULL THEN 0 ELSE Devit END) AS Devit,
                  (CASE WHEN Cost_Amount IS NULL THEN 0 ELSE Cost_Amount END) AS Cost_Amount,
                  (CASE WHEN Purchases_Total IS NULL THEN 0 ELSE Purchases_Total END) AS Purchases_Total,
                  (CASE WHEN Purchases_Paid IS NULL THEN 0 ELSE Purchases_Paid END) AS Purchases_Paid,
                  (CASE WHEN Purchases_Paid_R IS NULL THEN 0 ELSE Purchases_Paid_R END) AS Purchases_Paid_R,
                  (CASE WHEN Sales_Total IS NULL THEN 0 ELSE Sales_Total END) AS Sales_Total
               FROM(
               SELECT *FROM (SELECT * FROM(
               SELECT 
               (CASE WHEN User_ID IS NULL THEN 
                           CASE WHEN Purchases_Paid_User IS NULL THEN 
                                   NULL
                                ELSE Purchases_Paid_User END
                  ELSE User_ID END)AS `User_ID`,
                  (CASE WHEN `Date` IS NULL THEN 
                           CASE WHEN Purchase_Paid_Date IS NULL THEN 
                                   NULL
                                ELSE Purchase_Paid_Date END
                  ELSE `Date` END)AS `Date`,
                  (CASE WHEN Credit IS NULL THEN 0 ELSE Credit END) AS Credit,
                  (CASE WHEN Devit IS NULL THEN 0 ELSE Devit END) AS Devit,
                  (CASE WHEN Cost_Amount IS NULL THEN 0 ELSE Cost_Amount END) AS Cost_Amount,
                  (CASE WHEN Purchases_Total IS NULL THEN 0 ELSE Purchases_Total END) AS Purchases_Total,
                  (CASE WHEN Paid IS NULL THEN 0 ELSE Paid END) AS Purchases_Paid,
                  (CASE WHEN Paid_R IS NULL THEN 0 ELSE Paid_R END) AS Purchases_Paid_R
               FROM (SELECT * FROM (SELECT 
               (CASE WHEN User_ID IS NULL THEN 
                           CASE WHEN Purchases_User IS NULL THEN 
                                   NULL
                                ELSE Purchases_User END
                  ELSE User_ID END)AS `User_ID`,
                  (CASE WHEN `Date` IS NULL THEN 
                           CASE WHEN Purchase_Date IS NULL THEN 
                                   NULL
                                ELSE Purchase_Date END
                  ELSE `Date` END)AS `Date`,
                  (CASE WHEN Credit IS NULL THEN 0 ELSE Credit END) AS Credit,
                  (CASE WHEN Devit IS NULL THEN 0 ELSE Devit END) AS Devit,
                  (CASE WHEN Cost_Amount IS NULL THEN 0 ELSE Cost_Amount END) AS Cost_Amount,
                  (CASE WHEN Purchases_Total IS NULL THEN 0 ELSE Purchases_Total END) AS Purchases_Total
               FROM (SELECT 
                   *
               FROM (SELECT 
                 (CASE WHEN User_ID IS NULL THEN 
                           CASE WHEN cost_userId IS NULL THEN 
                                   NULL
                                ELSE cost_userId END
                  ELSE User_ID END)AS `User_ID`,
                  (CASE WHEN `Date` IS NULL THEN 
                           CASE WHEN cost_date IS NULL THEN 
                                   NULL
                                ELSE cost_date END
                  ELSE `Date` END)AS `Date`,
                  (CASE WHEN Credit IS NULL THEN 0 ELSE Credit END) AS Credit,
                  (CASE WHEN Devit IS NULL THEN 0 ELSE Devit END) AS Devit,
                  (CASE WHEN Cost_Amount IS NULL THEN 0 ELSE Cost_Amount END) AS Cost_Amount
               FROM (
               SELECT * FROM `cash_groupdate` LEFT JOIN `cost_groupdate` ON `cash_groupdate`.`Date`=`cost_groupdate`.`cost_date` AND `cash_groupdate`.`User_ID`=`cost_groupdate`.`cost_userId`
               UNION 
               SELECT * FROM `cash_groupdate` RIGHT JOIN `cost_groupdate` ON `cash_groupdate`.`Date`=`cost_groupdate`.`cost_date` AND `cash_groupdate`.`User_ID`=`cost_groupdate`.`cost_userId`) AS `cash_cost`)AS cash_cost
               LEFT JOIN `purchases_groupdate` ON `cash_cost`.`Date`=`purchases_groupdate`.`Purchase_Date` AND `cash_cost`.`User_ID`=`purchases_groupdate`.`Purchases_User`
               UNION
               SELECT * FROM (SELECT 
                 (CASE WHEN User_ID IS NULL THEN 
                           CASE WHEN cost_userId IS NULL THEN 
                                   NULL
                                ELSE cost_userId END
                  ELSE User_ID END)AS `User_ID`,
                  (CASE WHEN `Date` IS NULL THEN 
                           CASE WHEN cost_date IS NULL THEN 
                                   NULL
                                ELSE cost_date END
                  ELSE `Date` END)AS `Date`,
                  (CASE WHEN Credit IS NULL THEN 0 ELSE Credit END) AS Credit,
                  (CASE WHEN Devit IS NULL THEN 0 ELSE Devit END) AS Devit,
                  (CASE WHEN Cost_Amount IS NULL THEN 0 ELSE Cost_Amount END) AS Cost_Amount
               FROM (
               SELECT * FROM `cash_groupdate` LEFT JOIN `cost_groupdate` ON `cash_groupdate`.`Date`=`cost_groupdate`.`cost_date`AND `cash_groupdate`.`User_ID`=`cost_groupdate`.`cost_userId`
               UNION 
               SELECT * FROM `cash_groupdate` RIGHT JOIN `cost_groupdate` ON `cash_groupdate`.`Date`=`cost_groupdate`.`cost_date` AND `cash_groupdate`.`User_ID`=`cost_groupdate`.`cost_userId`) AS `cash_cost`)AS cash_cost
               RIGHT JOIN `purchases_groupdate` ON `cash_cost`.`Date`=`purchases_groupdate`.`Purchase_Date` AND `cash_cost`.`User_ID`=`purchases_groupdate`.`Purchases_User`) AS purchases_table)AS cas_cost_purchases
               LEFT JOIN `purchases_paid_groupdate` ON cas_cost_purchases.Date=`purchases_paid_groupdate`.Purchase_Paid_Date AND  cas_cost_purchases.User_ID=`purchases_paid_groupdate`.Purchases_Paid_User
               UNION 
               SELECT * FROM (SELECT 
               (CASE WHEN User_ID IS NULL THEN 
                           CASE WHEN Purchases_User IS NULL THEN 
                                   NULL
                                ELSE Purchases_User END
                  ELSE User_ID END)AS `User_ID`,
                  (CASE WHEN `Date` IS NULL THEN 
                           CASE WHEN Purchase_Date IS NULL THEN 
                                   NULL
                                ELSE Purchase_Date END
                  ELSE `Date` END)AS `Date`,
                  (CASE WHEN Credit IS NULL THEN 0 ELSE Credit END) AS Credit,
                  (CASE WHEN Devit IS NULL THEN 0 ELSE Devit END) AS Devit,
                  (CASE WHEN Cost_Amount IS NULL THEN 0 ELSE Cost_Amount END) AS Cost_Amount,
                  (CASE WHEN Purchases_Total IS NULL THEN 0 ELSE Purchases_Total END) AS Purchases_Total
               FROM (SELECT 
                   *
               FROM (SELECT 
                 (CASE WHEN User_ID IS NULL THEN 
                           CASE WHEN cost_userId IS NULL THEN 
                                   NULL
                                ELSE cost_userId END
                  ELSE User_ID END)AS `User_ID`,
                  (CASE WHEN `Date` IS NULL THEN 
                           CASE WHEN cost_date IS NULL THEN 
                                   NULL
                                ELSE cost_date END
                  ELSE `Date` END)AS `Date`,
                  (CASE WHEN Credit IS NULL THEN 0 ELSE Credit END) AS Credit,
                  (CASE WHEN Devit IS NULL THEN 0 ELSE Devit END) AS Devit,
                  (CASE WHEN Cost_Amount IS NULL THEN 0 ELSE Cost_Amount END) AS Cost_Amount
               FROM (
               SELECT * FROM `cash_groupdate` LEFT JOIN `cost_groupdate` ON `cash_groupdate`.`Date`=`cost_groupdate`.`cost_date` AND `cash_groupdate`.`User_ID`=`cost_groupdate`.`cost_userId`
               UNION 
               SELECT * FROM `cash_groupdate` RIGHT JOIN `cost_groupdate` ON `cash_groupdate`.`Date`=`cost_groupdate`.`cost_date` AND `cash_groupdate`.`User_ID`=`cost_groupdate`.`cost_userId`) AS `cash_cost`)AS cash_cost
               LEFT JOIN `purchases_groupdate` ON `cash_cost`.`Date`=`purchases_groupdate`.`Purchase_Date` AND `cash_cost`.`User_ID`=`purchases_groupdate`.`Purchases_User`
               UNION
               SELECT * FROM (SELECT 
                 (CASE WHEN User_ID IS NULL THEN 
                           CASE WHEN cost_userId IS NULL THEN 
                                   NULL
                                ELSE cost_userId END
                  ELSE User_ID END)AS `User_ID`,
                  (CASE WHEN `Date` IS NULL THEN 
                           CASE WHEN cost_date IS NULL THEN 
                                   NULL
                                ELSE cost_date END
                  ELSE `Date` END)AS `Date`,
                  (CASE WHEN Credit IS NULL THEN 0 ELSE Credit END) AS Credit,
                  (CASE WHEN Devit IS NULL THEN 0 ELSE Devit END) AS Devit,
                  (CASE WHEN Cost_Amount IS NULL THEN 0 ELSE Cost_Amount END) AS Cost_Amount
               FROM (
               SELECT * FROM `cash_groupdate` LEFT JOIN `cost_groupdate` ON `cash_groupdate`.`Date`=`cost_groupdate`.`cost_date`AND `cash_groupdate`.`User_ID`=`cost_groupdate`.`cost_userId`
               UNION 
               SELECT * FROM `cash_groupdate` RIGHT JOIN `cost_groupdate` ON `cash_groupdate`.`Date`=`cost_groupdate`.`cost_date` AND `cash_groupdate`.`User_ID`=`cost_groupdate`.`cost_userId`) AS `cash_cost`)AS cash_cost
               RIGHT JOIN `purchases_groupdate` ON `cash_cost`.`Date`=`purchases_groupdate`.`Purchase_Date`AND `cash_cost`.`User_ID`=`purchases_groupdate`.`Purchases_User`) AS purchases_table)AS cas_cost_purchases
               RIGHT JOIN `purchases_paid_groupdate` ON cas_cost_purchases.Date=`purchases_paid_groupdate`.Purchase_Paid_Date AND  cas_cost_purchases.User_ID=`purchases_paid_groupdate`.Purchases_Paid_User) AS cas_cost_purchases_purchases_paid
               )AS cas_cost_purchases_purchases_paid LEFT JOIN `sales_groupdate` ON cas_cost_purchases_purchases_paid.`Date`=`sales_groupdate`.`Sales_Date` AND cas_cost_purchases_purchases_paid.`User_ID`=`sales_groupdate`.`Sales_User`
               UNION
               SELECT * FROM(
               SELECT 
               (CASE WHEN User_ID IS NULL THEN 
                           CASE WHEN Purchases_Paid_User IS NULL THEN 
                                   NULL
                                ELSE Purchases_Paid_User END
                  ELSE User_ID END)AS `User_ID`,
                  (CASE WHEN `Date` IS NULL THEN 
                           CASE WHEN Purchase_Paid_Date IS NULL THEN 
                                   NULL
                                ELSE Purchase_Paid_Date END
                  ELSE `Date` END)AS `Date`,
                  (CASE WHEN Credit IS NULL THEN 0 ELSE Credit END) AS Credit,
                  (CASE WHEN Devit IS NULL THEN 0 ELSE Devit END) AS Devit,
                  (CASE WHEN Cost_Amount IS NULL THEN 0 ELSE Cost_Amount END) AS Cost_Amount,
                  (CASE WHEN Purchases_Total IS NULL THEN 0 ELSE Purchases_Total END) AS Purchases_Total,
                  (CASE WHEN Paid IS NULL THEN 0 ELSE Paid END) AS Purchases_Paid,
                  (CASE WHEN Paid_R IS NULL THEN 0 ELSE Paid_R END) AS Purchases_Paid_R
               FROM (SELECT * FROM (SELECT 
               (CASE WHEN User_ID IS NULL THEN 
                           CASE WHEN Purchases_User IS NULL THEN 
                                   NULL
                                ELSE Purchases_User END
                  ELSE User_ID END)AS `User_ID`,
                  (CASE WHEN `Date` IS NULL THEN 
                           CASE WHEN Purchase_Date IS NULL THEN 
                                   NULL
                                ELSE Purchase_Date END
                  ELSE `Date` END)AS `Date`,
                  (CASE WHEN Credit IS NULL THEN 0 ELSE Credit END) AS Credit,
                  (CASE WHEN Devit IS NULL THEN 0 ELSE Devit END) AS Devit,
                  (CASE WHEN Cost_Amount IS NULL THEN 0 ELSE Cost_Amount END) AS Cost_Amount,
                  (CASE WHEN Purchases_Total IS NULL THEN 0 ELSE Purchases_Total END) AS Purchases_Total
               FROM (SELECT 
                   *
               FROM (SELECT 
                 (CASE WHEN User_ID IS NULL THEN 
                           CASE WHEN cost_userId IS NULL THEN 
                                   NULL
                                ELSE cost_userId END
                  ELSE User_ID END)AS `User_ID`,
                  (CASE WHEN `Date` IS NULL THEN 
                           CASE WHEN cost_date IS NULL THEN 
                                   NULL
                                ELSE cost_date END
                  ELSE `Date` END)AS `Date`,
                  (CASE WHEN Credit IS NULL THEN 0 ELSE Credit END) AS Credit,
                  (CASE WHEN Devit IS NULL THEN 0 ELSE Devit END) AS Devit,
                  (CASE WHEN Cost_Amount IS NULL THEN 0 ELSE Cost_Amount END) AS Cost_Amount
               FROM (
               SELECT * FROM `cash_groupdate` LEFT JOIN `cost_groupdate` ON `cash_groupdate`.`Date`=`cost_groupdate`.`cost_date` AND `cash_groupdate`.`User_ID`=`cost_groupdate`.`cost_userId`
               UNION 
               SELECT * FROM `cash_groupdate` RIGHT JOIN `cost_groupdate` ON `cash_groupdate`.`Date`=`cost_groupdate`.`cost_date` AND `cash_groupdate`.`User_ID`=`cost_groupdate`.`cost_userId`) AS `cash_cost`)AS cash_cost
               LEFT JOIN `purchases_groupdate` ON `cash_cost`.`Date`=`purchases_groupdate`.`Purchase_Date` AND `cash_cost`.`User_ID`=`purchases_groupdate`.`Purchases_User`
               UNION
               SELECT * FROM (SELECT 
                 (CASE WHEN User_ID IS NULL THEN 
                           CASE WHEN cost_userId IS NULL THEN 
                                   NULL
                                ELSE cost_userId END
                  ELSE User_ID END)AS `User_ID`,
                  (CASE WHEN `Date` IS NULL THEN 
                           CASE WHEN cost_date IS NULL THEN 
                                   NULL
                                ELSE cost_date END
                  ELSE `Date` END)AS `Date`,
                  (CASE WHEN Credit IS NULL THEN 0 ELSE Credit END) AS Credit,
                  (CASE WHEN Devit IS NULL THEN 0 ELSE Devit END) AS Devit,
                  (CASE WHEN Cost_Amount IS NULL THEN 0 ELSE Cost_Amount END) AS Cost_Amount
               FROM (
               SELECT * FROM `cash_groupdate` LEFT JOIN `cost_groupdate` ON `cash_groupdate`.`Date`=`cost_groupdate`.`cost_date`AND `cash_groupdate`.`User_ID`=`cost_groupdate`.`cost_userId`
               UNION 
               SELECT * FROM `cash_groupdate` RIGHT JOIN `cost_groupdate` ON `cash_groupdate`.`Date`=`cost_groupdate`.`cost_date`AND `cash_groupdate`.`User_ID`=`cost_groupdate`.`cost_userId`) AS `cash_cost`)AS cash_cost
               RIGHT JOIN `purchases_groupdate` ON `cash_cost`.`Date`=`purchases_groupdate`.`Purchase_Date` AND `cash_cost`.`User_ID`=`purchases_groupdate`.`Purchases_User`) AS purchases_table)AS cas_cost_purchases
               LEFT JOIN `purchases_paid_groupdate` ON cas_cost_purchases.Date=`purchases_paid_groupdate`.Purchase_Paid_Date AND  cas_cost_purchases.User_ID=`purchases_paid_groupdate`.Purchases_Paid_User
               UNION
               SELECT * FROM (SELECT 
               (CASE WHEN User_ID IS NULL THEN 
                           CASE WHEN Purchases_User IS NULL THEN 
                                   NULL
                                ELSE Purchases_User END
                  ELSE User_ID END)AS `User_ID`,
                  (CASE WHEN `Date` IS NULL THEN 
                           CASE WHEN Purchase_Date IS NULL THEN 
                                   NULL
                                ELSE Purchase_Date END
                  ELSE `Date` END)AS `Date`,
                  (CASE WHEN Credit IS NULL THEN 0 ELSE Credit END) AS Credit,
                  (CASE WHEN Devit IS NULL THEN 0 ELSE Devit END) AS Devit,
                  (CASE WHEN Cost_Amount IS NULL THEN 0 ELSE Cost_Amount END) AS Cost_Amount,
                  (CASE WHEN Purchases_Total IS NULL THEN 0 ELSE Purchases_Total END) AS Purchases_Total
               FROM (SELECT 
                   *
               FROM (SELECT 
                 (CASE WHEN User_ID IS NULL THEN 
                           CASE WHEN cost_userId IS NULL THEN 
                                   NULL
                                ELSE cost_userId END
                  ELSE User_ID END)AS `User_ID`,
                  (CASE WHEN `Date` IS NULL THEN 
                           CASE WHEN cost_date IS NULL THEN 
                                   NULL
                                ELSE cost_date END
                  ELSE `Date` END)AS `Date`,
                  (CASE WHEN Credit IS NULL THEN 0 ELSE Credit END) AS Credit,
                  (CASE WHEN Devit IS NULL THEN 0 ELSE Devit END) AS Devit,
                  (CASE WHEN Cost_Amount IS NULL THEN 0 ELSE Cost_Amount END) AS Cost_Amount
               FROM (
               SELECT * FROM `cash_groupdate` LEFT JOIN `cost_groupdate` ON `cash_groupdate`.`Date`=`cost_groupdate`.`cost_date`AND `cash_groupdate`.`User_ID`=`cost_groupdate`.`cost_userId`
               UNION 
               SELECT * FROM `cash_groupdate` RIGHT JOIN `cost_groupdate` ON `cash_groupdate`.`Date`=`cost_groupdate`.`cost_date`AND `cash_groupdate`.`User_ID`=`cost_groupdate`.`cost_userId`) AS `cash_cost`)AS cash_cost
               LEFT JOIN `purchases_groupdate` ON `cash_cost`.`Date`=`purchases_groupdate`.`Purchase_Date`AND `cash_cost`.`User_ID`=`purchases_groupdate`.`Purchases_User`
               UNION
               SELECT * FROM (SELECT 
                 (CASE WHEN User_ID IS NULL THEN 
                           CASE WHEN cost_userId IS NULL THEN 
                                   NULL
                                ELSE cost_userId END
                  ELSE User_ID END)AS `User_ID`,
                  (CASE WHEN `Date` IS NULL THEN 
                           CASE WHEN cost_date IS NULL THEN 
                                   NULL
                                ELSE cost_date END
                  ELSE `Date` END)AS `Date`,
                  (CASE WHEN Credit IS NULL THEN 0 ELSE Credit END) AS Credit,
                  (CASE WHEN Devit IS NULL THEN 0 ELSE Devit END) AS Devit,
                  (CASE WHEN Cost_Amount IS NULL THEN 0 ELSE Cost_Amount END) AS Cost_Amount
               FROM (
               SELECT * FROM `cash_groupdate` LEFT JOIN `cost_groupdate` ON `cash_groupdate`.`Date`=`cost_groupdate`.`cost_date`AND `cash_groupdate`.`User_ID`=`cost_groupdate`.`cost_userId`
               UNION 
               SELECT * FROM `cash_groupdate` RIGHT JOIN `cost_groupdate` ON `cash_groupdate`.`Date`=`cost_groupdate`.`cost_date`AND `cash_groupdate`.`User_ID`=`cost_groupdate`.`cost_userId`) AS `cash_cost`)AS cash_cost
               RIGHT JOIN `purchases_groupdate` ON `cash_cost`.`Date`=`purchases_groupdate`.`Purchase_Date`AND `cash_cost`.`User_ID`=`purchases_groupdate`.`Purchases_User`) AS purchases_table)AS cas_cost_purchases
               RIGHT JOIN `purchases_paid_groupdate` ON cas_cost_purchases.Date=`purchases_paid_groupdate`.Purchase_Paid_Date AND  cas_cost_purchases.User_ID=`purchases_paid_groupdate`.Purchases_Paid_User) AS cas_cost_purchases_purchases_paid
               )AS cas_cost_purchases_purchases_paid RIGHT JOIN `sales_groupdate` ON cas_cost_purchases_purchases_paid.`Date`=`sales_groupdate`.`Sales_Date` AND cas_cost_purchases_purchases_paid.`User_ID`=`sales_groupdate`.`Sales_User`)AS
               `c_c_p_p_s`)AS cas_cost_purchases_purchases_paid_sales ) AS cas_cost_purchases_purchases_paid_sales LEFT JOIN `sales_paid_groupdate` ON cas_cost_purchases_purchases_paid_sales.`Date`=`sales_paid_groupdate`.`Sales_Paid_Date` AND cas_cost_purchases_purchases_paid_sales.`User_ID`=`sales_paid_groupdate`.`Sales_Paid_User`
               UNION
               SELECT * FROM(
               SELECT 
               (CASE WHEN User_ID IS NULL THEN 
                           CASE WHEN Sales_User IS NULL THEN 
                                   NULL
                                ELSE Sales_User END
                  ELSE User_ID END)AS `User_ID`,
                  (CASE WHEN `Date` IS NULL THEN 
                           CASE WHEN Sales_Date IS NULL THEN 
                                   NULL
                                ELSE Sales_Date END
                  ELSE `Date` END)AS `Date`,
                  (CASE WHEN Credit IS NULL THEN 0 ELSE Credit END) AS Credit,
                  (CASE WHEN Devit IS NULL THEN 0 ELSE Devit END) AS Devit,
                  (CASE WHEN Cost_Amount IS NULL THEN 0 ELSE Cost_Amount END) AS Cost_Amount,
                  (CASE WHEN Purchases_Total IS NULL THEN 0 ELSE Purchases_Total END) AS Purchases_Total,
                  (CASE WHEN Purchases_Paid IS NULL THEN 0 ELSE Purchases_Paid END) AS Purchases_Paid,
                  (CASE WHEN Purchases_Paid_R IS NULL THEN 0 ELSE Purchases_Paid_R END) AS Purchases_Paid_R,
                  (CASE WHEN Sales_Total IS NULL THEN 0 ELSE Sales_Total END) AS Sales_Total
               FROM(
               SELECT *FROM (SELECT * FROM(
               SELECT 
               (CASE WHEN User_ID IS NULL THEN 
                           CASE WHEN Purchases_Paid_User IS NULL THEN 
                                   NULL
                                ELSE Purchases_Paid_User END
                  ELSE User_ID END)AS `User_ID`,
                  (CASE WHEN `Date` IS NULL THEN 
                           CASE WHEN Purchase_Paid_Date IS NULL THEN 
                                   NULL
                                ELSE Purchase_Paid_Date END
                  ELSE `Date` END)AS `Date`,
                  (CASE WHEN Credit IS NULL THEN 0 ELSE Credit END) AS Credit,
                  (CASE WHEN Devit IS NULL THEN 0 ELSE Devit END) AS Devit,
                  (CASE WHEN Cost_Amount IS NULL THEN 0 ELSE Cost_Amount END) AS Cost_Amount,
                  (CASE WHEN Purchases_Total IS NULL THEN 0 ELSE Purchases_Total END) AS Purchases_Total,
                  (CASE WHEN Paid IS NULL THEN 0 ELSE Paid END) AS Purchases_Paid,
                  (CASE WHEN Paid_R IS NULL THEN 0 ELSE Paid_R END) AS Purchases_Paid_R
               FROM (SELECT * FROM (SELECT 
               (CASE WHEN User_ID IS NULL THEN 
                           CASE WHEN Purchases_User IS NULL THEN 
                                   NULL
                                ELSE Purchases_User END
                  ELSE User_ID END)AS `User_ID`,
                  (CASE WHEN `Date` IS NULL THEN 
                           CASE WHEN Purchase_Date IS NULL THEN 
                                   NULL
                                ELSE Purchase_Date END
                  ELSE `Date` END)AS `Date`,
                  (CASE WHEN Credit IS NULL THEN 0 ELSE Credit END) AS Credit,
                  (CASE WHEN Devit IS NULL THEN 0 ELSE Devit END) AS Devit,
                  (CASE WHEN Cost_Amount IS NULL THEN 0 ELSE Cost_Amount END) AS Cost_Amount,
                  (CASE WHEN Purchases_Total IS NULL THEN 0 ELSE Purchases_Total END) AS Purchases_Total
               FROM (SELECT 
                   *
               FROM (SELECT 
                 (CASE WHEN User_ID IS NULL THEN 
                           CASE WHEN cost_userId IS NULL THEN 
                                   NULL
                                ELSE cost_userId END
                  ELSE User_ID END)AS `User_ID`,
                  (CASE WHEN `Date` IS NULL THEN 
                           CASE WHEN cost_date IS NULL THEN 
                                   NULL
                                ELSE cost_date END
                  ELSE `Date` END)AS `Date`,
                  (CASE WHEN Credit IS NULL THEN 0 ELSE Credit END) AS Credit,
                  (CASE WHEN Devit IS NULL THEN 0 ELSE Devit END) AS Devit,
                  (CASE WHEN Cost_Amount IS NULL THEN 0 ELSE Cost_Amount END) AS Cost_Amount
               FROM (
               SELECT * FROM `cash_groupdate` LEFT JOIN `cost_groupdate` ON `cash_groupdate`.`Date`=`cost_groupdate`.`cost_date`AND `cash_groupdate`.`User_ID`=`cost_groupdate`.`cost_userId`
               UNION 
               SELECT * FROM `cash_groupdate` RIGHT JOIN `cost_groupdate` ON `cash_groupdate`.`Date`=`cost_groupdate`.`cost_date`AND `cash_groupdate`.`User_ID`=`cost_groupdate`.`cost_userId`) AS `cash_cost`)AS cash_cost
               LEFT JOIN `purchases_groupdate` ON `cash_cost`.`Date`=`purchases_groupdate`.`Purchase_Date` AND `cash_cost`.`User_ID`=`purchases_groupdate`.`Purchases_User`
               UNION
               SELECT * FROM (SELECT 
                 (CASE WHEN User_ID IS NULL THEN 
                           CASE WHEN cost_userId IS NULL THEN 
                                   NULL
                                ELSE cost_userId END
                  ELSE User_ID END)AS `User_ID`,
                  (CASE WHEN `Date` IS NULL THEN 
                           CASE WHEN cost_date IS NULL THEN 
                                   NULL
                                ELSE cost_date END
                  ELSE `Date` END)AS `Date`,
                  (CASE WHEN Credit IS NULL THEN 0 ELSE Credit END) AS Credit,
                  (CASE WHEN Devit IS NULL THEN 0 ELSE Devit END) AS Devit,
                  (CASE WHEN Cost_Amount IS NULL THEN 0 ELSE Cost_Amount END) AS Cost_Amount
               FROM (
               SELECT * FROM `cash_groupdate` LEFT JOIN `cost_groupdate` ON `cash_groupdate`.`Date`=`cost_groupdate`.`cost_date` AND `cash_groupdate`.`User_ID`=`cost_groupdate`.`cost_userId`
               UNION 
               SELECT * FROM `cash_groupdate` RIGHT JOIN `cost_groupdate` ON `cash_groupdate`.`Date`=`cost_groupdate`.`cost_date` AND `cash_groupdate`.`User_ID`=`cost_groupdate`.`cost_userId`) AS `cash_cost`)AS cash_cost
               RIGHT JOIN `purchases_groupdate` ON `cash_cost`.`Date`=`purchases_groupdate`.`Purchase_Date` AND `cash_cost`.`User_ID`=`purchases_groupdate`.`Purchases_User`) AS purchases_table)AS cas_cost_purchases
               LEFT JOIN `purchases_paid_groupdate` ON cas_cost_purchases.Date=`purchases_paid_groupdate`.Purchase_Paid_Date AND  cas_cost_purchases.User_ID=`purchases_paid_groupdate`.Purchases_Paid_User
               UNION
               SELECT * FROM (SELECT 
               (CASE WHEN User_ID IS NULL THEN 
                           CASE WHEN Purchases_User IS NULL THEN 
                                   NULL
                                ELSE Purchases_User END
                  ELSE User_ID END)AS `User_ID`,
                  (CASE WHEN `Date` IS NULL THEN 
                           CASE WHEN Purchase_Date IS NULL THEN 
                                   NULL
                                ELSE Purchase_Date END
                  ELSE `Date` END)AS `Date`,
                  (CASE WHEN Credit IS NULL THEN 0 ELSE Credit END) AS Credit,
                  (CASE WHEN Devit IS NULL THEN 0 ELSE Devit END) AS Devit,
                  (CASE WHEN Cost_Amount IS NULL THEN 0 ELSE Cost_Amount END) AS Cost_Amount,
                  (CASE WHEN Purchases_Total IS NULL THEN 0 ELSE Purchases_Total END) AS Purchases_Total
               FROM (SELECT 
                   *
               FROM (SELECT 
                 (CASE WHEN User_ID IS NULL THEN 
                           CASE WHEN cost_userId IS NULL THEN 
                                   NULL
                                ELSE cost_userId END
                  ELSE User_ID END)AS `User_ID`,
                  (CASE WHEN `Date` IS NULL THEN 
                           CASE WHEN cost_date IS NULL THEN 
                                   NULL
                                ELSE cost_date END
                  ELSE `Date` END)AS `Date`,
                  (CASE WHEN Credit IS NULL THEN 0 ELSE Credit END) AS Credit,
                  (CASE WHEN Devit IS NULL THEN 0 ELSE Devit END) AS Devit,
                  (CASE WHEN Cost_Amount IS NULL THEN 0 ELSE Cost_Amount END) AS Cost_Amount
               FROM (
               SELECT * FROM `cash_groupdate` LEFT JOIN `cost_groupdate` ON `cash_groupdate`.`Date`=`cost_groupdate`.`cost_date` AND `cash_groupdate`.`User_ID`=`cost_groupdate`.`cost_userId`
               UNION 
               SELECT * FROM `cash_groupdate` RIGHT JOIN `cost_groupdate` ON `cash_groupdate`.`Date`=`cost_groupdate`.`cost_date` AND `cash_groupdate`.`User_ID`=`cost_groupdate`.`cost_userId`) AS `cash_cost`)AS cash_cost
               LEFT JOIN `purchases_groupdate` ON `cash_cost`.`Date`=`purchases_groupdate`.`Purchase_Date` AND `cash_cost`.`User_ID`=`purchases_groupdate`.`Purchases_User`
               UNION
               SELECT * FROM (SELECT 
                 (CASE WHEN User_ID IS NULL THEN 
                           CASE WHEN cost_userId IS NULL THEN 
                                   NULL
                                ELSE cost_userId END
                  ELSE User_ID END)AS `User_ID`,
                  (CASE WHEN `Date` IS NULL THEN 
                           CASE WHEN cost_date IS NULL THEN 
                                   NULL
                                ELSE cost_date END
                  ELSE `Date` END)AS `Date`,
                  (CASE WHEN Credit IS NULL THEN 0 ELSE Credit END) AS Credit,
                  (CASE WHEN Devit IS NULL THEN 0 ELSE Devit END) AS Devit,
                  (CASE WHEN Cost_Amount IS NULL THEN 0 ELSE Cost_Amount END) AS Cost_Amount
               FROM (
               SELECT * FROM `cash_groupdate` LEFT JOIN `cost_groupdate` ON `cash_groupdate`.`Date`=`cost_groupdate`.`cost_date` AND `cash_groupdate`.`User_ID`=`cost_groupdate`.`cost_userId`
               UNION 
               SELECT * FROM `cash_groupdate` RIGHT JOIN `cost_groupdate` ON `cash_groupdate`.`Date`=`cost_groupdate`.`cost_date` AND `cash_groupdate`.`User_ID`=`cost_groupdate`.`cost_userId`) AS `cash_cost`)AS cash_cost
               RIGHT JOIN `purchases_groupdate` ON `cash_cost`.`Date`=`purchases_groupdate`.`Purchase_Date` AND `cash_cost`.`User_ID`=`purchases_groupdate`.`Purchases_User`) AS purchases_table)AS cas_cost_purchases
               RIGHT JOIN `purchases_paid_groupdate` ON cas_cost_purchases.Date=`purchases_paid_groupdate`.Purchase_Paid_Date AND  cas_cost_purchases.User_ID=`purchases_paid_groupdate`.Purchases_Paid_User) AS cas_cost_purchases_purchases_paid
               )AS cas_cost_purchases_purchases_paid LEFT JOIN `sales_groupdate` ON cas_cost_purchases_purchases_paid.`Date`=`sales_groupdate`.`Sales_Date` AND cas_cost_purchases_purchases_paid.`User_ID`=`sales_groupdate`.`Sales_User`
               UNION
               SELECT * FROM(
               SELECT 
               (CASE WHEN User_ID IS NULL THEN 
                           CASE WHEN Purchases_Paid_User IS NULL THEN 
                                   NULL
                                ELSE Purchases_Paid_User END
                  ELSE User_ID END)AS `User_ID`,
                  (CASE WHEN `Date` IS NULL THEN 
                           CASE WHEN Purchase_Paid_Date IS NULL THEN 
                                   NULL
                                ELSE Purchase_Paid_Date END
                  ELSE `Date` END)AS `Date`,
                  (CASE WHEN Credit IS NULL THEN 0 ELSE Credit END) AS Credit,
                  (CASE WHEN Devit IS NULL THEN 0 ELSE Devit END) AS Devit,
                  (CASE WHEN Cost_Amount IS NULL THEN 0 ELSE Cost_Amount END) AS Cost_Amount,
                  (CASE WHEN Purchases_Total IS NULL THEN 0 ELSE Purchases_Total END) AS Purchases_Total,
                  (CASE WHEN Paid IS NULL THEN 0 ELSE Paid END) AS Purchases_Paid,
                  (CASE WHEN Paid_R IS NULL THEN 0 ELSE Paid_R END) AS Purchases_Paid_R
               FROM (SELECT * FROM (SELECT 
               (CASE WHEN User_ID IS NULL THEN 
                           CASE WHEN Purchases_User IS NULL THEN 
                                   NULL
                                ELSE Purchases_User END
                  ELSE User_ID END)AS `User_ID`,
                  (CASE WHEN `Date` IS NULL THEN 
                           CASE WHEN Purchase_Date IS NULL THEN 
                                   NULL
                                ELSE Purchase_Date END
                  ELSE `Date` END)AS `Date`,
                  (CASE WHEN Credit IS NULL THEN 0 ELSE Credit END) AS Credit,
                  (CASE WHEN Devit IS NULL THEN 0 ELSE Devit END) AS Devit,
                  (CASE WHEN Cost_Amount IS NULL THEN 0 ELSE Cost_Amount END) AS Cost_Amount,
                  (CASE WHEN Purchases_Total IS NULL THEN 0 ELSE Purchases_Total END) AS Purchases_Total
               FROM (SELECT 
                   *
               FROM (SELECT 
                 (CASE WHEN User_ID IS NULL THEN 
                           CASE WHEN cost_userId IS NULL THEN 
                                   NULL
                                ELSE cost_userId END
                  ELSE User_ID END)AS `User_ID`,
                  (CASE WHEN `Date` IS NULL THEN 
                           CASE WHEN cost_date IS NULL THEN 
                                   NULL
                                ELSE cost_date END
                  ELSE `Date` END)AS `Date`,
                  (CASE WHEN Credit IS NULL THEN 0 ELSE Credit END) AS Credit,
                  (CASE WHEN Devit IS NULL THEN 0 ELSE Devit END) AS Devit,
                  (CASE WHEN Cost_Amount IS NULL THEN 0 ELSE Cost_Amount END) AS Cost_Amount
               FROM (
               SELECT * FROM `cash_groupdate` LEFT JOIN `cost_groupdate` ON `cash_groupdate`.`Date`=`cost_groupdate`.`cost_date` AND `cash_groupdate`.`User_ID`=`cost_groupdate`.`cost_userId`
               UNION 
               SELECT * FROM `cash_groupdate` RIGHT JOIN `cost_groupdate` ON `cash_groupdate`.`Date`=`cost_groupdate`.`cost_date` AND `cash_groupdate`.`User_ID`=`cost_groupdate`.`cost_userId`) AS `cash_cost`)AS cash_cost
               LEFT JOIN `purchases_groupdate` ON `cash_cost`.`Date`=`purchases_groupdate`.`Purchase_Date` AND `cash_cost`.`User_ID`=`purchases_groupdate`.`Purchases_User`
               UNION
               SELECT * FROM (SELECT 
                 (CASE WHEN User_ID IS NULL THEN 
                           CASE WHEN cost_userId IS NULL THEN 
                                   NULL
                                ELSE cost_userId END
                  ELSE User_ID END)AS `User_ID`,
                  (CASE WHEN `Date` IS NULL THEN 
                           CASE WHEN cost_date IS NULL THEN 
                                   NULL
                                ELSE cost_date END
                  ELSE `Date` END)AS `Date`,
                  (CASE WHEN Credit IS NULL THEN 0 ELSE Credit END) AS Credit,
                  (CASE WHEN Devit IS NULL THEN 0 ELSE Devit END) AS Devit,
                  (CASE WHEN Cost_Amount IS NULL THEN 0 ELSE Cost_Amount END) AS Cost_Amount
               FROM (
               SELECT * FROM `cash_groupdate` LEFT JOIN `cost_groupdate` ON `cash_groupdate`.`Date`=`cost_groupdate`.`cost_date` AND `cash_groupdate`.`User_ID`=`cost_groupdate`.`cost_userId`
               UNION 
               SELECT * FROM `cash_groupdate` RIGHT JOIN `cost_groupdate` ON `cash_groupdate`.`Date`=`cost_groupdate`.`cost_date` AND `cash_groupdate`.`User_ID`=`cost_groupdate`.`cost_userId`) AS `cash_cost`)AS cash_cost
               RIGHT JOIN `purchases_groupdate` ON `cash_cost`.`Date`=`purchases_groupdate`.`Purchase_Date` AND `cash_cost`.`User_ID`=`purchases_groupdate`.`Purchases_User`) AS purchases_table)AS cas_cost_purchases
               LEFT JOIN `purchases_paid_groupdate` ON cas_cost_purchases.Date=`purchases_paid_groupdate`.Purchase_Paid_Date AND  cas_cost_purchases.User_ID=`purchases_paid_groupdate`.Purchases_Paid_User
               UNION
               SELECT * FROM (SELECT 
               (CASE WHEN User_ID IS NULL THEN 
                           CASE WHEN Purchases_User IS NULL THEN 
                                   NULL
                                ELSE Purchases_User END
                  ELSE User_ID END)AS `User_ID`,
                  (CASE WHEN `Date` IS NULL THEN 
                           CASE WHEN Purchase_Date IS NULL THEN 
                                   NULL
                                ELSE Purchase_Date END
                  ELSE `Date` END)AS `Date`,
                  (CASE WHEN Credit IS NULL THEN 0 ELSE Credit END) AS Credit,
                  (CASE WHEN Devit IS NULL THEN 0 ELSE Devit END) AS Devit,
                  (CASE WHEN Cost_Amount IS NULL THEN 0 ELSE Cost_Amount END) AS Cost_Amount,
                  (CASE WHEN Purchases_Total IS NULL THEN 0 ELSE Purchases_Total END) AS Purchases_Total
               FROM (SELECT 
                   *
               FROM (SELECT 
                 (CASE WHEN User_ID IS NULL THEN 
                           CASE WHEN cost_userId IS NULL THEN 
                                   NULL
                                ELSE cost_userId END
                  ELSE User_ID END)AS `User_ID`,
                  (CASE WHEN `Date` IS NULL THEN 
                           CASE WHEN cost_date IS NULL THEN 
                                   NULL
                                ELSE cost_date END
                  ELSE `Date` END)AS `Date`,
                  (CASE WHEN Credit IS NULL THEN 0 ELSE Credit END) AS Credit,
                  (CASE WHEN Devit IS NULL THEN 0 ELSE Devit END) AS Devit,
                  (CASE WHEN Cost_Amount IS NULL THEN 0 ELSE Cost_Amount END) AS Cost_Amount
               FROM (
               SELECT * FROM `cash_groupdate` LEFT JOIN `cost_groupdate` ON `cash_groupdate`.`Date`=`cost_groupdate`.`cost_date` AND `cash_groupdate`.`User_ID`=`cost_groupdate`.`cost_userId`
               UNION 
               SELECT * FROM `cash_groupdate` RIGHT JOIN `cost_groupdate` ON `cash_groupdate`.`Date`=`cost_groupdate`.`cost_date` AND `cash_groupdate`.`User_ID`=`cost_groupdate`.`cost_userId`) AS `cash_cost`)AS cash_cost
               LEFT JOIN `purchases_groupdate` ON `cash_cost`.`Date`=`purchases_groupdate`.`Purchase_Date` AND `cash_cost`.`User_ID`=`purchases_groupdate`.`Purchases_User`
               UNION
               SELECT * FROM (SELECT 
                 (CASE WHEN User_ID IS NULL THEN 
                           CASE WHEN cost_userId IS NULL THEN 
                                   NULL
                                ELSE cost_userId END
                  ELSE User_ID END)AS `User_ID`,
                  (CASE WHEN `Date` IS NULL THEN 
                           CASE WHEN cost_date IS NULL THEN 
                                   NULL
                                ELSE cost_date END
                  ELSE `Date` END)AS `Date`,
                  (CASE WHEN Credit IS NULL THEN 0 ELSE Credit END) AS Credit,
                  (CASE WHEN Devit IS NULL THEN 0 ELSE Devit END) AS Devit,
                  (CASE WHEN Cost_Amount IS NULL THEN 0 ELSE Cost_Amount END) AS Cost_Amount
               FROM ( 
               SELECT * FROM `cash_groupdate` LEFT JOIN `cost_groupdate` ON `cash_groupdate`.`Date`=`cost_groupdate`.`cost_date` AND `cash_groupdate`.`User_ID`=`cost_groupdate`.`cost_userId`
               UNION 
               SELECT * FROM `cash_groupdate` RIGHT JOIN `cost_groupdate` ON `cash_groupdate`.`Date`=`cost_groupdate`.`cost_date` AND `cash_groupdate`.`User_ID`=`cost_groupdate`.`cost_userId`) AS `cash_cost`)AS cash_cost
               RIGHT JOIN `purchases_groupdate` ON `cash_cost`.`Date`=`purchases_groupdate`.`Purchase_Date` AND `cash_cost`.`User_ID`=`purchases_groupdate`.`Purchases_User`) AS purchases_table)AS cas_cost_purchases
               RIGHT JOIN `purchases_paid_groupdate` ON cas_cost_purchases.Date=`purchases_paid_groupdate`.Purchase_Paid_Date AND  cas_cost_purchases.User_ID=`purchases_paid_groupdate`.Purchases_Paid_User) AS cas_cost_purchases_purchases_paid
               )AS cas_cost_purchases_purchases_paid RIGHT JOIN `sales_groupdate` ON cas_cost_purchases_purchases_paid.`Date`=`sales_groupdate`.`Sales_Date` AND cas_cost_purchases_purchases_paid.`User_ID`=`sales_groupdate`.`Sales_User`)AS
               `c_c_p_p_s`)AS cas_cost_purchases_purchases_paid_sales ) AS cas_cost_purchases_purchases_paid_sales RIGHT JOIN `sales_paid_groupdate` ON cas_cost_purchases_purchases_paid_sales.`Date`=`sales_paid_groupdate`.`Sales_Paid_Date` AND cas_cost_purchases_purchases_paid_sales.`User_ID`=`sales_paid_groupdate`.`Sales_Paid_User`)AS ccppss)AS
               cas_cost_purchases_purchasespaid_sales_salespaid              
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
        DB::statement('DROP VIEW IF EXISTS  `shooping_project`.`totalAmmount` ');
    }
}
