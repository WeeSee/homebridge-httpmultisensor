/*
 * Homebridge-Plugin for Temperature and Humidity-Sensors
 *
 * Sensor Request example URL:
 * http://localhost/wc/homebridge/phpsensor.php?sensor=temp
 *
 * Sensor returns 
 * {"value":"55.6"}
 *
 * License: MIT
 * 
 * (C) Weesee, 2017
 */

var request = require('request');


module.exports = function (homebridge) {
    Service = homebridge.hap.Service;
    Characteristic = homebridge.hap.Characteristic;
    homebridge.registerAccessory(
		"homebridge-httpmultisensor",  // PluginName
		"HttpMultisensor",	// accessoryName
		HttpMultisensor		// constructor
    );
}


function HttpMultisensor(log, config) {
    this.log = log;
	this.debug = config["debug"] || false;
	this.debug && this.log('HttpMultisensor: reading config');

    // url info
    this.url = config["url"];
    this.http_method = config["http_method"] || "GET";
    this.name = config["name"];
    this.type = config["type"];
    this.manufacturer = config["manufacturer"] || "Sample Manufacturer";
    this.model = config["model"] || "Sample Model";
    this.serial = config["serial"] || "Sample Serial";
	
	this.temperatureService;
	this.humidityService;
}

HttpMultisensor.prototype = {
    httpRequest: function (url, method, callback) {
		this.debug && this.log('httpRequest: '+method+' '+url);
        request({
            uri: url,
            method: method,
            rejectUnauthorized: false
        },
        function (error, response, body) {
            callback(error, response, body)
        })
    },

    getSensorTemperatureValue: function (callback) {
		this.debug && this.log('getSensorTemperatureValue');
		this.httpRequest(this.url,this.http_method,function(error, response, body) {
			if (error) {
				this.log('HTTP get failed: %s', error.message);
				callback(error);
			} else {
				this.debug && this.log('HTTP success. Got result ['+body+']');
				var value = parseFloat(JSON.parse(body).value);
				this.temperatureService.setCharacteristic(
					Characteristic.CurrentTemperature,
					value 
				);
				callback(null, value);
			}
		}.bind(this));
    },
	
	getSensorHumidityValue: function (callback) {
		this.debug && this.log('getSensorHumidityValue');
		this.httpRequest(this.url,this.http_method,function(error, response, body) {
			if (error) {
				this.log('HTTP get failed: %s', error.message);
				callback(error);
			} else {
				this.debug && this.log('HTTP success. Got result ['+body+']');
				var value = parseFloat(JSON.parse(body).value);
				this.temperatureService.setCharacteristic(
					Characteristic.CurrentRelativeHumidity,
					value 
				);
				callback(null, value);
			}
		}.bind(this));
    },

    identify: function (callback) {
        this.log("Identify requested!");
        callback(); // success
    },

    getServices: function () {
		this.debug && this.log("getServiecs");
		var services = [],
		informationService = new Service.AccessoryInformation();

		informationService
		  .setCharacteristic(Characteristic.Manufacturer, this.manufacturer)
		  .setCharacteristic(Characteristic.Model, this.model)
		  .setCharacteristic(Characteristic.SerialNumber, this.serial);
		services.push(informationService);

		switch (this.type) {
			case "CurrentTemperature":
				this.temperatureService = new Service.TemperatureSensor(this.name);
				this.temperatureService 
					.getCharacteristic(Characteristic.CurrentTemperature)
					.on('get', this.getSensorTemperatureValue.bind(this));
				services.push(this.temperatureService);
				break;
			case "CurrentRelativeHumidity":
				this.temperatureService = new Service.HumiditySensor(this.name);
				this.temperatureService 
					.getCharacteristic(Characteristic.CurrentRelativeHumidity)
					.on('get', this.getSensorHumidityValue.bind(this));
				services.push(this.temperatureService);
				break;
			default:
				this.log('Error: unknown type: '+this.type+'. skipping...');
		}
		return services;
    }
};
