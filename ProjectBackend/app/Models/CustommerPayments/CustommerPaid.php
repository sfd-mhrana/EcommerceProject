<?php

namespace App\Models\CustommerPayments;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CustommerPaid extends Model
{ 
    use HasFactory;
    public $table='CustommerPaidDetails';
    public $fillable=['User_ID','Company_Name','Sales_Date','Discount','Paid'];

    public function invoices(){
        return $this->hasMany(CustommerTotal::class,'Sales_Date', 'Sales_Date','Company_Name','Company_Name') ;
    }
}
