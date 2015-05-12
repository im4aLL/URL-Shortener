<?php
/**
 * shorten.php
 * @version 0.0.1
 */

class Shorten {

    public $result;
    public $url;
    public $post_data;
    public $request_method;     // GET | POST

    public function __construct() {
        $this->request_method = 'GET';
    }

    public function get_user_agent(){
        return $_SERVER['HTTP_USER_AGENT'];
    }

    public function get(){

        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $this->url);

        if( $this->request_method == 'POST' ) {
            curl_setopt($ch, CURLOPT_POST, true);
            curl_setopt($ch, CURLOPT_POSTFIELDS, $this->post_data);
        }

        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_TIMEOUT, 10);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($ch, CURLOPT_USERAGENT, $this->get_user_agent());

        $this->result = curl_exec($ch);
        curl_close($ch);

        return $this->result;
    }
}

class Bitly extends Shorten {

    private $login   = BITLY_API_LOGIN;
    private $api_key = BITLY_API_KEY;
    private $api_url = BITLY_API_URL;

    public function __construct() {
        parent::__construct();
    }

    public function build_request_path(){
        $this->url = $this->api_url.'?login='.$this->login.'&apiKey='.$this->api_key.'&longUrl='.$this->url;
    }

    public function get_short_url(){
        $this->build_request_path();
        return $this->get();
    }
}
