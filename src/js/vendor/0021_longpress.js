/*!
 * long-press-event - v@version@
 * Pure JavaScript long-press-event
 * https://github.com/john-doherty/long-press-event
 * @author John Doherty <www.johndoherty.info>
 * @license MIT
 */
(function (window, document) {

    'use strict';

    // local timer object based on rAF
    var timer = null;
    
    // check if the pointer is still down in subsequent intervals
    // and if event should be subsequently fired each interval
    var repeating = false;
    var fireRepeating = false;
    
    // squash the next click event when necessary, across multiple mousedowns
    var nextEventSuppressed = false;

    // check if we're using a touch screen
    var hasPointerEvents = (('PointerEvent' in window) || (window.navigator && 'msPointerEnabled' in window.navigator));
    var isTouch = (('ontouchstart' in window) || (navigator.MaxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0));

    // switch to pointer events or touch events if using a touch screen
    var mouseDown = hasPointerEvents ? 'pointerdown' : isTouch ? 'touchstart' : 'mousedown';
    var mouseUp = hasPointerEvents ? 'pointerup' : isTouch ? 'touchend' : 'mouseup';
    var mouseMove = hasPointerEvents ? 'pointermove' : isTouch ? 'touchmove' : 'mousemove';
    var mouseLeave = hasPointerEvents ? 'pointerleave' : isTouch ? 'touchleave' : 'mouseleave';

    // track number of pixels the mouse moves during long press
    var startX = 0; // mouse x position when timer started
    var startY = 0; // mouse y position when timer started
    var maxDiffX = 120; // max number of X pixels the mouse can move during long press before it is canceled
    var maxDiffY = 120; // max number of Y pixels the mouse can move during long press before it is canceled
    
    // max delay in ms
    var startDelay = 350;
    var repeatInterval = 50;

    // patch CustomEvent to allow constructor creation (IE/Chrome)
    if (typeof window.CustomEvent !== 'function') {

        window.CustomEvent = function (event, params) {

            params = params || { bubbles: false, cancelable: false, detail: undefined };

            var evt = document.createEvent('CustomEvent');
            evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
            return evt;
        };

        window.CustomEvent.prototype = window.Event.prototype;
    }

    // requestAnimationFrame() shim by Paul Irish
    window.requestAnimFrame = (function () {
        return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame || function (callback) {
                window.setTimeout(callback, 1000 / 60);
            };
    })();

    /**
     * Behaves the same as setTimeout except uses requestAnimationFrame() where possible for better performance
     * @param {function} fn The callback function
     * @param {int} delay The delay in milliseconds
     * @returns {object} handle to the timeout object
     */
    function requestTimeout(fn, delay) {

        if (!window.requestAnimationFrame && !window.webkitRequestAnimationFrame &&
            !(window.mozRequestAnimationFrame && window.mozCancelRequestAnimationFrame) && // Firefox 5 ships without cancel support
            !window.oRequestAnimationFrame && !window.msRequestAnimationFrame) return window.setTimeout(fn, delay);

        var start = new Date().getTime();
        var handle = {};

        var loop = function () {
            var current = new Date().getTime();
            var delta = current - start;

            if (delta >= delay) {
                fn.call();
            }
            else {
                handle.value = requestAnimFrame(loop);
            }
        };

        handle.value = requestAnimFrame(loop);

        return handle;
    }

    /**
     * Behaves the same as clearTimeout except uses cancelRequestAnimationFrame() where possible for better performance
     * @param {object} handle The callback function
     * @returns {void}
     */
    function clearRequestTimeout(handle) {
        if (handle) {
            window.cancelAnimationFrame ? window.cancelAnimationFrame(handle.value) :
                window.webkitCancelAnimationFrame ? window.webkitCancelAnimationFrame(handle.value) :
                    window.webkitCancelRequestAnimationFrame ? window.webkitCancelRequestAnimationFrame(handle.value) :
                        clearTimeout(handle);
        }
    }

    /**
     * Fires the 'long-press' event on element
     * @param {MouseEvent|PointerEvent|TouchEvent} originalEvent The original event being fired
     * @returns {void}
     */
    function fireLongPressEvent(originalEvent) {

        clearLongPressTimer();

        originalEvent = unifyEvent(originalEvent);
        var el = originalEvent.target;
        var touchCount = countTouches(originalEvent)
        
        var suffix = "long-press"
        
        if(touchCount == 2) {
            console.log("two!")
            suffix = "long-press-dual"
        } else if(touchCount >= 3) {
            console.log("tree!")
            suffix = "long-press-triple"
        }
        
        el.classList.remove("js--" + suffix);
        el.classList.add("js--" + suffix);
        
        
        // fire the long-press event
        var allowClickEvent = this.dispatchEvent(new CustomEvent(suffix, {
            bubbles: true,
            cancelable: true,

            // custom event data (legacy)
            detail: {
                clientX: originalEvent.clientX,
                clientY: originalEvent.clientY,
                offsetX: originalEvent.offsetX,
                offsetY: originalEvent.offsetY,
                pageX: originalEvent.pageX,
                pageY: originalEvent.pageY
            },

            // add coordinate data that would typically accompany a touch/click event
            clientX: originalEvent.clientX,
            clientY: originalEvent.clientY,
            offsetX: originalEvent.offsetX,
            offsetY: originalEvent.offsetY,
            pageX: originalEvent.pageX,
            pageY: originalEvent.pageY,
            screenX: originalEvent.screenX,
            screenY: originalEvent.screenY
        }));
        
        if (!allowClickEvent && !nextEventSuppressed && !repeating && !app.longPressAllowed) {
            // suppress the next click event if e.preventDefault() was called in long-press handler
            // or if a long press action requested to be fired only once and the touch was canceled
            // before a single repeating action. TODO: hmm
            nextEventSuppressed = document.addEventListener('click', function suppressEvent(e) {
                document.removeEventListener('click', suppressEvent, true);
                cancelEvent(e);
                app.longPressAllowed = true; // TODO
                
            }, true);
        }
        
        this.dispatchEvent (new Event(mouseUp, { bubbles: true, cancelable: true }));
        
        if(app.longPressAllowed) {
            this.dispatchEvent (new Event(mouseDown, { bubbles: true, cancelable: true }));
            repeating = true;
        } else {
            app.longPressAllowed = true;
        }
        
        el.classList.remove("js--" + suffix);
    }

    /**
     * consolidates mouse, touch, and Pointer events
     * @param {MouseEvent|PointerEvent|TouchEvent} e The original event being fired
     * @returns {MouseEvent|PointerEvent|Touch}
     */
    function unifyEvent(e) {
        if (e.changedTouches !== undefined) {
            return e.changedTouches[0];
        }
        return e;
    }
    
    /**
    * counts Pointer events
    * @param {MouseEvent|PointerEvent|TouchEvent} e The original event being fired
    * @returns {int}
    */
    function countTouches(e) {
        if (e.touches !== undefined) {
            alert(e.touches.length)
            return e.touches.length;
        } else {
            return 1;
        }
    }

    /**
     * method responsible for starting the long press timer
     * @param {event} e - event object
     * @returns {void}
     */
    function startLongPressTimer(e, delay) {

        clearLongPressTimer(e);

        var el = e.target;
        var longPressDelayInMs = delay;

        // start the timer
        timer = requestTimeout(fireLongPressEvent.bind(el, e), longPressDelayInMs);
    }

    /**
     * method responsible for clearing a pending long press timer
     * @param {event} e - event object
     * @returns {void}
     */
    function clearLongPressTimer(e) {
        clearRequestTimeout(timer);
        timer = null;
    }
    
    /**
    * method responsible for clearing a pending long press timer and repeating
    * @param {event} e - event object
    * @returns {void}
    */
    function clearLongPressTimerAndRepeating(e) {
        clearLongPressTimer(e);
        
        // Clean up for the sake of FastClick
        if (repeating) {

            repeating = false;
            e.preventDefault();
        }
    }

    /**
    * Cancels the current event
    * @param {object} e - browser event object
    * @returns {void}
    */
    function cancelEvent(e) {
        e.stopImmediatePropagation();
        e.preventDefault();
        e.stopPropagation();
    }

    /**
     * Starts the timer on mouse down and logs current position
     * @param {object} e - browser event object
     * @returns {void}
     */
    function mouseDownHandler(e) {
        e = unifyEvent(e);

        //console.log(e);
        startX = e.pageX;
        startY = e.pageY;
        //console.log(startX,startY)
        startLongPressTimer(e, repeating ? repeatInterval: startDelay);
    }

    /**
     * If the mouse moves n pixels during long-press, cancel the timer
     * @param {object} e - browser event object
     * @returns {void}
     */
    function mouseMoveHandler(e) {
        e = unifyEvent(e);

        var touch = e;

        // calculate total number of pixels the pointer has moved
        var diffX = Math.abs(startX - touch.pageX);
        var diffY = Math.abs(startY - touch.pageY);
                
        if (diffX > maxDiffX || diffY > maxDiffY) {
            //console.log("Longpress false",diffX,diffY);
            
            clearLongPressTimerAndRepeating(e);
            return false;
        }
        //console.log("Longpress true",diffX,diffY)		
        return true;
    }

    // hook events that clear a pending long press event
    document.addEventListener(mouseUp, clearLongPressTimerAndRepeating, true);
    document.addEventListener(mouseLeave, clearLongPressTimerAndRepeating, true);
    document.addEventListener(mouseMove, mouseMoveHandler, true);
    document.addEventListener('wheel', clearLongPressTimerAndRepeating, true);
    document.addEventListener('scroll', clearLongPressTimerAndRepeating, true);
    document.addEventListener('contextmenu', clearLongPressTimerAndRepeating, true);

    // hook events that can trigger a long press event
    document.addEventListener(mouseDown, mouseDownHandler, true); // <- start

}(window, document));