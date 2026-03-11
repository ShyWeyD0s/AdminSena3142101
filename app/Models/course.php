<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
    use HasFactory;

    protected $fillable = ['course_number', 'day', 'area_id', 'training_center_id'];

    public function training_center()
    {
        return $this->belongsTo(TrainingCenter::class);
    }

    public function area()
    {
        return $this->belongsTo(Area::class);
    }

    public function apprentices()
    {
        return $this->hasMany(Apprentice::class);
    }
}
