<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class PurchaseAccount extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('Product_Account', function (Blueprint $table) {
            $table->id()->autoIncrement();
            $table->string('User_ID');
            $table->string('Company_Name');
            $table->string('Invoice_No');
            $table->date('Purchase_Date');
            $table->double('Total_Item');
            $table->double('Total_Amount');
            $table->double('Discount');
            $table->double('Paid');
            $table->string('Status');
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
        Schema::drop('Product_Account');
    }
}
