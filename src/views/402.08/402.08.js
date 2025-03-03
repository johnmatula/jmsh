window.addEventListener("smooth-after", function(e) {  
  if (!hasPath("402.08")) return;
  
  
  el("#events").addEventListener("repaint", function () {
    
    el("#clock__hoursTens").textContent = window.data.momentParts.hours24Tens
    el("#clock__hoursOnes").textContent = window.data.momentParts.hours24Ones
    el("#clock__minutesTens").textContent = window.data.momentParts.minutesTens
    el("#clock__minutesOnes").textContent = window.data.momentParts.minutesOnes
    
  })
  
  
  el(".target.full").addEventListener('click', function cb(e) {
    app.smoothState.load("402.00.html");
    e.currentTarget.removeEventListener(e.type, cb);
  })
  
  el(".target.full").addEventListener('long-press', function cb(e) {
    e.preventDefault()
    toggleEntity("light.117");
    app.longPressAllowed = false;
  })
})




/*


el(".target.cabinet").addEventListener('click', function(e) {
  toggleEntity('switch.126_switch_1');
});

el(".target.cabinet").addEventListener('long-press', function cb(e) {
  e.preventDefault()
  toggleEntity('switch.128_switch_1');
  app.longPressAllowed = false;
});

el(".target.letterboard").addEventListener('click', function(e) {
  toggleEntity('switch.127_switch_1');
});

el(".target.letterboard").addEventListener('long-press', function cb(e) {
  e.preventDefault()  // stop the click event
  app.smoothState.load("403.01.html")
  e.currentTarget.removeEventListener(e.type, cb);
});*/