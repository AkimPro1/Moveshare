<?php
require 'vendor/autoload.php';
$app = require_once 'bootstrap/app.php';
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

use App\Models\Vehicle;

$vehicles = Vehicle::all();
foreach($vehicles as $v) {
    echo $v->brand . ' ' . $v->model . ': ' . json_encode($v->photos) . PHP_EOL;
}
