<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class apprentice extends Model
{
    use HasFactory;

    //aprendiz pertenece a un curso y tiene asignado un computador
    public function course() {
        return $this->belongsTo(Course::class);
    }

    public function computer() {
        return $this->belongsTo(Computer::class);
    }
}
