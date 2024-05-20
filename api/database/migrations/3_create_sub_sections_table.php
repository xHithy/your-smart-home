<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class () extends Migration {
    public function up(): void
    {
        Schema::create('sub_sections', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->unsignedBigInteger('section_id');
            $table->unsignedBigInteger('category_id');
            $table->boolean('pinned')->default(0);
            $table->timestamps();

            $table->foreign('section_id')->references('id')->on('sections')->onDelete('cascade');
            $table->foreign('category_id')->references('id')->on('sub_section_categories')->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('sub_sections');
    }
};
