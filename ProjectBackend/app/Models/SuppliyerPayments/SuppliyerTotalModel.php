<?php

namespace App\Models\SuppliyerPayments;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
 
class SuppliyerTotalModel extends Model
{
    use HasFactory;
    public $table='SuppliyerTotalDetails';
    public $fillable=['User_ID','Company_Name','Invoice_No','Purchase_Date','Total_Amount'];

}
