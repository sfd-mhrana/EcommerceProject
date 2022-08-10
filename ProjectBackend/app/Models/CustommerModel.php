<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
 
class CustommerModel extends Model
{
    use HasFactory;
    public $table='Customer';
    public $fillable=['User_ID','Custommer_Name','Company_Name','Mobile','Custommer_Image','Address'];
}
