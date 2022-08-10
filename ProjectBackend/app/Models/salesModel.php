<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class salesModel extends Model
{
    use HasFactory;  
    public $table='Product_Sales';
    
    public $fillable=['User_ID','Company_Name','Invoice_No','Category_Id','Product_Id','Sales_Date','GRN','Quantaty','Sales_Price','Total_Price','SR_ID'];
    
    public function category(){
        return $this->belongsTo(CategoryModel::class,'Category_Id','id');
    }
    public function product(){ 
        return $this->belongsTo(ProductModel::class,'Product_Id','Product_ID')->with(['category']);
    }
    public function productGRN(){
        return $this->belongsTo(PurchasesModel::class,'GRN','id');
    }
    public function employee(){ 
        return $this->belongsTo(EmployeeModel::class,'SR_ID','Employee_ID');
    }
}
