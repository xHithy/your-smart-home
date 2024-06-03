<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class () extends Migration {
    public function up(): void
    {
        Schema::create('settings', function (Blueprint $table) {
            $table->id();
            $table->string('house_name');
            $table->string('humidity_color');
            $table->string('temperature_color');
            $table->integer('last_edited_at')->default(time());
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('settings');
    }
};
