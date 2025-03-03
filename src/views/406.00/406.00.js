window.addEventListener("smooth-after", function(e) {
  if (!hasPath("406.00")) return;
  
  el("#events").addEventListener("repaint", function () {
    updateAppStateClass("light.123", "spotlight", el("#events")) // modified for demos
    updateAppStateClass("light.123", "floorlamp", el("#events"))
    updateAppStateClass("switch.122", "salt", el("#events"))
    
    updateOrRemoveFill(data.entities['light.123'], el("#glyphs__spotlighthue"))
    updateOrRemoveFill(data.entities['light.123'], el("#on__spotlight"))
    updateOrRemoveAlpha(data.entities['light.123'], el("#on__spotlightcover"))
    updateOrRemoveFill(data.entities['light.123'], el("#glyphs__floorlamphue"))
    updateOrRemoveFill(data.entities['light.123'], el("#on__floorlamp"))
    updateOrRemoveAlpha(data.entities['light.123'], el("#on__floorlampcover"))
  })
  
  el(".target.spotlight__less").addEventListener('click', function(e) {
    toggleEntity('light.299');
  });
  
  el(".target.spotlight__less").addEventListener('long-press', function(e) {
    e.preventDefault()  // stop the click event
    dimLightGradually('light.299',20,300);
  });
  
  
  el(".target.spotlight__hue").addEventListener('click', function(e) {
    toggleEntity('light.299');
  });
  
  el(".target.spotlight__hue").addEventListener('long-press', function cb(e) {
    e.preventDefault()  // stop the click event
    app.nextEntity = "light.299"
    app.smoothState.load("402.01.html")
    e.currentTarget.removeEventListener(e.type, cb);
});
  
  
  el(".target.spotlight__more").addEventListener('click', function(e) {
    toggleEntity('light.299');
  });
  
  el(".target.spotlight__more").addEventListener('long-press', function(e) {
    e.preventDefault()  // stop the click event
    brightenLightGradually('light.299',20,300);
  });
  
  
  el(".target.floorlamp__less").addEventListener('click', function(e) {
    toggleEntity('light.123');
  });
  
  el(".target.floorlamp__less").addEventListener('long-press', function(e) {
    e.preventDefault()  // stop the click event
    dimLightGradually('light.123',20,300);
  });
  
  
  el(".target.floorlamp__hue").addEventListener('click', function(e) {
    toggleEntity('light.123');
  });
  
  el(".target.floorlamp__hue").addEventListener('long-press', function cb(e) {
    e.preventDefault()  // stop the click event
    app.nextEntity = "light.123"
    app.smoothState.load("402.01.html")
    e.currentTarget.removeEventListener(e.type, cb);
});
  
  
  el(".target.floorlamp__more").addEventListener('click', function(e) {
    toggleEntity('light.123');
  });
  
  el(".target.floorlamp__more").addEventListener('long-press', function(e) {
    e.preventDefault()  // stop the click event
    brightenLightGradually('light.123',20,300);
  });

  
  
  el(".target.salt").addEventListener('click', function(e) {
    toggleEntity('switch.122');
  });
  
  el(".target.salt").addEventListener('long-press', function(e) {
    e.preventDefault()  // stop the click event
    //
  });
  
  
  el(".target.clapper").addEventListener('click', function cb(e) {
    app.smoothState.load("406.01.html");
    e.currentTarget.removeEventListener(e.type, cb);
  });
  
});