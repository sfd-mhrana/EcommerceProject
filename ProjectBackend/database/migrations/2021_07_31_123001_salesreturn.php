<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class Salesreturn extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('Product_Sales_Return', function (Blueprint $table) {
            $table->id()->autoIncrement();
            $table->string('User_ID');
            $table->string('Company_Name');
            $table->string('Invoice_No');
            $table->string('Category_Id');
            $table->string('Product_Id');
            $table->date('Return_Date');
            $table->integer('GRN');
            $table->double('Quantaty');
            $table->double('Sales_Price');
            $table->double('Total_Price');
            $table->string('SR_ID');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('Product_Sales_Return');
    }
}
