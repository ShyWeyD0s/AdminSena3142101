<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Area extends Model
{
    use HasFactory;

    protected $fillable = ['name'];

    public function teachers()
    {
        return $this->hasMany(Teacher::class);
    }

    public function courses()
    {
        return $this->hasMany(Course::class);
    }
}
