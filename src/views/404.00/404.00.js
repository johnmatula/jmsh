window.addEventListener("smooth-after", function(e) {
  if (!hasPath("404.00")) return;
  
  el("#events").addEventListener("repaint", function () {
    
    updateTextContent(window.data.momentParts.hours12, el("#clock__hours--off"))
    updateTextContent(window.data.momentParts.minutes, el("#clock__minutes--off"))
    updateTextContent(window.data.momentParts.hours12, el("#clock__hours--feedback"))
    updateTextContent(window.data.momentParts.minutes, el("#clock__minutes--feedback"))
    
    updateAppStateClass("light.108", "forest", el("#events"))
    updateAppStateClass("light.106", "bedside", el("#events"))
    updateAppStateClass("switch.120", "neon", el("#events"))

    updateOrRemoveFill(data.entities['light.108'], el("#glyphs__foresthue"))
    updateOrRemoveFill(data.entities['light.108'], el("#on__forest"))
    updateOrRemoveAlpha(data.entities['light.108'], el("#on__forestcover"))
    updateOrRemoveFill(data.entities['light.106'], el("#glyphs__bedsidehue"))
    updateOrRemoveFill(data.entities['light.106'], el("#on__bedside"))
    updateOrRemoveAlpha(data.entities['light.106'], el("#on__bedsidecover"))
  })

  el(".target.forest__less").addEventListener('click', function(e) {
    toggleEntity('light.108');
  });
  
  el(".target.forest__less").addEventListener('long-press', function(e) {
    e.preventDefault()  // stop the click event
    dimLightGradually('light.108',20,300);
  });
  
  
  el(".target.forest__hue").addEventListener('click', function(e) {
    toggleEntity('light.108');
  });
  
  el(".target.forest__hue").addEventListener('long-press', function cb(e) {
    e.preventDefault()  // stop the click event
    app.nextEntity = "light.108"
    app.smoothState.load("402.01.html")
    e.currentTarget.removeEventListener(e.type, cb);
});
  
  
  el(".target.forest__more").addEventListener('click', function(e) {
    toggleEntity('light.108');
  });
  
  el(".target.forest__more").addEventListener('long-press', function(e) {
    e.preventDefault()  // stop the click event
    brightenLightGradually('light.108',20,300);
  });
  
  el(".target.bedside__less").addEventListener('click', function(e) {
    toggleEntity('light.106');
  });
  
  el(".target.bedside__less").addEventListener('long-press', function(e) {
    e.preventDefault()  // stop the click event
    dimLightGradually('light.106',20,300);
  });
  
  
  el(".target.bedside__hue").addEventListener('click', function(e) {
    toggleEntity('light.106');
  });
  
  el(".target.bedside__hue").addEventListener('long-press', function cb(e) {
    e.preventDefault()  // stop the click event
    app.nextEntity = "light.106"
    app.smoothState.load("402.01.html")
    e.currentTarget.removeEventListener(e.type, cb);
});
  
  
  el(".target.bedside__more").addEventListener('click', function(e) {
    toggleEntity('light.106');
  });
  
  el(".target.bedside__more").addEventListener('long-press', function(e) {
    e.preventDefault()  // stop the click event
    brightenLightGradually('light.106',20,300);
  });
  
  
  el(".target.neon").addEventListener('click', function(e) {
    toggleEntity('switch.120');
  });
  
  el(".target.neon").addEventListener('long-press', function cb(e) {
    e.preventDefault()  // stop the click event
    app.smoothState.load("404.02.html")
    e.currentTarget.removeEventListener(e.type, cb);
  });
  
});