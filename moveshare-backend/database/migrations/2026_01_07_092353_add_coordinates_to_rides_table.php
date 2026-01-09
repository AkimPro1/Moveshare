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
        Schema::table('rides', function (Blueprint $table) {
            $table->decimal('start_lat', 10, 7)->nullable()->after('start_location');
            $table->decimal('start_lng', 10, 7)->nullable()->after('start_lat');
            $table->decimal('end_lat', 10, 7)->nullable()->after('end_location');
            $table->decimal('end_lng', 10, 7)->nullable()->after('end_lat');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('rides', function (Blueprint $table) {
            $table->dropColumn(['start_lat', 'start_lng', 'end_lat', 'end_lng']);
        });
    }
};
