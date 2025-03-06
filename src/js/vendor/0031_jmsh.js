// Move other HASS app-specific functions here.

// TODO: Handle Promise rejections when away from home

async function authSocketData() {
	const auth = HAWS.createLongLivedTokenAuth(keys.ha.url, keys.ha.key);
	
	window.hass = await HAWS.createConnection({ auth });
	HAWS.subscribeEntities(window.hass, (response) => {
		//window.data.entities = response;
				
		var keys = Object.keys(response).filter(key => /(^(?:automation.)|(?:climate.)|(?:light.)|(?:media_player.)|(?:remote.)|(?:scene.)|(?:sensor\.hue)|(?:sensor\.keys)|(?:switch.))+\w+/.test(key));
		
		for (var i = 0; i < keys.length; ++i) {
			if(!response[keys[i]]) continue;
			
			if(!window.data.entities[keys[i]] ||
				Date.parse(window.data.entities[keys[i]].last_updated) < Date.parse(response[keys[i]].last_updated) ) {
					window.data.entities[keys[i]] = response[keys[i]];
				}
		}

		window.data.updated = Date.now()
	});
}

function pingUser() {
	HAWS.getUser(hass);
}

function damperUnavailableResult(entity, duration) {
	window.data.unavailable = window.data.unavailable || {};
	window.data.unavailable[entity] = "unavailable"
}

function returnRawStatus(entity) {
	return window.data.entities[entity] && window.data.entities[entity].state
}

function toggleEntity(entity) {
	HAWS.callService(
		hass,
		"homeassistant",
		"toggle",
		{
			entity_id: entity,
		}
	);
}

function turnOnScene(entity) {
	HAWS.callService(
		hass,
		"homeassistant",
		"turn_on",
		{
			entity_id: entity,
			transition: 6
		}
	);
}

function setLightBrightness(entity, brightness) {
	HAWS.callService(
		hass,
		"homeassistant",
		"turn_on",
		{
			entity_id: entity,
			brightness_pct: brightness
		}
	);
}

function setLightTemperature(entity, temp, brightness) {
	HAWS.callService(
		hass,
		"homeassistant",
		"turn_on",
		{
			entity_id: entity,
			color_temp: temp
		}
	);
}

function setLightHue(entity, color, brightness) {
	HAWS.callService(
		hass,
		"homeassistant",
		"turn_on",
		{
			entity_id: entity,
			color_temp: temp
		}
	);
}

function dimLightGradually(entity, amount, duration) {
	var current = currentEntity(entity);
	if(!current) return;
	
	if(current.state == "off" || current.state == "unavailable") {
		return
	}
	
	var goal = amountInBounds(current.attributes.brightness - amount, 1, 255);
	
	HAWS.callService(
		hass,
		"homeassistant",
		"turn_on",
		{
			entity_id: entity,
			brightness: goal,
			transition: duration
		}
	);
}

function brightenLightGradually(entity, amount, duration) {
	var current = currentEntity(entity);
	if(!current) return;
	
	if(current.state == "unavailable") {
		return
	}
	
	var goal = current.state == "on" ? amountInBounds(current.attributes.brightness + amount, 1, 255) : amount;
	
	HAWS.callService(
		hass,
		"homeassistant",
		"turn_on",
		{
			entity_id: entity,
			brightness: goal,
			transition: duration
		}
	);
}

function dimLight(entity, amount) {
	dimLightGradually(entity, amount, 200);
}

function brightenLight(entity, amount) {
	brightenLightGradually(entity, amount, 200);
}

function toggleLightColorMode(entity, rgbColor) {
	var current = currentEntity(entity);
	
	if(!current.attributes) return;
	
	// TODO: Use supported_color_modes for a less-brittle toggle/cycle.
	// Color modes: hs = RGB color, color_temp = 2700-5000 K daylight
	
	var obj = {}
	
	console.log(current)
	if(current.state === "off" ||
		!((current.attributes.xy_color || current.attributes.hs_color || !current.attributes.color_mode))) {
		obj = {
			entity_id: entity,
			color_temp_kelvin: 2967
		}
	} else if(current.attributes.color_mode == "color_temp" && current.attributes.color_temp_kelvin > 2957 && current.attributes.color_temp_kelvin < 2977) {
		obj = {
			entity_id: entity,
			hs_color: rgbColor
		}
/*
	} else if(current.attributes.color_mode == "hs") {
		obj = {
			entity_id: entity,
			color_temp_kelvin: 2700
		}
*/
	} else {
		obj = {
			entity_id: entity,
			color_temp_kelvin: 2967
		}
	}
	
	HAWS.callService(
		hass,
		"homeassistant",
		"turn_on",
		obj
	);
}

function setLightHSColor(entity, hs) {
	var current = currentEntity(entity);
	if(!current) return;
	
	var color = typeof hs === "string" ? JSON.parse(hs) : hs
	
	HAWS.callService(
		hass,
		"homeassistant",
		"turn_on",
		{
			entity_id: entity,
			hs_color: color
		}
	);
}

function currentEntity(entity) {
	if(data.entities && data.entities[entity]) {
		return data.entities[entity]
	}
	
	return false;
}

function amountInBounds(value, min, max) {
	if(value > max) return max;
	if(value < min) return min;
	return value;
}

function returnCommaRGBList(s) {
	if(typeof s === "object") {
		return s[0] + "," + s[1] + "," + s[2]
	} else if(typeof s === "string") {
		return s.slice(1,-1);
	} else {
		return false
	}
}

