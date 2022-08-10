<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class SalesGroupdate extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::statement("
        CREATE VIEW `shooping_project`.`sales_groupdate` 
                AS
            (
            SELECT
            `Product_Sales`.`User_ID`    AS `Sales_User`,
            `Product_Sales`.`Sales_Date` AS `Sales_Date`,
            SUM(`Product_Sales`.`Total_Price`) AS `Sales_Total`
            FROM `Product_Sales`
            GROUP BY `Product_Sales`.`Sales_Date`, `Product_Sales`.`User_ID`
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
        DB::statement('DROP VIEW IF EXISTS `shooping_project`.`sales_groupdate` ');
    }
}
