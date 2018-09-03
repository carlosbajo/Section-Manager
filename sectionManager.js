'use strict';
var pages = document.getElementsByClassName('page'); //All pages from the dom
var parent = document.getElementById('main-container'); //main container used for touch detection
var child = document.getElementById('sub-container'); //sub main container
var keys = { 37: 1, 38: 1, 39: 1, 40: 1 }; // Keys disabled
var currentPage = pages.length - 1; // Number of the current page in the dom
var pageWidth = window.innerWidth;
var isScrolling = false;
//Disabling scroll
var whiteSpace = child.offsetWidth - child.clientWidth;
child.style.paddingRight = whiteSpace + 'px';
child.setAttribute("style", 'width:' + (child.clientWidth + whiteSpace) + 'px;');

//Update the UI when the window is resized.
window.onresize = function () {
    pageWidth = window.innerWidth;
    for (let i = 0; i < pages.length; i++)
        if (pages[i].offsetLeft > 0)
            pages[i].style.left = pageWidth + 'px';
};

function preventDefault(e) {
    e = e || window.event;
    if (e.preventDefault)
        e.preventDefault();
        
        
    //Scrolling UP
    console.log(e.deltaY);
    

    if (e.deltaY < 0) {
        movePage(true,e)
        return;
    } else if (e.deltaY > 0) {
        movePage(false,e);
        return;
    }

    e.returnValue = false;
}

/**
 * 
 * @param {*} orientation - Orientation of the animation scroll
 */
function movePage(orientation,e) {
    if (!isScrolling) {
        animatePages(pages, orientation, isScrolling);
        isScrolling = true;

        waitForScroll().then(function () {
            isScrolling = false;
            propagationPrevent--;
        });
    }
}

/**
 * Function for wait for the scroll animation.
 */
function waitForScroll() {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            resolve(true);
        }, pageWidth + 50);
    });
}

function preventDefaultForScrollKeys(e) {
    if (keys[e.keyCode]) {
        preventDefault(e);
        return false;
    }
}

/**
 * 
 * @param {*} pages - array of all pages in the doom 
 * @param {*} scrollingUp  - the orientation of the scroll event
 */
function animatePages(pages, scrollingUp) {

    var pos = 0;
    var animationSmooth = 8;
    var pos2 = pageWidth; //heigth of the pages getted from the dom
    var id; //ID of the interval

    //Determine the type of movement
    if ((currentPage == 0) && scrollingUp) {
        id = setInterval(move, 2);
    } else if ((currentPage == pages.length - 1) && !scrollingUp) {
        id = setInterval(move, 2);
    } else if ((currentPage > 0) && (currentPage < (pages.length - 1))) {
        id = setInterval(move, 2);
    }

    function move() {
        if (scrollingUp) {
            if (pos2 <= 0) {
                clearInterval(id);
                currentPage += 1;
            } else {
                pos2 = (pos2 - animationSmooth <= 0) ? 0 : pos2 -= animationSmooth;
                pages[currentPage + 1].style.left = pos2 + 'px';
            }
        } else {
            if (pos >= pageWidth) {
                clearInterval(id);
                currentPage = (currentPage == 0) ? 0 : currentPage -= 1;
            } else {
                pos += animationSmooth;
                pages[currentPage].style.left = pos + 'px';
            }
        }

    }

}

/**
 * 
 * @param {*} el - Element of the dom that gonna have the touch detection
 * @param {*} callback - Callback function for code.
 */
function swipedetect(el, callback) {

    var touchsurface = el,
        swipedir,
        startX,
        startY,
        distX,
        distY,
        threshold = 10, //required min distance traveled to be considered swipe
        restraint = 1000, // maximum distance allowed at the same time in perpendicular direction
        allowedTime = 2000, // maximum time allowed to travel that distance
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


if (window.addEventListener)
    window.addEventListener('DOMMouseScroll', preventDefault, false);
window.onwheel = preventDefault;
window.onmousewheel = document.onmousewheel = preventDefault;
window.ontouchmove = preventDefault;
document.onkeydown = preventDefaultForScrollKeys;