<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PurchasesAccModel extends Model
{ 
    use HasFactory;
    public $table='Product_Account';
    public $fillable=['User_ID','Company_Name','Invoice_No','Purchase_Date','Total_Item','Total_Amount','Discount','Paid'];

    public function invoiceProduct(){
        return $this->hasMany(PurchasesModel::class,'Company_Name','Company_Name');
    }

}
