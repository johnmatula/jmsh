function appendSizingMetaTags() {
  var head  = document.getElementsByTagName('head')[0];
  var meta  = document.createElement('meta');
  meta.name   = 'viewport'
  meta.content = 'width=320, initial-scale=1.0, maximum-scale=1.0, user-scalable=no'
  head.appendChild(meta); 
}

setTimeout(appendSizingMetaTags, 10);


window.hass = undefined;
window.binds = [];

window.data = {
  entities: {},
  momentParts: {},
  overrides: {}
}

window.app = {
  opened: Date.now(),
  updated: Date.now(),
  previousPath: false,
  nextEntity: false,
  allowPaintUpdates: true,
  allowUserPing: true,
  currentClock: 'twelve',
  airConditioner: {
    state: false
  },
  longPressAllowed: true,
  cachedElements: {}
}

function paint() {
  document.getElementById("events").dispatchEvent(new Event("repaint", {bubbles: true}));
}

function paintFast() {
  document.getElementById("events").dispatchEvent(new Event("repaint-fast", {bubbles: true}));
}

function hasPath(path) {
  return window.location.href.indexOf(path) !== -1
}

function updateAppClock(clock, element) {
  if(app.allowPaintUpdates && !element.classList.contains("clock--" + clock)) {
    element.classList.remove("clock--" + app.currentClock)
    app.currentClock = clock
    element.classList.add("clock--" + app.currentClock)
  }
}

function updateAppACMode(mode, element) {
  if(app.allowPaintUpdates && !element.classList.contains("ac--" + mode)) {
    element.classList.remove("ac--" + app.currentACMode)
    app.currentACMode = clock
    element.classList.add("ac--" + app.currentACMode)
  }
}

function updateAppStateClass(entity, classname, element) {
  // TODO: Add a damper to avoid “flashes” of unavailable status.
  
  var prefix = "state--" + classname + "--"
  var state = "unavailable"
  
  if(app.allowPaintUpdates && data.entities && data.entities[entity]) {
    state = window.data.entities[entity].state
  }
  
  if(!element.classList.contains(prefix + state)) {
    element.classList.remove(prefix + "unavailable")
    element.classList.remove(prefix + "off")
    element.classList.remove(prefix + "on")
    element.classList.remove(prefix + "fan_only")
    element.classList.remove(prefix + "cool")
    element.classList.remove(prefix + "auto")
      
    element.classList.add(prefix + state)
  }
}

function el(selector) {
  
  if (app.cachedElements[selector] !== undefined) {
    return app.cachedElements[selector];
  } else {
    const cached = document.querySelector(selector);
    app.cachedElements[selector] = cached;
    return cached;
  }
};

document.addEventListener('DOMContentLoaded', function() {
  'use strict';
  window.app.opened = Date.now();
  
  authSocketData()
  setTimeout(function pingUserAgain() {
    if(!window.app.allowUserPing) return;
    
    pingUser()
    setTimeout(pingUserAgain, 300000)
  }, 300000) // 5-minute heartbeat
  
  updateMomentPartsData();
  setTimeout(function doMomentAgain() {
    updateMomentPartsData()
    setTimeout(doMomentAgain, 50)
  }, 50)
  
  var $page = $('#container');
  var smoothStateOptions = {
    debug: false,
    prefetch: false,
    onBefore: function($currentTarget, $container) {
    },
    onStart: {
      duration: 298, // Duration of the exit animation
      render: function ($container) {
        window.app.allowPaintUpdates = false
        window.app.previousPath = window.location.pathname
        $container.addClass('is-exiting');
        app.smoothState.restartCSSAnimations();
      }
    },
    onReady: {
      duration: 0,
      render: function ($container, $newContent) {
        window.app.cachedElements = {}
        document.getElementById("container").setAttribute("data-entity",window.app.nextEntity)
        $container.removeClass('is-exiting');
        $container.html($newContent);
        window.app.allowPaintUpdates = true // order?
        window. // um
        window.app.nextEntity = false
      }
    }
  };
  
  window.app.smoothState = $page.smoothState(smoothStateOptions).data('smoothState');
  
  window.addEventListener('smooth-after', function () {
    
    
    paint()
    setTimeout(function paintAgain() {
      if(!window.app.allowPaintUpdates) return
      paint()
      setTimeout(paintAgain, 600)
    }, 600)
    
    paintFast()
    setTimeout(function paintFastAgain() {
      if(!window.app.allowPaintUpdates) return
      paintFast()
      setTimeout(paintFastAgain, 100)
    }, 100)
  });
  
  window.dispatchEvent(new Event("smooth-after", {bubbles: true}));
  window.setTimeout(function() {
    document.body.style.background = "#000";
  }, 600)

  FastClick.attach(document.body, {
    touchBoundary: 120,
    tapDelay: 0,
    tapTimeout: 349
  });
});
