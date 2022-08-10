<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StockView extends Model
{ 
    use HasFactory; 
    public $table='StockListView';
    public $fillable=['User_ID','Category_Id','pQuantaty','sQuantaty','Quantaty','Product_Name','Producut_Images','Producut_Details','Producut_Price','Name'];
}
