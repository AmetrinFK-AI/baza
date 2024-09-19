function openTab(evt, tabName) {
    var tabContent = document.getElementsByClassName("tab-content");
    var tabLinks = document.getElementsByClassName("tab-link");

    for (var i = 0; i < tabContent.length; i++) {
        tabContent[i].style.display = "none";
        tabLinks[i].className = tabLinks[i].className.replace(" active", "");
        tabLinks[i].querySelector('.arrow').innerHTML = '<i class="fas fa-angle-up"></i>';
    }

    var currentTabContent = document.getElementById(tabName);
    currentTabContent.style.display = "block";
    evt.currentTarget.className += " active";
    evt.currentTarget.querySelector('.arrow').innerHTML = '<i class="fas fa-angle-down"></i>';
}

document.addEventListener("DOMContentLoaded", function() {
    var firstTabLink = document.querySelector(".tabs .tab-link");
    if (firstTabLink) {
        firstTabLink.click();
    }
});