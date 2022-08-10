<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CashAccount extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('Cash', function (Blueprint $table) {
            $table->id()->autoIncrement();
            $table->string('User_ID');
            $table->date('Date');
            $table->double('Amount');
            $table->string('Status');
            $table->string('Details');
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
        Schema::drop('Cash');
    }
}
