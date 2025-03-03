window.addEventListener("smooth-after", function(e) {
  if (!hasPath("402.07")) return;
  
  el("#events").addEventListener("repaint", function () {
    
    el("#clock__hoursTens").textContent = window.data.momentParts.hours12Tens || ""
    el("#clock__minutesTens").textContent = window.data.momentParts.minutesTens
    el("#clock__hoursOnes").textContent = window.data.momentParts.hours12Ones
    el("#clock__minutesOnes").textContent = window.data.momentParts.minutesOnes
    el("#clock__weekday").textContent = window.data.momentParts.weekday.toUpperCase()
    el("#clock__date").textContent = window.data.momentParts.month.toUpperCase() + ' ' + window.data.momentParts.dayOfMonth
    
    
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