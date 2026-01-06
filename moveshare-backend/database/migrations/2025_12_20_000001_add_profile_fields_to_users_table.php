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
        Schema::table('users', function (Blueprint $table) {
            $table->string('profile_photo')->nullable()->after('role');
            $table->text('bio')->nullable()->after('profile_photo');
            $table->string('city')->nullable()->after('bio');
            $table->decimal('average_rating', 3, 2)->default(0)->after('city');
            $table->integer('total_reviews')->default(0)->after('average_rating');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['profile_photo', 'bio', 'city', 'average_rating', 'total_reviews']);
        });
    }
};