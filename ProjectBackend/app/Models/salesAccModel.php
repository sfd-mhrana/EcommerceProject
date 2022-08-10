<?php

namespace App\Models;

use Employee;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class salesAccModel extends Model
{
    use HasFactory;
    
    public $table='Sales_Account';
    public $fillable=['User_ID','Company_Name','Invoice_No','Sales_Date','Total_Item','Total_Amount','Discount','Paid','SR_ID'];


    public function invoiceProduct(){
        return $this->hasMany(salesModel::class,'Invoice_No','Invoice_No');
    }

    public function employee(){
        return $this->hasMany(EmployeeModel::class,'Employee_ID','SR_ID');
    }
}
