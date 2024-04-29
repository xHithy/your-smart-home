<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class () extends Migration {
    public function up(): void
    {
        Schema::create('sensors', function (Blueprint $table) {
            $table->id();
            $table->string('sensor_name');
            $table->string('sensor_token');
            $table->boolean('authorized');
            $table->integer('last_auth_attempt');
            $table->integer('last_data_update')->nullable();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('sensors');
    }
};
