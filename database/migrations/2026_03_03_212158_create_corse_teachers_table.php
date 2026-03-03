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
        Schema::create('corse_teachers', function (Blueprint $table) {
            $table->id(); // PK
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
        Schema::dropIfExists('corse_teachers');
    }
};
