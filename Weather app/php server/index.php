
<?php

$query = $_GET['q'];
$url = 'http://api.openweathermap.org/data/2.5/weather?q='.$query.'&APPID=1a21c9019c0754654e8fbc652767872a';
try{
	$json = file_get_contents($url);
} catch (Exception $ex) {
	$json = "";
}
header('Access-Control-Allow-Origin: *');
echo $json;
?>