<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
public function up(): void
{
    Schema::create('teachers', function (Blueprint $table) {
        // Corrección: define la columna manualmente como PK
        $table->id();
        $table->string('name');
        $table->string('email');
        
        // FKs
        $table->foreignId('area_id')->constrained('areas');
        $table->foreignId('training_center_id')->constrained('training_centers');
        
        $table->timestamps();
    });
}
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('teachers');
    }
};
