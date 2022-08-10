<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CategoryModel extends Model
{
    use HasFactory;
    
    public $table='Category';
    public $fillable=['id','User_ID','Name'];

    public function products(){
        return $this->hasMany(Products::class);
    }
}
