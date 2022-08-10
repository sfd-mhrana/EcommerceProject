<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Total_Account extends Model
{ 
    use HasFactory; 
    public $table='totalAmmount';
    public $fillable=['User_ID','Date','Credit','Devit','Cost_Amount','Purchases_Total','Purchases_Paid','Purchases_Paid_R'
    ,'Sales_Total','Sales_Paid','Sales_Paid_R'];
}
