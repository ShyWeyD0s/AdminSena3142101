<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Teacher extends Model // Nombre de clase en PascalCase
{
    use HasFactory;

    // Un profesor pertenece a una sola área
    public function area()
    {
        return $this->belongsTo(Area::class); // Sintaxis limpia usando ::class
    }

 
}
