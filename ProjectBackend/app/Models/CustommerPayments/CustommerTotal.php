<?php

namespace App\Models\CustommerPayments;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
 
class CustommerTotal extends Model
{
    use HasFactory;
    public $table='CustommerTotalDetails';
    public $fillable=['User_ID','Company_Name','Invoice_No','Sales_Date','Total_Amount'];
    
}
