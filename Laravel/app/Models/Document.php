<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Document extends Model
{
    use HasFactory;

    protected $fillable = ['filename', 'user_id'];

    public function reportovi(){
        return $this->hasMany(Report::class);
    }

    public function user(){
        return $this->belongsTo(User::class);
    }
}
