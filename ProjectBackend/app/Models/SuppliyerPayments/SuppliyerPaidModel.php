<?php

namespace App\Models\SuppliyerPayments;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SuppliyerPaidModel extends Model
{ 
    use HasFactory;
    public $table='SuppliyerPaidDetails';
    public $fillable=['User_ID','Company_Name','Purchase_Date','Discount','Paid'];

    public function invoices(){
        return $this->hasMany(SuppliyerTotalModel::class,'Purchase_Date','Purchase_Date','Company_Name','Company_Name');
    }
}
