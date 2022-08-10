<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class bankmodel extends Model
{
    use HasFactory;
    public $table='bank';
    public $fillable=['User_ID','bank_name','account_number','bank_type'];
    
}
