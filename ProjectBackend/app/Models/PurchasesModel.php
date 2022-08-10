<?php

namespace App\Models; 

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PurchasesModel extends Model
{
    use HasFactory;  
    public $table='Product_Purchase';
    public $fillable=['User_ID','Company_Name','Invoice_No','Category_Id','Product_Id','Purchase_Date','Quantaty','Producut_Price','Total_Price'];

    public function category(){
        return $this->belongsTo(CategoryModel::class,'Category_Id','id');
    }
    public function product(){ 
        return $this->belongsTo(ProductModel::class,'Product_Id','Product_ID')->with(['category']);
    }
}
