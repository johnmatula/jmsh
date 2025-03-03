window.addEventListener("smooth-after", function(e) {
  el("#events").addEventListener("repaint", function () {
    if (!hasPath("404.01")) return;
    
    el("#clock__hours").textContent = window.data.momentParts.hours12 + ":"
    el("#clock__minutes").textContent = window.data.momentParts.minutes
    
  })
  
})