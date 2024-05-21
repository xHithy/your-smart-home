<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class () extends Migration {
    public function up(): void
    {
        Schema::create('humidities', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('sub_section_id');
            $table->float('value')->nullable();
            $table->integer('timestamp');

            $table->foreign('sub_section_id')->references('id')->on('sub_sections')->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('humidities');
    }
};
