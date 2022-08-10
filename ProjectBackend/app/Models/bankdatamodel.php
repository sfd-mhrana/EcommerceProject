<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class bankdatamodel extends Model
{
    use HasFactory;
    public $table='bank_data';
    public $fillable=['id','User_ID','bank_id','details','amount','date','status','type'];

    public function bankdetails(){
        return $this->belongsTo(bankmodel::class,'bank_id','id');
    }
}
