<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class PurchasesPaidGroupdate extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::statement("
        CREATE VIEW `shooping_project`.`purchases_paid_groupdate` 
                AS
            (
                SELECT
                `saf`.`Purchases_Paid_User` AS `Purchases_Paid_User`,
                `saf`.`Purchase_Paid_Date`  AS `Purchase_Paid_Date`,
                SUM(`saf`.`Paid`)           AS `Paid`,
                SUM(`saf`.`Paid_R`)         AS `Paid_R`
              FROM (SELECT
                      `shooping_project`.`Product_Account`.`User_ID`       AS `Purchases_Paid_User`,
                      `shooping_project`.`Product_Account`.`Purchase_Date` AS `Purchase_Paid_Date`,
                      (CASE WHEN (`shooping_project`.`Product_Account`.`Paid` >= 0) THEN `shooping_project`.`Product_Account`.`Paid` ELSE 0 END) AS `Paid`,
                      (CASE WHEN (`shooping_project`.`Product_Account`.`Paid` < 0) THEN `shooping_project`.`Product_Account`.`Paid` ELSE 0 END) AS `Paid_R`
                    FROM `shooping_project`.`Product_Account`) `saf`
              GROUP BY `saf`.`Purchase_Paid_Date`,`saf`.`Purchases_Paid_User`
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
        DB::statement('DROP VIEW IF EXISTS `shooping_project`.`purchases_paid_groupdate`');
    }
}
