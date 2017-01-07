# homebridge-http-temperature-multisensor

Supports http sensor devices on HomeBridge Platform.

This plugin provides a homebridge accessory.

# Installation

1. Install homebridge using: npm install -g homebridge
2. Install this plugin using: npm install -g homebridge-httpmultisensor
3. Update your configuration file. See sample-config.json in this repository for a sample. 

# Configuration

This plugin provides

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

# Licence

Apache-2.0 License, see Licence file.

# Author

(C) Weesee, 2017
