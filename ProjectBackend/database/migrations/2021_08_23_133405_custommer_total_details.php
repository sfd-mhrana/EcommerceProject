<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class CustommerTotalDetails extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::statement("
        CREATE VIEW `shooping_project`.`CustommerTotalDetails` 
                AS
            (
                SELECT
                `User_ID`,
                `Company_Name` as Company_Name,
                `Sales_Date`,
                `Invoice_No`,
               SUM( `Total_Amount`) AS Total_Amount
              FROM `shooping_project`.`Sales_Account` GROUP BY User_ID,Company_Name,Sales_Date,Invoice_No
            
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
        DB::statement('DROP VIEW IF EXISTS  `shooping_project`.`CustommerTotalDetails`');
    }
}
