window.addEventListener("smooth-after", function(e) {
  if (!hasPath("403.01")) return;
  
  el("#events").addEventListener("repaint", function () {
    
    el("#clock__weekday").textContent = window.data.momentParts.weekday.toUpperCase()
    el("#clock__monthday").textContent = window.data.momentParts.month.toUpperCase() + " " + window.data.momentParts.dayOfMonth
    el("#clock__dayofyear").textContent = "DAY " + window.data.momentParts.dayOfYear
    el("#clock__week").textContent = "WEEK " + window.data.momentParts.weekNumber
    el("#clock__letter").textContent = "PART " + window.data.momentParts.weekAlphabetPart.toUpperCase()
    el("#clock__moon").textContent = window.data.momentParts.moonPhase.toUpperCase()
    
  })
})