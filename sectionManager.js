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
    if (e.deltaY < 0) {
        movePage(true)
    } else {
        movePage(false);
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

    e.returnValue = false;
}

function animatePages(pages, scrollingUp) {
    var currentPage = pages.length - 1;
    var pos = 0;
    var pos2 = 350;
    var id = setInterval(move, 0.001);
    function move() {
        if (scrollingUp) {
            if (pos2 == 0) {
                clearInterval(id);
            } else {
                pos2 -= 7;
                pages[currentPage].style.top = pos2 + 'px';
                //pages[currentPage].style.left = pos + 'px';
            }
        } else {
            if (pos == 350) {
                clearInterval(id);
            } else {
                pos += 7;
                pages[currentPage].style.top = pos + 'px';
                //pages[currentPage].style.left = pos + 'px';
            }
        }
        
    }

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