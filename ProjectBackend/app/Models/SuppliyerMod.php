<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SuppliyerMod extends Model
{ 
    use HasFactory; 
    public $table='Supplier';
    public $fillable=['User_ID','Suppliyer_Name','Company_Name','Mobile','Suppliyer_Image','Address'];
}
