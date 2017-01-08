# homebridge-httpmultisensor

Supports http sensor devices on HomeBridge Platform.
See https://github.com/nfarina/homebridge for details on HomeBridge.

This plugin provides a HomeBridge accessory.

# Installation

1. Install homebridge using: ```npm install -g homebridge```
2. Install this plugin using: ```npm install -g homebridge-httpmultisensor```
3. Update your configuration file. See ```sample-config.json``` in this repository for a sample.
4. Make the file ```php-sensor/phpsensor.php``` accessible from your web server
5. Start HomeBridge: ```homebridge```

# Configuration

Accessory configuration sample (part of ~/.homebridge/config.json):

 ```
"accessories": [
    {
        "accessory": "HttpMultisensor",
        "name": "Temp 1",
        "type": "CurrentTemperature",
        "manufacturer" : "SensorManu 1",
        "model": "SensorModel 1",
        "serial": "SensorSerial 1",
        "url": "http://localhost/wc/homebridge/phpsensor.php?sensor=temp",
        "http_method": "GET",
        "debug": true  
    }
]

```


The sensor url should return a json string looking like this
```
{
	"value": 25.8,
}
```
Please see ```sample-config.json``` for configuration options.




This plugin acts as an interface between a web endpoint and homebridge only.
The sensor is read either directly or via PHP-script if you better like PHP.

# License

Apache-2.0 License, see License file.

# Author

(C) Weesee, 2017
