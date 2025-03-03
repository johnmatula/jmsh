window.addEventListener("smooth-after", function(e) {
  if (!hasPath("403.00")) return;

  el("#events").addEventListener("repaint", function () {
    updateAppStateClass("light.114", "kitchen", el("#events"))
    updateAppStateClass("light.110", "dining", el("#events"))
    updateAppStateClass("switch.127", "letterboard", el("#events"))
    updateAppStateClass("switch.126", "cabinet", el("#events"))
    
    updateOrRemoveFill(data.entities['light.114'], el("#glyphs__kitchenhue"))
    updateOrRemoveAlpha(data.entities['light.114'], el("#on__kitchencover"))
    updateOrRemoveFill(data.entities['light.114'], el("#on__kitchen"))
    updateOrRemoveFill(data.entities['light.110'], el("#glyphs__dininghue"))
    updateOrRemoveAlpha(data.entities['light.110'], el("#on__diningcover"))
    updateOrRemoveFill(data.entities['light.110'], el("#on__dining"))
  })

  el(".target.kitchen__less").addEventListener('click', function(e) {
    toggleEntity('light.114');
  });
  
  el(".target.kitchen__less").addEventListener('long-press', function(e) {
    e.preventDefault()  // stop the click event
    dimLightGradually('light.114',20,300);
  });
  
  
  el(".target.kitchen__hue").addEventListener('click', function(e) {
    toggleEntity('light.114');
  });
  
  el(".target.kitchen__hue").addEventListener('long-press', function cb(e) {
    e.preventDefault()  // stop the click event
    app.nextEntity = "light.114"
    app.smoothState.load("402.01.html")
    e.currentTarget.removeEventListener(e.type, cb);
  });
  
  
  el(".target.kitchen__more").addEventListener('click', function(e) {
    toggleEntity('light.114');
  });
  
  el(".target.kitchen__more").addEventListener('long-press', function(e) {
    e.preventDefault()  // stop the click event
    brightenLightGradually('light.114',20,300);
  });
  
  el(".target.dining__less").addEventListener('click', function(e) {
    toggleEntity('light.110');
  });
  
  el(".target.dining__less").addEventListener('long-press', function(e) {
    e.preventDefault()  // stop the click event
    dimLightGradually('light.110',20,300);
  });
  
  
  el(".target.dining__hue").addEventListener('click', function(e) {
    toggleEntity('light.110');
  });
  
  el(".target.dining__hue").addEventListener('long-press', function cb(e) {
    e.preventDefault()  // stop the click event
    app.nextEntity = "light.110"
    app.smoothState.load("402.01.html")
    e.currentTarget.removeEventListener(e.type, cb);
  });
  
  
  el(".target.dining__more").addEventListener('click', function(e) {
    toggleEntity('light.110');
  });
  
  el(".target.dining__more").addEventListener('long-press', function(e) {
    e.preventDefault()  // stop the click event
    brightenLightGradually('light.110',20,300);
  });
  
  el(".target.cabinet").addEventListener('click', function(e) {
    toggleEntity('switch.126');
  });
  
  el(".target.cabinet").addEventListener('long-press', function cb(e) {
    e.preventDefault()
    toggleEntity('switch.128');
    app.longPressAllowed = false;
  });
  
  el(".target.letterboard").addEventListener('click', function(e) {
    toggleEntity('switch.127');
  });
  
  el(".target.letterboard").addEventListener('long-press', function cb(e) {
    e.preventDefault()  // stop the click event
    app.smoothState.load("403.01.html")
    e.currentTarget.removeEventListener(e.type, cb);
  });
})