<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
 
class InvestmentModel extends Model
{
    use HasFactory;
    public $table='InvestMent';
    public $fillable=['User_ID','Date','Amount','Parson_Name'];
}
