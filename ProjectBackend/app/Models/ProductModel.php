<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory; 
use Illuminate\Database\Eloquent\Model;

class ProductModel extends Model
{
    use HasFactory;
    public $table='Products';
    public $fillable=['User_ID','Product_ID','Product_Category_ID','Product_Name','Producut_Images','Producut_Details','Producut_Price'];
 
    public function category(){
        return $this->belongsTo(CategoryModel::class,'Product_Category_ID','id');
    }
    
} 
