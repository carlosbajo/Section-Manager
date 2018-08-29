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

var isScrolling = false;
function preventDefault(e) {
    e = e || window.event;
    if (e.preventDefault)
        e.preventDefault();

    //Scrolling UP
   /* if (!(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))) {
        if (e.deltaY < 0) {
            movePage(true)
        } else {
            movePage(false);
        }
    }*/


    e.returnValue = false;
}

function movePage(orientation) {
    if (!isScrolling) {
        animatePages(pages, orientation, isScrolling);
        isScrolling = true;
        waitForScroll().then(function () {
            isScrolling = false
        });
    }
}

function waitForScroll() {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            resolve(true);
        }, 1000);
    });
}

function preventDefaultForScrollKeys(e) {
    if (keys[e.keyCode]) {
        preventDefault(e);
        return false;
    }
}


var currentPage = pages.length - 1;
var pageHeight = window.innerWidth;
/**
 * 
 * @param {*} pages - array of all pages in the doom 
 * @param {*} scrollingUp  - the orientation of the scroll event
 */
function animatePages(pages, scrollingUp) {

    var pos = 0;
    var animationSmooth = 8;
    var pos2 = pageHeight; //heigth of the pages getted from the dom
    var id; //ID of the interval

    //Determine the type of movement
    if ((currentPage == 0) && scrollingUp) {
        id = setInterval(move, 0.0001);
    } else if ((currentPage == pages.length - 1) && !scrollingUp) {
        id = setInterval(move, 0.0001);
    } else if ((currentPage > 0) && (currentPage < (pages.length - 1))) {
        id = setInterval(move, 0.0001);
    }

    function move() {
        if (scrollingUp) {
            if (pos2 <= 0) {
                clearInterval(id);
                currentPage += 1;
            } else {
                pos2 = (pos2 - animationSmooth <= 0) ? 0 : pos2 -= animationSmooth;
                pages[currentPage + 1].style.right = pos2 + 'px';
            }
        } else {
            if (pos >= pageHeight) {
                clearInterval(id);
                currentPage = (currentPage == 0) ? 0 : currentPage -= 1;
            } else {
                pos += animationSmooth;
                pages[currentPage].style.right = pos + 'px';
            }
        }

    }

}

// credit: http://www.javascriptkit.com/javatutors/touchevents2.shtml
function swipedetect(el, callback) {

    var touchsurface = el,
        swipedir,
        startX,
        startY,
        distX,
        distY,
        threshold = 10, //required min distance traveled to be considered swipe
        restraint = 600, // maximum distance allowed at the same time in perpendicular direction
        allowedTime = 400, // maximum time allowed to travel that distance
        elapsedTime,
        startTime,
        handleswipe = callback || function (swipedir) { }

    touchsurface.addEventListener('touchstart', function (e) {
        var touchobj = e.changedTouches[0];
        swipedir = 'none';
        startX = touchobj.pageX;
        startY = touchobj.pageY;
        startTime = new Date().getTime() // record time when finger first makes contact with surface
        e.preventDefault()
    }, false)

    touchsurface.addEventListener('touchmove', function (e) {
        e.preventDefault() // prevent scrolling when inside DIV
    }, false)

    touchsurface.addEventListener('touchend', function (e) {
        var touchobj = e.changedTouches[0]
        distX = touchobj.pageX - startX // get horizontal dist traveled by finger while in contact with surface
        distY = touchobj.pageY - startY // get vertical dist traveled by finger while in contact with surface
        elapsedTime = new Date().getTime() - startTime // get time elapsed
        if (elapsedTime <= allowedTime) { // first condition for awipe met
            if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint) { // 2nd condition for horizontal swipe met
                swipedir = (distX < 0) ? 'left' : 'right' // if dist traveled is negative, it indicates left swipe
            }
            else if (Math.abs(distY) >= threshold && Math.abs(distX) <= restraint) { // 2nd condition for vertical swipe met
                swipedir = (distY < 0) ? 'up' : 'down' // if dist traveled is negative, it indicates up swipe
            }
        }
        handleswipe(swipedir)
        e.preventDefault()
    }, false)
}

//Touch detection
swipedetect(parent, function (swipeOrientation) {

    switch (swipeOrientation) {
        case 'right':
            movePage(false);
            break;

        case 'left':
            movePage(true);
            break;
    }
});


if (window.addEventListener) // older FF
    window.addEventListener('DOMMouseScroll', preventDefault, false);
window.onwheel = preventDefault; // modern standard
window.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE
window.ontouchmove = preventDefault; // mobile
document.onkeydown = preventDefaultForScrollKeys;