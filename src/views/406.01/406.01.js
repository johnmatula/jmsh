window.addEventListener("smooth-after", function(e) {
  if (!hasPath("406.01")) return;
  
  var digital = el("#digital");
  
  el("#events").addEventListener("repaint-fast", function () {
    var time = window.data.momentParts.hours12 + ":" + window.data.momentParts.minutes + ":" + window.data.momentParts.seconds
    digital.textContent = time
  })
  
  el(".target.digital").addEventListener('click', function(e) {
    console.log("Click")
  });
  
  el(".target.tone").addEventListener('click', function(e) {
    playAudio(el("#beep"))
  });
  
  el(".target.mark").addEventListener('click', function(e) {
    console.log("Click")
  });
  
  el(".target.metronome").addEventListener('click', function(e) {
    console.log("Click")
  });

  el(".target.back").addEventListener('click', function cb(e) {
    app.smoothState.load("406.00.html");
    e.currentTarget.removeEventListener(e.type, cb);
  });
  
  el(".target.digital").addEventListener('long-press', function () {
    console.log("Long press digital")
  });
  
});