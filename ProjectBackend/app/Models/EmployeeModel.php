<?php

namespace App\Models;
 
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EmployeeModel extends Model
{ 
    use HasFactory; 
    public $table='Employee';
    public $fillable=['User_ID','Employee_ID','Employee_Name','Mobile','Position','Employee_Image','Salary','Address'];

    function allCosting(){
        return $this->hasMany(EmployeeAccModel::class,'Employee_ID','Employee_ID');
    }

    function sales(){
        return $this->hasMany(salesModel::class ,'SR_ID','Employee_ID')->with(['productGRN']);
    }

}
