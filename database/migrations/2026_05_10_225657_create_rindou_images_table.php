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
        Schema::create('rindou_images', function (Blueprint $table) {
            $table->id();
            $table->foreignId('rindou_id')->constrained()->onDelete('cascade');
            $table->integer('position')->nullable();
            $table->text('thumbnail')->nullable();
            $table->text('original')->nullable();
            $table->text('link')->nullable();
            $table->text('title')->nullable();
            $table->string('source')->nulable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('rindou_images');
    }
};
