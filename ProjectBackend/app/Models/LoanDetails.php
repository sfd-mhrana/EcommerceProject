<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
 
class LoanDetails extends Model
{
    use HasFactory;
    public $table='LoanDetails';
    public $fillable=['User_ID','LoanID','DATE','Amount','STATUS'];

}
