var sidebar = document.getElementById('sidebar');
var toggleState = true;
function burger(x) {
    x.classList.toggle('zxsh-change');
    toggleSidebar(sidebar);
}

function toggleSidebar(sidebar) {
    if (toggleState) {
        sidebar.classList.remove('horizTranslateBack');
        sidebar.classList.add('horizTranslate');
        toggleState = !toggleState;
    } else {
        var computedStyle = window.getComputedStyle(sidebar),marginLeft = computedStyle.getPropertyValue('margin-left');
        sidebar.style.marginLeft = marginLeft;
        sidebar.classList.remove('horizTranslate');
        sidebar.classList.add('horizTranslateBack');
        toggleState = !toggleState;
    }
}