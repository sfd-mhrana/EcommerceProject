<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class CostGroupdate extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {       //     SELECT
            //     `ShopCost`.`User_ID` AS `cost_userId`,
            //     `ShopCost`.`Date`    AS `cost_date`,
            //     SUM(`ShopCost`.`Amount`) AS `Cost_Amount`
            //   FROM `ShopCost`
            //   GROUP BY `ShopCost`.`Date`,`cost_userId`


        DB::statement("
        CREATE VIEW `shooping_project`.`cost_groupdate` 
                AS
            (
            
            SELECT User_ID AS `cost_userId`,`Date`AS `cost_date`,(CAmount+EAmount) AS`Cost_Amount` FROM(
                SELECT 
                    (CASE WHEN CUser_ID IS NULL THEN 
                        CASE WHEN User_ID IS NULL THEN
                            'Null'
                        ELSE User_ID END
                    ELSE CUser_ID END
                    )AS User_ID,
                    (CASE WHEN CDate IS NULL THEN 
                        CASE WHEN EDate IS NULL THEN
                            'Null'
                        ELSE EDate END
                    ELSE CDate END
                    )AS `Date`,
                    (CASE WHEN CAmount IS NULL THEN 0 ELSE CAmount END) AS CAmount,
                    (CASE WHEN EAmount IS NULL THEN 0 ELSE EAmount END) AS EAmount
                    FROM(
                SELECT * FROM (SELECT `User_ID` AS `CUser_ID`,
                    `Date`    AS `CDate`,
                 SUM(`Amount`) AS `CAmount`
                 FROM `ShopCost`GROUP BY  `CDate`,`CUser_ID`) AS costtable
                 LEFT JOIN (
                SELECT
                  `User_ID`,
                 SUM(`Amount`) AS `EAmount`,
                  `Date` AS  `EDate`
                FROM `shooping_project`.`EmployeeAcc` GROUP BY  `EDate`,`User_ID`) AS employee ON costtable.CDate=employee.EDate
                UNION
                SELECT * FROM (SELECT `User_ID` AS `CUser_ID`,
                    `Date`    AS `CDate`,
                 SUM(`Amount`) AS `CAmount`
                 FROM `ShopCost`GROUP BY  `CDate`,`CUser_ID`) AS costtable
                 RIGHT JOIN (
                SELECT
                  `User_ID`,
                 SUM(`Amount`) AS `EAmount`,
                  `Date` AS  `EDate`
                FROM `shooping_project`.`EmployeeAcc` GROUP BY  `EDate`,`User_ID`) AS employee ON costtable.CDate=employee.EDate) AS last_cost) AS costtable


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
        DB::statement('DROP VIEW IF EXISTS `shooping_project`.`cost_groupdate` ');
    }
}
