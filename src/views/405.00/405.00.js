window.addEventListener("smooth-after", function(e) {
  if (!hasPath("405.00")) return;
  
  el("#events").addEventListener("repaint", function () {
    //
  })

  el(".target.daytime").addEventListener('click', function(e) {
    turnOnScene('scene.daytime');
  });
  
  el(".target.nighttime").addEventListener('click', function(e) {
    turnOnScene('scene.nighttime');
  });
  
  el(".target.piano").addEventListener('click', function(e) {
    turnOnScene('scene.piano');
  });
  el(".target.party").addEventListener('click', function(e) {
    turnOnScene('scene.party');
  });
  
  el(".target.dimmy").addEventListener('click', function(e) {
    turnOnScene('scene.nighttime_two');
  });
    
  el(".target.offbeethoven").addEventListener('click', function(e) {
    turnOnScene('scene.off_beethoven');
  });
  
  el(".target.offbeethoven").addEventListener('long-press', function(e) {
    e.preventDefault()  // stop the click event
    //brightenLightGradually('light.117',20,300);
  });
  
  
});