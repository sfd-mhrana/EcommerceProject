<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class CustommerPaidDetails extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::statement("
        CREATE VIEW `shooping_project`.`CustommerPaidDetails` 
                AS
            (
                SELECT
                `User_ID`,
                `Company_Name` as Company_Name,
                `Sales_Date`, 
                SUM(`Total_Amount`) AS Total_Amount,
                SUM(`Discount`) AS Discount,
                SUM(`Paid`)AS Paid
              FROM `shooping_project`.`Sales_Account` GROUP BY User_ID,Company_Name,Sales_Date
            
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
        DB::statement('DROP VIEW IF EXISTS  `shooping_project`.`CustommerPaidDetails`');
    }
}
