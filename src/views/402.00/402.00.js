window.addEventListener("smooth-after", function(e) {
  if (!hasPath("402.00")) return;
  
  el("#events").addEventListener("repaint", function () {
    if(!app.allowPaintUpdates) return;
    
    updateTextContent(window.data.momentParts.hours12, el("#clock__hours--off"))
    updateTextContent(window.data.momentParts.minutes, el("#clock__minutes--off"))
    updateTextContent(window.data.momentParts.hours12, el("#clock__hours--feedback"))
    updateTextContent(window.data.momentParts.minutes, el("#clock__minutes--feedback"))
    
    updateOrRemoveFill(data.entities['light.117'], el("#glyphs__switchhue"))
    updateOrRemoveAlpha(data.entities['light.117'], el("#on__switchcover"))
    updateOrRemoveFill(data.entities['light.117'], el("#on__switch"))
    
    updateAppStateClass("light.117", "switch", el("#events"))
  })
  
  el(".target.switch__less").addEventListener('click', function(e) {
    toggleEntity('light.117');
  });
  
  el(".target.switch__less").addEventListener('long-press', function(e) {
    e.preventDefault()  // stop the click event
    dimLightGradually('light.117',20,300);
  });
  
  
  el(".target.switch__hue").addEventListener('click', function(e) {
    toggleEntity('light.117');
  });
  
  el(".target.switch__hue").addEventListener('long-press', function cb(e) {
    e.preventDefault()  // stop the click event
    app.nextEntity = "light.117"
    app.smoothState.load("402.01.html")
    e.currentTarget.removeEventListener(e.type, cb);
  });
  
  
  el(".target.switch__more").addEventListener('click', function(e) {
    toggleEntity('light.117');
  });
  
  el(".target.switch__more").addEventListener('long-press', function(e) {
    e.preventDefault()  // stop the click event
    brightenLightGradually('light.117',20,300);
  });
  
  
  el(".target.dimdown").addEventListener('click', function(e) {
    dimLight('light.117',51);
  });
  
  el(".target.dimdown").addEventListener('long-press', function(e) {
    e.preventDefault()  // stop the click event
    dimLightGradually('light.117',20,300);
  });
  
  
  el(".target.dimup").addEventListener('click', function(e) {
    brightenLight('light.117',51);
  });
  
  el(".target.dimup").addEventListener('long-press', function(e) {
    e.preventDefault()  // stop the click event
    brightenLightGradually('light.117',20,300);
  });
  
  
  el(".target.temp").addEventListener('click', function(e) {
    // TODO: Hook into selector A's color mode
    var rgbColor = [55,78];
    
    toggleLightColorMode("light.117",rgbColor);
  });
  
  el(".target.temp").addEventListener('long-press', function cb(e) {
    e.preventDefault()  // stop the click event
    app.nextEntity = "light.117"
    app.allowPaintUpdates = false;
    app.smoothState.load('402.01.html');
    e.currentTarget.removeEventListener(e.type, cb);
  });
  
  
  el(".target.clock").addEventListener('click', function cb(e) {
    var clock = "402.07.html"
    
    switch (app.currentClock) {
      case "twelve":
        clock = "402.05.html"
        break;
      case "twentyfour":
        clock = "402.06.html"
        break;
      case "seventies":
        clock = "402.07.html"
        break;
      case "barcode":
        clock = "402.08.html"
        break;
    }
    
    app.smoothState.load(clock);
    e.currentTarget.removeEventListener(e.type, cb);
  });
  
  el(".target.clock").addEventListener('long-press', function cb(e) {
    e.preventDefault()  // stop the click event
    app.allowPaintUpdates = false;
    app.smoothState.load("402.02.html");
    e.currentTarget.removeEventListener(e.type, cb);
  });
});