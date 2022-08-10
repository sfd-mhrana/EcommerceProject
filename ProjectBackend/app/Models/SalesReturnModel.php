<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SalesReturnModel extends Model
{
    use HasFactory;
    public $table='Product_Sales_Return';
    public $fillable=['User_ID','Company_Name','Invoice_No','Category_Id','Product_Id','Return_Date','GRN','Quantaty','Sales_Price','Total_Price','SR_ID'];
    
}
