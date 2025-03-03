window.addEventListener("smooth-after", function(e) {
  if (!hasPath("402.01")) return;
  
  var entity = el("#container").dataset.entity || "light.117"
  
  el("#events").addEventListener("repaint", function () {
    if(!app.allowPaintUpdates) return;
    
    updateOrRemovePresetFill(data.entities['sensor.hue_preset_a_onscreen'], el("#static__selectora"))
    updateOrRemovePresetFill(data.entities['sensor.hue_preset_b_onscreen'], el("#static__selectorb"))
    updateOrRemovePresetFill(data.entities['sensor.hue_preset_c_onscreen'], el("#static__selectorc"))
        
    el("#events").dataset.match = currentEntityPreset(entity)
  })
  
  el(".target.selectora").addEventListener('click', function(e) {
    setLightHSColor(entity, data.entities['sensor.hue_preset_a_actual'].state)
  });
  
  el(".target.selectora").addEventListener('long-press', function(e) {
    e.preventDefault()  // stop the click event
    // TODO: Hook into the actual color variable
    var rgbColor = [55,78]
    toggleLightColorMode(entity, rgbColor)
    app.longPressAllowed = false;
  });
  
  
  el(".target.selectorb").addEventListener('click', function(e) {
    setLightHSColor(entity, data.entities['sensor.hue_preset_b_actual'].state)
  });
  
  el(".target.selectorb").addEventListener('long-press', function(e) {
    e.preventDefault()  // stop the click event
  });
  
  
  el(".target.selectorc").addEventListener('click', function(e) {
    setLightHSColor(entity, data.entities['sensor.hue_preset_c_actual'].state)
  });
  
  el(".target.selectorc").addEventListener('long-press', function(e) {
    e.preventDefault()  // stop the click event
  });
  
  
  el(".target.dimdown").addEventListener('click', function(e) {
    dimLight(entity,51);
  });
  
  el(".target.dimdown").addEventListener('long-press', function(e) {
    e.preventDefault()  // stop the click event
    dimLightGradually(entity,20,300);
  });
  
  
  el(".target.dimup").addEventListener('click', function(e) {
    brightenLight(entity,51);
  });
  
  el(".target.dimup").addEventListener('long-press', function(e) {
    e.preventDefault()  // stop the click event
    brightenLightGradually(entity,20,300);
  });
  
  el(".target.back").addEventListener('click', function cb(e) {
    app.allowPaintUpdates = false;
    app.smoothState.load(app.previousPath || "402.00.html");
    e.currentTarget.removeEventListener(e.type, cb);
  });
  
  el(".target.random").addEventListener('click', function(e) {
    setLightHSColor(entity, [Math.round(Math.random() * 255), Math.round(Math.random() * 100)])
  });
  
  el(".target.random").addEventListener('long-press', function(e) {
    e.preventDefault()  // stop the click event
  });
  
});
