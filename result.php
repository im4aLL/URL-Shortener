<?php
header('content-type: application/json; charset=utf-8');
header("access-control-allow-origin: *");

$xhr = $_SERVER['HTTP_X_REQUESTED_WITH'] == 'XMLHttpRequest';
if(!$xhr) {
    die();
}

require_once(__DIR__.'/settings.php');
require_once(__DIR__.'/shorten.php');

$long_path = isset($_POST['long_url']) ? filter_var($_POST['long_url'], FILTER_SANITIZE_URL) : die();

if (filter_var($long_path, FILTER_VALIDATE_URL)) {
    $shorten = new Bitly;
    $shorten->url = $long_path;
    echo $shorten->get_short_url();
}
else {
    die();
}
