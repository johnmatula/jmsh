window.addEventListener("smooth-after", function(e) {
  if (!hasPath("404.02")) return;
  
  
  el("#events").addEventListener("repaint", function () {
    if(!app.allowPaintUpdates) return;
    
    var ac = {};
    
    if(data && data.entities && data.entities["climate.ac"] && data.entities["climate.ac"].attributes) {
      ac = data.entities["climate.ac"]
    }
    
    if (!ac.state) return;
    
    el("#ac__realtemp").textContent = ac.attributes.current_temperature
    
    // TODO: Don't just blast the events classList away, this should be cached
    // with some sort of buffer in both my hass JS and replicated HA state variables
    
    el("#events").classList.remove("ac--fan-only")
    el("#events").classList.remove("ac--cool")
    el("#events").classList.remove("ac--auto")
    
    if(ac.state == "off") {
      el("#ac__setprefix").textContent = "off"
      el("#ac__settemp").textContent = ""
      el("#ac__setsuffix").textContent = ""
    } else if(ac.state == "fan_only") {
      el("#ac__setprefix").textContent = "fan over "
      el("#ac__settemp").textContent = "53"
      el("#ac__setsuffix").textContent = ""
      el("#events").classList.add("ac--fan-only")
    } else if(ac.state == "cool") {
      el("#ac__setprefix").textContent = "cool to "
      el("#ac__settemp").textContent = ac.attributes.temperature
      el("#events").classList.add("ac--cool")
      el("#ac__setsuffix").textContent = ""
    } else if(ac.state == "auto") {
      el("#ac__setprefix").textContent = "auto"
      el("#ac__settemp").textContent = ""
      el("#ac__setsuffix").textContent = ""
      el("#events").classList.add("ac--auto")
    }
    
    // TODO: Convert statuses to functions
  });
  

  el(".target.selectora").addEventListener('click', function(e) {
    setACMode("climate.ac","fan_only")
  });
  
  el(".target.selectora").addEventListener('long-press', function(e) {
    //
  });
  
  
  el(".target.selectorb").addEventListener('click', function(e) {
    setACMode("climate.ac","cool")
  });
  
  el(".target.selectorb").addEventListener('long-press', function(e) {
    e.preventDefault()  // stop the click event
  });
  
  
  el(".target.selectorc").addEventListener('click', function(e) {
    //
  });
  
  el(".target.selectorc").addEventListener('long-press', function(e) {
    e.preventDefault()  // stop the click event
  });
  
  
  el(".target.dimdown").addEventListener('click', function(e) {

  });
  
  el(".target.dimdown").addEventListener('long-press', function(e) {
    e.preventDefault()  // stop the click event

  });
  
  
  el(".target.dimup").addEventListener('click', function(e) {

  });
  
  el(".target.dimup").addEventListener('long-press', function(e) {
    e.preventDefault()  // stop the click event

  });
  
  el(".target.back").addEventListener('click', function cb(e) {
    app.allowPaintUpdates = false;
    app.smoothState.load("404.00.html");
    e.currentTarget.removeEventListener(e.type, cb);
  });
  
  el(".target.power").addEventListener('click', function(e) {
    toggleEntity("climate.ac")
  });
  
  el(".target.power").addEventListener('long-press', function(e) {
    e.preventDefault()  // stop the click event
  });
  
});
  