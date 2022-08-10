<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class UserCart extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up() 
    {
        Schema::create('Cart', function (Blueprint $table) {
            $table->id()->autoIncrement();
            $table->string('PUser_ID');
            $table->string('SUser_ID');
            $table->string('Invoice_No');
            $table->string('Product_Id');
            $table->date('OderDate');
            $table->date('DaliveryDate');
            $table->double('Quantaty');
            $table->double('Sales_Price');
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
        Schema::drop('Cart');
    }
}
