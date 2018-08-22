'use strict';
var pages = document.getElementsByClassName('page');
var parent = document.getElementById('main-container');
var child = document.getElementById('sub-container');
var keys = { 37: 1, 38: 1, 39: 1, 40: 1 };
var whiteSpace = 0;

//Disabling scroll
whiteSpace = child.offsetWidth - child.clientWidth;
child.style.paddingRight = whiteSpace + 'px';
child.setAttribute("style", 'width:' + (child.clientWidth + whiteSpace) + 'px;');


function preventDefault(e) {
    e = e || window.event;
    if (e.preventDefault)
        e.preventDefault();

    //Scrolling UP
    if (e.deltaY < 0) {
        //Code for scrolling UP...


    } else {
        //Code for scrolling DOWN...
    }

    e.returnValue = false;
}

function preventDefaultForScrollKeys(e) {
    if (keys[e.keyCode]) {
        preventDefault(e);
        return false;
    }
}

if (window.addEventListener) // older FF
    window.addEventListener('DOMMouseScroll', preventDefault, false);
window.onwheel = preventDefault; // modern standard
window.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE
window.ontouchmove = preventDefault; // mobile
document.onkeydown = preventDefaultForScrollKeys;