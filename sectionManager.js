'use strict';
var pages = document.getElementsByClassName('page');
var parent = document.getElementById('main-container');
var child = document.getElementById('sub-container');

console.log(document);

console.log(pages);

window.onscroll = function (e) {
    console.log('Me están haciendo scroll');
}


//Disable the scrollEvent...
console.log(child);
console.log(parent);


console.log(child.offsetWidth);
console.log(child.clientWidth);


var whiteSpace = 0;
whiteSpace = child.offsetWidth - child.clientWidth;
console.log(whiteSpace);

child.style.paddingRight = whiteSpace + 'px';
child.setAttribute("style", 'width:' + (child.clientWidth + whiteSpace) + 'px;');