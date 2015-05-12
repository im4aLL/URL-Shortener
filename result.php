<?php
header('content-type: application/json; charset=utf-8');
header("access-control-allow-origin: *");

require_once(__DIR__.'/settings.php');
require_once(__DIR__.'/shorten.php');

$long_path = 'http://habibhadi.com';

$shorten = new Bitly;
$shorten->url = $long_path;
echo $shorten->get_short_url();
