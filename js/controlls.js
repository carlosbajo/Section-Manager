var before = document.getElementById('lb'),
    next = document.getElementById('rb');


next.addEventListener("click", function () {
    if (window.pageCounter)
        ++window.pageCounter;
    movePage(true);
});

before.addEventListener("click", function () {
    if (window.pageCounter)
        --window.pageCounter;
    movePage(false);
});