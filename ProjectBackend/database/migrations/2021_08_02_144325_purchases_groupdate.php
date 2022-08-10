<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class PurchasesGroupdate extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::statement("
        CREATE VIEW `shooping_project`.`purchases_groupdate` 
                AS
            (
                SELECT
                `Product_Purchase`.`User_ID`       AS `Purchases_User`,
                `Product_Purchase`.`Purchase_Date` AS `Purchase_Date`,
                SUM(`Product_Purchase`.`Total_Price`) AS `Purchases_Total`
              FROM `Product_Purchase`
              GROUP BY `Product_Purchase`.`Purchase_Date`,  `Product_Purchase`.`User_ID` 
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
        DB::statement('DROP VIEW IF EXISTS `shooping_project`.`purchases_groupdate` ');
    }
}
