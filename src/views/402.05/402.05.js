window.addEventListener("smooth-after", function(e) {
  if (!hasPath("402.05")) return;
  
  el("#events").addEventListener("repaint", function () {
    
    el("#clock__hours").textContent = window.data.momentParts.hours12 + ":"
    el("#clock__minutes").textContent = window.data.momentParts.minutes
    
  })
  
  el(".target.full").addEventListener('click', function cb(e) {
    app.smoothState.load("402.00.html");
    e.currentTarget.removeEventListener(e.type, cb);

  })
  
  el(".target.full").addEventListener('long-press', function (e) {
    e.preventDefault()
    toggleEntity("light.117");
    app.longPressAllowed = false;
  })

})