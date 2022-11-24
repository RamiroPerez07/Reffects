//variables
let categoryCards = []

//btns
const barsMenuBtn = document.getElementById("bars-menu-btn")

//menus
const navbar = document.getElementById("navbar")

//containers
const categoryContainer = document.getElementById("category-section")
const productsContainer = document.getElementById("products-container")

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
        if(card.classList.contains("selected")){
            card.classList.remove("selected");
        }
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

/*----------------Renderización de elementos--------------- */

function createFxTags(arrayFx){
    const tags = arrayFx.map(fx =>{
        let htmlComponent = ""
        const effect = fx.toString().toUpperCase()
        if(effect != "ALL"){
            htmlComponent = `<div class="tag ${effect}-style">${effect}</div>`;
        }
        return htmlComponent
    }).join("");
    return tags
}

function createHtmlProductCard(objProduct){
    const {id, name, brand, fxs, description, url_img, price, free_shipping, stock} = objProduct;
    return `
    <div class="product-card">
        ${free_shipping?`<div class="shipping-img" style="background-image: url('./img/utils/free-shipping.png')"></div>`:""}
        <div class="product-img" style="background-image: url('${url_img}')"></div>
        <div class="product-info">
            <h3 class="product-name gradient-text">${name}</h3>
            <span class="product-brand">${brand}</span>
            <div class="fx-container">
                ${createFxTags(fxs)}
            </div>
            <div class="description-toggle">
                <p class="description-title">Description</p>
                <div class="icon-arrow-down" style="background-image: url('./img/utils/icon-arrow-down.svg')"></div>
            </div>
            <p class="product-description">${description}</p>
            <div class="separator"></div>
            <div class="price-info-container">
                <span class="product-price">$ ${price}</span>
                <button class="btn-style-dark" data-id="${id}">Add</button>
            </div>  
        </div>
    </div>
    `;
}

function renderProducts(){
    const html = Pedals.map(createHtmlProductCard).join("");
    productsContainer.innerHTML = html;
}

function init(){
    window.addEventListener("DOMContentLoaded", function(){
        loadCategories(Categories);
        categoryCards = document.getElementsByClassName("category-card");
        categoryCards = [...categoryCards] //convierto a array de elementos
        renderProducts();
    })

    barsMenuBtn.addEventListener("click", toggleNavbar);
    window.addEventListener("scroll", closeNavbarMenuOnScroll);
    navbar.addEventListener("click", toggleNavbar);

    categoryContainer.addEventListener("click", selectCategory)

}

init()