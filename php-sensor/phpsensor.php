<?php

/*
 * Sensor-Simulation
 *
 * Request example URLs:
 * http://localhost/wc/homebridge/phpsensor.php?sensor=temp
 http://localhost/wc/homebridge/phpsensor.php?sensor=hum
 *
 * Script returns e.g.
 * {"value":"55.6"}
 *
 * License: MIT
 * 
 * (C) Weesee, 2017
 */

function debug($line) {
	if ($line=="")
		$line=".";
	else
		$line = date("H:i:s")." $line\n";
	file_put_contents("/tmp/phpdevice.log",$line,FILE_APPEND);
}

debug("-----------> get-request=".serialize($_GET));

if (isset($_GET["sensor"]) && $_GET["sensor"]=="temp") {
	// temp is <minute>.<second>
	$value = sprintf("%.1f",floatval(date("i").".".date("s")));
} else {
	// humidity is <second>.<minute>
	$value = sprintf("%.1f",floatval(date("s").".".date("i")));
}

$result = [
	"value" => $value,
];

debug("result=".serialize($result));

echo json_encode($result);
