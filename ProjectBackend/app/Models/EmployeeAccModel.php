<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EmployeeAccModel extends Model
{
    use HasFactory;
    public $table='EmployeeAcc';
    public $fillable=['User_ID','Employee_ID','Amount','Type','Date'];

    public function employee(){ 
        return $this->belongsTo(EmployeeModel::class,'Employee_ID','Employee_ID');
    }
}
