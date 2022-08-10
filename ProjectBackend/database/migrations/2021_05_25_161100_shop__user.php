<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class ShopUser extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('Shop_User_Panel', function (Blueprint $table) {
            $table->id()->autoIncrement();
            $table->string('User_ID');
            $table->string('Shop_Name');
            $table->string('Owner_Name');
            $table->string('Owner_Image');
            $table->string('Shop_Address');
            $table->string('email');
            $table->string('password');
            $table->string('Mobile'); 
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
        Schema::drop('Shop_User_Panel');
    }
}
