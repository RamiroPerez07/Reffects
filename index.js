//variables
let categoryCards = []

//btns
const barsMenuBtn = document.getElementById("bars-menu-btn")

//menus
const navbar = document.getElementById("navbar")

//containers
const categoryContainer = document.getElementById("category-section")

function toggleNavbar(){
    navbar.classList.toggle("show-navbar");
    barsMenuBtn.classList.toggle("open");
}

function closeNavbarMenuOnScroll(){
    if (!navbar.classList.contains("show-navbar")) return;
    navbar.classList.remove("show-navbar");
    barsMenuBtn.classList.remove("open");
}

function createHtmlCategoryCard(objCategory){
    return `
    <div class="category-card">
        <div class="category-img" style="background-image : url('${objCategory.url_img}')"></div>
        <span class="category-name">${objCategory.name}</span>
    </div>
    `;
}

function loadCategories(Categories){
    const html = Categories.map(createHtmlCategoryCard).join("");
    categoryContainer.innerHTML = html;
}

function removeSelectedCategory(){
    console.log(categoryCards)
    categoryCards.forEach(card =>{
        console.log(card)
        if(card.classList.contains("selected")){
            card.classList.remove("selected");
        }
        console.log("no ingreso a la funcion")
    })
}

function setStyleOfSelectedCategory(selectedCategoryCard){
    selectedCategoryCard.classList.add("selected")
}

function selectCategory(event){
    if(!event.target.classList.contains("category-card") && !event.target.parentElement.classList.contains("category-card")) return
    let selectedCategoryCard
    if (event.target.classList.contains("category-card")){
        selectedCategoryCard = event.target
    }else if(event.target.parentElement.classList.contains("category-card")){
        selectedCategoryCard = event.target.parentElement
    }
    removeSelectedCategory();
    setStyleOfSelectedCategory(selectedCategoryCard);
}

function init(){
    window.addEventListener("DOMContentLoaded", function(){
        loadCategories(Categories);
        categoryCards = document.getElementsByClassName("category-card");
        categoryCards = [...categoryCards] //convierto a array de elementos
    })

    barsMenuBtn.addEventListener("click", toggleNavbar);
    window.addEventListener("scroll", closeNavbarMenuOnScroll);
    navbar.addEventListener("click", toggleNavbar);

    categoryContainer.addEventListener("click", selectCategory)

}

init()