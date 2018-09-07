var before = document.getElementById('lb'),
    next = document.getElementById('rb');


next.addEventListener("click", function () {
    movePage(true);
});

before.addEventListener("click", function () {
    movePage(false);
});