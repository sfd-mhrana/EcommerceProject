<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CostingModel extends Model
{ 
    use HasFactory;
    public $table='ShopCost';
    public $fillable=['User_ID','Date','Amount','Status','Details'];
}
