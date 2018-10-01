var before = document.getElementById('lb'),
    next = document.getElementById('rb');


next.addEventListener("click", function () {
    if (window.pageCounter)
        ++window.pageCounter;
    var currentPCounter = document.getElementById('currentPCounter');
    if (currentPCounter)
        currentPCounter.innerText = (window.pageCounter) + ' / ' + pages.length;
    movePage(true);
});

before.addEventListener("click", function () {
    if (window.pageCounter)
        --window.pageCounter;
    var currentPCounter = document.getElementById('currentPCounter');
    if (currentPCounter)
        currentPCounter.innerText = (window.pageCounter) + ' / ' + pages.length;
    movePage(false);
});