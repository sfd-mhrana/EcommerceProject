<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class SalesPaidGroupdate extends Migration
{ 
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::statement("
        CREATE VIEW `shooping_project`.`sales_paid_groupdate` 
                AS
            (
                SELECT
                `sales_paid`.`Sales_Paid_User` AS `Sales_Paid_User`,
                `sales_paid`.`Sales_Paid_Date` AS `Sales_Paid_Date`,
                SUM(`sales_paid`.`Paid`)       AS `Paid`,
                SUM(`sales_paid`.`Paid_R`)     AS `Paid_R`
              FROM (SELECT
                      `shooping_project`.`Sales_Account`.`User_ID`    AS `Sales_Paid_User`,
                      `shooping_project`.`Sales_Account`.`Sales_Date` AS `Sales_Paid_Date`,
                      (CASE WHEN (`shooping_project`.`Sales_Account`.`Paid` >= 0) THEN `shooping_project`.`Sales_Account`.`Paid` ELSE 0 END) AS `Paid`,
                      (CASE WHEN (`shooping_project`.`Sales_Account`.`Paid` < 0) THEN `shooping_project`.`Sales_Account`.`Paid` ELSE 0 END) AS `Paid_R`
                    FROM `shooping_project`.`Sales_Account`) `sales_paid`
              GROUP BY `sales_paid`.`Sales_Paid_Date`,`sales_paid`.`Sales_Paid_User`
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
        DB::statement('DROP VIEW IF EXISTS `shooping_project`.`sales_paid_groupdate`');
    }
}
