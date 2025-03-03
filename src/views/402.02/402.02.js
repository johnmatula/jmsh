window.addEventListener("smooth-after", function(e) {
  if (!hasPath("402.02")) return;
  
  updateAppClock(app.currentClock,el("#events"))
  
  
  el(".target.clocka").addEventListener('click', function(e) {
    app.previousPath = "402.05.html"
    updateAppClock("twelve",el("#events"))
  });
  
  el(".target.clocka").addEventListener('long-press', function cb(e) {
    e.preventDefault()
    app.previousPath = "402.08.html"
    updateAppClock("barcode",el("#events"))
    e.currentTarget.removeEventListener(e.type, cb);
  })
  
  el(".target.clockb").addEventListener('click', function(e) {
    app.previousPath = "402.07.html"
    updateAppClock("seventies",el("#events"))
  });
  
  el(".target.clockb").addEventListener('long-press', function cb(e) {
    e.preventDefault()
    app.previousPath = "402.08.html"
    updateAppClock("barcode",el("#events"))
    e.currentTarget.removeEventListener(e.type, cb);
  })
  
  el(".target.clockc").addEventListener('click', function(e) {
    app.previousPath = "402.06.html"
    updateAppClock("twentyfour",el("#events"))
  });
  
  el(".target.clockc").addEventListener('long-press', function cb(e) {
    e.preventDefault()
    app.previousPath = "402.08.html"
    updateAppClock("barcode",el("#events"))
    e.currentTarget.removeEventListener(e.type, cb);
  })
  
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
  
  el(".target.back").addEventListener('click', function cb(e) {
    app.allowPaintUpdates = false;
    app.smoothState.load(app.previousPath || "402.00.html");
    e.currentTarget.removeEventListener(e.type, cb);

  });
  
  el(".target.back").addEventListener('long-press', function(e) {
    e.preventDefault()  // stop the click event
  });
  
  el(".target.light").addEventListener('click', function(e) {
    app.allowPaintUpdates = false;
    app.smoothState.load("402.00.html");
  })
  
  el(".target.light").addEventListener('long-press', function cb(e) {
    e.preventDefault()
    toggleEntity('light.117');
    app.longPressAllowed = false;
  })
});