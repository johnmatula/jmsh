function fadeOutAudio(audio, duration) {
  if(audioPaused(audio)) return;
  
  var decrement = 1.0 / (duration / 50)
  audio.volume = 1.0;
  
  var fadeOutTheAudio = setInterval(function () {
    
    // Only fade if past the fade out point or not at zero already
    if ((audio.volume != 0.0)) {      
      var volume = audio.volume - decrement;
      
      if(volume <= 0.0001) {
        clearInterval(fadeOutTheAudio);
        audio.pause()
      } else {
        audio.volume = volume;
      }
    }
  }, 50);
  
}

function toggleAudio(audio) {
  if(!audioPaused(audio)) {
    audio.pause()
  } else {
    audio.play()
  }
}

function pauseAudio(audio) {
  audio.pause()
}

function playAudio(audio) {
  callActiSound("sound1")
  
  return;
  /*
  if(audioPaused(audio)) {
    audio.play()
  }*/
}

function fadeInAudio(audio, duration) {
  if(!audioPaused(audio)) return;
  
  audio.volume = 0.0;
  var increment = 1.0 / (duration / 50)
  
  audio.play()
  
  var fadeInTheAudio = setInterval(function () {
    
    // Only fade if past the fade out point or not at zero already
    if ((audio.volume != 1.0)) {
      var volume = audio.volume + increment;
    
      if(volume >= 0.9999) {
        audio.volume = 1.0;
        clearInterval(fadeInTheAudio);
  
      } else {
        audio.volume = volume;
      }
    }

  }, 50);
  
}

function audioPaused(audio) {
  return (audio && audio.paused)
}

function callActiSound(register) {
  window.location.href = "activator://send/com.milodarling.actisound.sound1";
}