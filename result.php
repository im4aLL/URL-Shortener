<?php
header('content-type: application/json; charset=utf-8');
header("access-control-allow-origin: *");

$xhr = isset($_SERVER['HTTP_X_REQUESTED_WITH']) && $_SERVER['HTTP_X_REQUESTED_WITH'] == 'XMLHttpRequest';
if(!$xhr) {
    die();
}

require_once(__DIR__.'/settings.php');
require_once(__DIR__.'/shorten.php');

$long_path = isset($_POST['long_url']) ? filter_var($_POST['long_url'], FILTER_SANITIZE_URL) : die();
$method = isset($_POST['method']) ? $_POST['method'] : '';

if (filter_var($long_path, FILTER_VALIDATE_URL) && trim($method) != NULL) {

    switch($method) {
        case 'bitly':
            $shorten = new Bitly;
        break;

        case 'google':
            $shorten = new GoogleShorten;
        break;
    }

    $shorten->url = $long_path;
    echo $shorten->get_short_url();

}
else {
    die();
}
