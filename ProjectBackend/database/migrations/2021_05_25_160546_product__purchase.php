<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class ProductPurchase extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('Product_Purchase', function (Blueprint $table) {
            $table->id()->autoIncrement();
            $table->string('User_ID');
            $table->string('Company_Name');
            $table->string('Invoice_No');
            $table->string('Category_Id');
            $table->string('Product_Id');
            $table->date('Purchase_Date');
            $table->double('Quantaty');
            $table->double('Producut_Price');
            $table->double('Total_Price');
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
        Schema::drop('Product_Purchase');
    }
}