function setHueAsFillStyle(element, commaRGB) {
	if (!element) return;
	var bg = "rgb(" + commaRGB + ")";
	
	if(element.style && element.style.fill != bg)
		element.style.fill = bg
}

function removeFillStyle(element) {
	if(element && element.style)
		element.style.fill = "#7E7A78"
}

function calculateAlphaWithMinimum(min, amount, max) {
	var pct = amount / max
	var scale = max - min
	return min + (scale * pct)
}

function setOpacityStyle(element, brightness) {
	if (!element) return;
	
	var a = calculateAlphaWithMinimum(51, brightness, 240);
	var opacity = a / 240
	
	// Invert opacity to match cover-over construction of HTML
	if(element.style && element.style.opacity != opacity)
		element.style.opacity = 1.0 - opacity
}

function updateOrRemoveFill(entity, glyph) {
	var actualKeys = getEntitiesFromKeyArray("sensor.keys_actual")
	var onscreenKeys = getEntitiesFromKeyArray("sensor.keys_onscreen")
	
	if(entity && entity.attributes && entity.attributes.rgb_color) {
		
		if(entity.state == "on") {
			var match = matchOnscreenFill(entity)
			setHueAsFillStyle(glyph, returnCommaRGBList(match || entity.attributes.rgb_color))
		} else {
			removeFillStyle(glyph)
		}
	} else {
		removeFillStyle(glyph)
	}
}

function updateOrRemovePresetFill(entity, glyph) {
	if(entity && entity.state) {
		setHueAsFillStyle(glyph, returnCommaRGBList(entity.state))
	}
}

function updateOrRemoveAlpha(entity, rect) {
	if(entity && entity.attributes && entity.attributes.brightness) {
		if(entity.state == "on" && entity.attributes.brightness > 0) {
			setOpacityStyle(rect, entity.attributes.brightness)
		} else {
			setOpacityStyle(rect, 254 * 0.7)
		}
	} else {
		setOpacityStyle(rect, 254 * 0.7)
	}
}

function matchOnscreenFill(entity) {
	if(!entity) return;
	
	// TODO: This feels icky
	var onscreenKeys = getEntitiesFromKeyArray("sensor.keys_onscreen");
	var actualKeys = getEntitiesFromKeyArray("sensor.keys_actual");
	
	var match = false;
	for(var i = 0; i < (onscreenKeys ? onscreenKeys.length : 0); ++i) {	
		if(entity.attributes.hs_color[0] == JSON.parse(data.entities[actualKeys[i]].state)[0] &&
			entity.attributes.hs_color[1] == JSON.parse(data.entities[actualKeys[i]].state)[1]) {
				match = data.entities[onscreenKeys[i]].state;
			}
	}
	
	return match;
}

function currentEntityPreset(entity) {
	var match = false;
	
	if(
		data &&
		data.entities && 
		data.entities[entity] &&
		data.entities[entity].attributes &&
		data.entities[entity].attributes.hs_color
	) {
		
		// TODO: This feels icky
		var onscreenKeys = getEntitiesFromKeyArray("sensor.keys_onscreen");
		var actualKeys = getEntitiesFromKeyArray("sensor.keys_actual");	
		var colors = data.entities[entity].attributes.hs_color
		
		for(var i = 0; i < (onscreenKeys ? onscreenKeys.length : 0); ++i) {	
			if(colors[0] == JSON.parse(data.entities[actualKeys[i]].state)[0] &&
				colors[1] == JSON.parse(data.entities[actualKeys[i]].state)[1]) {
					
					match = onscreenKeys[i];
				}
		}
	}
	
	return match;
}

// Takes in a HA entity ID, in this case referencing a variable.
// The ref’d variable contains keys of the color presets used
// (all to avoid hard-coding them here).

// TODO: Use an old-compatible property truthy checker.
function getEntitiesFromKeyArray(keykey) {
	if(
		data &&
		data.entities && 
		data.entities[keykey] &&
		data.entities[keykey].state
	)
		
		// Expects an array of strings, where each string is the key name in HA Vars+History.
	return JSON.parse(data.entities[keykey].state)
}

function updateTextContent(val, el) {
	if(el && el.textContent != val) {
		el.textContent = val
	}
}

function setACFanSpeed(entity, speed) {
	var current = currentEntity(entity);
	if(!current) return;
	
	HAWS.callService(
		hass,
		"climate",
		"set_fan_mode",
		{
			entity_id: entity,
			fan_mode: speed
		}
	);
}

function setACMode(entity, mode) {
	var current = currentEntity(entity);
	if(!current) return;
	
	if(current.state == "off" || current.state == "unavailable") {
		return
	}
	
	HAWS.callService(
		hass,
		"climate",
		"set_hvac_mode",
		{
			entity_id: entity,
			hvac_mode: mode
		}
	);
}

function setACSetpoint(entity, setpoint) {
	var current = currentEntity(entity);
	if(!current) return;
	
	if(current.state == "off" || current.state == "unavailable") {
		return
	}
	
	HAWS.callService(
		hass,
		"climate",
		"set_temperature",
		{
			entity_id: entity,
			temperature: setpoint
		}
	);
}
//
//function toggleAC(entity) {
//var current = currentEntity(entity);
//if(!current) return;
//
//if(current.state == "off" || current.state == "unavailable") {
//	HAWS.callService(
//		hass,
//		"climate",
//		"set_fan_mode",
//		{
//			entity_id: entity,
//			fan_mode: low
//		}
//	);
//
//} else {
//	HAWS.callService(
//		hass,
//		"climate",
//		"turn_off",
//		{
//			entity_id: entity
//		}
//	);
//}
//}