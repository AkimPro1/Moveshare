<?php
require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use Illuminate\Support\Facades\DB;
use App\Models\User;

try {
    $sum = DB::table('payments')->sum('amount');
    echo "Sum type: " . gettype($sum) . "\n";
    echo "Sum value: " . json_encode($sum) . "\n";
    
    $stats = [
        'users_count' => User::count(),
        'total_revenue' => $sum ?? 0,
    ];
    echo "JSON encoded: " . json_encode($stats) . "\n";
} catch (\Exception $e) {
    echo "Error: " . $e->getMessage() . "\n";
}
