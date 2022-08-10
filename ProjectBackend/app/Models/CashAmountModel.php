<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CashAmountModel extends Model
{
    use HasFactory;
    public $table='Cash';
    public $fillable=['User_ID','Status','Amount','Details','Date'];
}
