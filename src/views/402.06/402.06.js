window.addEventListener("smooth-after", function(e) {
  if (!hasPath("402.06")) return;
  
  el("#events").addEventListener("repaint", function () {
    
    el("#clock__month").textContent = window.data.momentParts.monthThree
    el("#clock__day").textContent = window.data.momentParts.dayOfMonth
    el("#clock__weekday").textContent = window.data.momentParts.weekday
    el("#clock__minutes").textContent = window.data.momentParts.minutes
    el("#clock__hours").textContent = window.data.momentParts.hours24Padded
    
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