<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Bank_Account_Group extends Model
{
    use HasFactory;
    public $table='bank_account_group';
    public $fillable=['User_ID','bank_id','date','Credit','Devit'];

    public function bankdetails(){
        return $this->belongsTo(bankmodel::class,'bank_id','id');
    }
}
