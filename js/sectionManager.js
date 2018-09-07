'use strict';
var pages = document.getElementById('sub-container').getElementsByTagName('article') //All pages from the dom
    , parent = document.getElementById('main-container') //main container used for touch detection
    , child = document.getElementById('sub-container') //sub main container
    , pageCounter = document.getElementById('pcount')
    , currentPage = 0 // Number of the current page in the dom
    , pageWidth = window.innerWidth
    , isScrolling = false
    , whiteSpace = child.offsetWidth - child.clientWidth;


var leftControll = document.createElement('div'),
    rigthControll = document.createElement('div'),
    innerLeft = document.createElement('div'),
    innerRigth = document.createElement('div');

leftControll.classList.add('scb-left');
innerLeft.id = 'lb';
innerLeft.classList.add('scb-arrows');
innerLeft.classList.add('left');
leftControll.appendChild(innerLeft);

rigthControll.classList.add('scb-right');
innerRigth.id = 'rb';
innerRigth.classList.add('scb-arrows');
innerRigth.classList.add('right');
rigthControll.appendChild(innerRigth);

child.appendChild(leftControll);
child.appendChild(rigthControll);


child.style.paddingRight = whiteSpace + 'px';
child.setAttribute("style", 'width:' + (child.clientWidth + whiteSpace) + 'px;');

//Update the UI when the window is resized.
window.onresize = function () {
    pageWidth = window.innerWidth;
    for (var i = 0; i < pages.length; i++)
        if (pages[i].offsetLeft > 0)
            pages[i].style.left = pageWidth + 'px';
};

function preventDefault(e) {
    e = e || window.event;
}

/**
 *
 * @param {*} orientation - Orientation of the animation scroll
 */
function movePage(orientation) {
    if (!isScrolling) {
        isScrolling = true;
        animatePages(pages, orientation, function () { isScrolling = false });
    }
}

/**
 * Prevent default keys action
 *
 * @param {*} e
 */
function preventDefaultForScrollKeys(e) {

    switch (e.keyCode) {

        case 37: //left
            movePage(false);
            break;
        case 39: //rigth
            movePage(true);
            break;
        case 38: case 40:
            preventDefault(e);
            return false;
    }
}

/**
 * 
 * @param {*} pages - array of all pages in the doom 
 * @param {*} scrollingUp  - the orientation of the scroll event
 */
function animatePages(pages, scrollingUp, cb) {

    var pos = 1,
        pos2 = pageWidth; //width of the pages getted from the dom

    (function () {
        var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
            window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
        window.requestAnimationFrame = requestAnimationFrame;
    })();

    //Determine the type of movement
    if ((currentPage == 0) && scrollingUp) {
        requestAnimationFrame(move);
    } else if ((currentPage == pages.length - 1) && !scrollingUp) {
        requestAnimationFrame(move);
    } else if ((currentPage > 0) && (currentPage < (pages.length - 1))) {
        requestAnimationFrame(move);
    } else {
        cb();
    }

    function move() {
        if (scrollingUp) {
            if (pos2 < 1) {
                cb();
                pages[currentPage + 1].style.left = '0px';
                currentPage += 1;
            } else {
                pos2 -= (pos2 / 8);
                pages[currentPage + 1].style.left = pos2 + 'px';
                requestAnimationFrame(move);
            }
        } else {
            if (pos >= pageWidth) {
                cb();
                currentPage -= 1;
            } else {
                pos += 20;
                pages[currentPage].style.left = pos + 'px';
                requestAnimationFrame(move);
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
        startTime = new Date().getTime()
    }, false)

    touchsurface.addEventListener('touchmove', function (e) {
        if (e.changedTouches.length == 1)
            if (Math.abs(e.changedTouches[0].pageX - startX) > 10)
                e.preventDefault();
    });



    touchsurface.addEventListener('touchend', function (e) {
        var touchobj = e.changedTouches[0];
        distX = touchobj.pageX - startX;
        distY = touchobj.pageY - startY;
        elapsedTime = new Date().getTime() - startTime;
        if (elapsedTime <= allowedTime) {
            if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint) {
                swipedir = (distX < 0) ? 'left' : 'right';
            } else if (Math.abs(distY) >= threshold && Math.abs(distX) <= restraint) {
                swipedir = (distY < 0) ? 'up' : 'down';
            }
        }
        handleswipe(swipedir);
        e.preventDefault();
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
document.onkeydown = preventDefaultForScrollKeys;