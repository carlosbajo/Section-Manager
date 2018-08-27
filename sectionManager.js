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

console.log(pages);


var currentPage = pages.length - 1;
var pageHeight = pages[0].offsetHeight;
/**
 * 
 * @param {*} pages - array of all pages in the doom 
 * @param {*} scrollingUp  - the orientation of the scroll event
 */
function animatePages(pages, scrollingUp) {

    var pos = 0; 
    var pos2 = pageHeight; //heigth of the pages getted from the dom
    var id; //ID of the interval

    //Determine the type of movement
    if ((currentPage == 0) && scrollingUp) {
        id = setInterval(move, 0.001);
    } else if ((currentPage == pages.length - 1) && !scrollingUp) {
        id = setInterval(move, 0.001);
    } else if ((currentPage > 0) && (currentPage < (pages.length - 1))) {
        id = setInterval(move, 0.001);
    }

    function move() {
        if (scrollingUp) {
            if (pos2 <= 0) {
                clearInterval(id);
                currentPage += 1;
            } else {
                pos2 = (pos2 - 15 <= 0) ? 0 : pos2 -= 15;
                pages[currentPage+1].style.top = pos2 + 'px';
            }
        } else {
            if (pos >= pageHeight) {
                clearInterval(id);
                currentPage = (currentPage == 0) ? 0 : currentPage -= 1;
                console.log('current page: down '+currentPage);

            } else {
                pos += 15;
                pages[currentPage].style.top = pos + 'px';
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