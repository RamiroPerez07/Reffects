//variables

//btns
const barsMenuBtn = document.getElementById("bars-menu-btn")

//menus
const navbar = document.getElementById("navbar")

function toggleNavbar(){
    navbar.classList.toggle("show-navbar");
    barsMenuBtn.classList.toggle("open");
}

function closeNavbarMenuOnScroll(){
    if (!navbar.classList.contains("show-navbar")) return;
    navbar.classList.remove("show-navbar");
    barsMenuBtn.classList.remove("open");
}

function init(){
    barsMenuBtn.addEventListener("click", toggleNavbar);
    window.addEventListener("scroll", closeNavbarMenuOnScroll);
    navbar.addEventListener("click", toggleNavbar)
}

init()