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
            // Current position tracking
            $table->decimal('current_latitude', 10, 7)->nullable()->after('end_lng');
            $table->decimal('current_longitude', 10, 7)->nullable()->after('current_latitude');
            $table->decimal('current_speed', 5, 2)->nullable()->after('current_longitude');
            $table->decimal('current_heading', 5, 2)->nullable()->after('current_speed');
            $table->timestamp('position_updated_at')->nullable()->after('current_heading');
            
            // Add wallet balance to users (will be in separate migration)
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('rides', function (Blueprint $table) {
            $table->dropColumn([
                'current_latitude',
                'current_longitude',
                'current_speed',
                'current_heading',
                'position_updated_at'
            ]);
        });
    }
};
