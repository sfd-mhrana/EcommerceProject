<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderList extends Model
{
    use HasFactory;
    public $table='Cart'; 
    public $fillable=['PUser_ID','SUser_ID','Invoice_No','Product_Id'
    ,'OderDate','DaliveryDate','Quantaty','Sales_Price','Total_Price'];

    public function product(){ 
        return $this->belongsTo(ProductModel::class,'Product_Id','Product_ID')->with(['category']);
    }
}
