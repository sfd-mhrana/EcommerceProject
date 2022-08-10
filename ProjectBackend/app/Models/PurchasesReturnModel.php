<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PurchasesReturnModel extends Model
{
    use HasFactory;  
    public $table='Product_Purchase_Return';
    public $fillable=['User_ID','Company_Name','Invoice_No','Category_Id','Product_Id','Return_Date','Return_Quantaty','Producut_Price','Total_Price'];

}
