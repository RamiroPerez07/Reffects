//variables
let categoryCards = [];

//btns
const barsMenuBtn = document.getElementById("bars-menu-btn");
const heroShowProductsBtn = document.getElementById("show-our-products");
const userIcon = document.getElementById("user-icon");
const shoppingCartBtn = document.getElementById("shopping-cart-icon");
const cartExitBtn = document.getElementById("cart-exit-btn")

//menus
const navbarList = document.getElementById("navbar-list");

//frames
const shoppingCartBg = document.getElementById("shopping-cart-bg");
const shoppingCart = document.getElementById("shopping-cart");
const header = document.getElementById("body-header");

//containers
const categoryContainer = document.getElementById("category-section");
const productsContainer = document.getElementById("products-container");
const cartProductsContainer = document.getElementById("cart-products-container")

/*
Llamada de productos (pedales) desde el local storage
De lo contrario traer el array vacio
*/

let pedalsInCart = JSON.parse(localStorage.getItem("pedals-in-cart")) || [];

function saveItemInLocalStorage(array, key){
    localStorage.setItem(key, JSON.stringify(array))
}

function createHtmlCartProductCard(objProduct){
    const {id, url_img, name, brand, price, quantity} = objProduct
    return `
    <div class="cart-product-card" data-id="${id}">
        <div class="cart-product-img" style="background-image: url('${url_img}')"></div>
        <h3 class="cart-product-name gradient-text">${name}</h3>
        <span class="cart-product-brand">${brand}</span>
        <span class="cart-product-price">$ ${price}</span>
        <button data-id="${id}" class="exit-btn quit-product-btn"></button>
        <div class="quantity-manage-box">
            <button data-id="${id}" class="decrease-quantity-btn btn-style-dark quantity-btn">-</button>
            <span class="quantity-product-label">${quantity}</span>
            <button data-id="${id}" class="increase-quantity-btn btn-style-dark quantity-btn">+</button>
        </div>
    </div>
    `;
}

function renderProductsInShoppingCart(arrayOfProducts){
    const html = arrayOfProducts.map(createHtmlCartProductCard).join("");
    cartProductsContainer.innerHTML = html;
}


function toggleNavbarList(){
    //si el carro esta abierto lo cierra
    if(isShoppingCartOpen()){
        closeShoppingCart();
    } 
    navbarList.classList.toggle("show-navbar-list");
    barsMenuBtn.classList.toggle("open");
}

function toggleShoppingCart(){
    //si el menu esta abierto se cierra
    if(isMenuOpen()){
        closeNavbarListMenu();
    }
    shoppingCartBg.classList.toggle("show-bg");
    shoppingCart.classList.toggle("open-cart");
    renderProductsInShoppingCart(pedalsInCart);
}

function isShoppingCartOpen(){
    return shoppingCart.classList.contains("open-cart");
}

function isMenuOpen(){
    return navbarList.classList.contains("show-navbar-list");
}

function closeOpenWindows(){
    if (isShoppingCartOpen()){
        shoppingCart.classList.remove("open-cart");
        shoppingCartBg.classList.remove("show-bg");
    }else if(isMenuOpen()){
        navbarList.classList.remove("show-navbar-list");
        barsMenuBtn.classList.remove("open");
    }
}

function closeNavbarMenuOnScroll(){
    if (isMenuOpen()){
        closeNavbarListMenu();
    } 
}

function closeShoppingCart(){
    shoppingCart.classList.remove("open-cart");
    shoppingCartBg.classList.remove("show-bg");
}

function closeNavbarListMenu(){
    navbarList.classList.remove("show-navbar-list");
    barsMenuBtn.classList.remove("open");
}

function createHtmlCategoryCard(objCategory){
    const {name, url_img} = objCategory;
    return `
    <div class="category-card category-selection" data-category = "${name}">
        <div class="category-img category-selection" style="background-image : url('${url_img}')"></div>
        <span class="category-name category-selection">${name}</span>
    </div>
    `;
}

function loadCategories(Categories){
    const html = Categories.map(createHtmlCategoryCard).join("");
    categoryContainer.innerHTML = html;
}

function removeSelectedCategory(){
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
    if (!event.target.classList.contains("category-selection")) return;
    const selectedCategoryCard = event.target.closest(".category-card")
    const selectedCategory = selectedCategoryCard.dataset.category.toString().toLowerCase();
    removeSelectedCategory();
    setStyleOfSelectedCategory(selectedCategoryCard);
    const productsFilteredByTag = getProductByCategory(selectedCategory);
    renderProducts(productsFilteredByTag);
}

function getProductByCategory(tag){
    const productsFilteredByTag = Pedals.filter(objPedal =>{
        return objPedal.fxs.includes(tag);
    })
    return productsFilteredByTag;
}

function findProductById(id, arrayOfObjects){
    const productFilteredById = arrayOfObjects.find(objPedal =>{
        return objPedal.id == id;
    })
    return productFilteredById;
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
        ${stock==0?`<div class="out-of-stock-img" style="background-image: url('./img/utils/out-of-stock.png')"></div>`:""}
        <div class="product-img" style="background-image: url('${url_img}')"></div>
        <div class="product-info">
            <h3 class="product-name gradient-text">${name}</h3>
            <span class="product-brand">${brand}</span>
            <div class="fx-container">
                ${createFxTags(fxs)}
            </div>
            <div class="description-toggle show-product-description">
                <p class="description-title show-product-description">Description</p>
                <div class="icon-arrow-down show-product-description" style="background-image: url('./img/utils/icon-arrow-down.svg')"></div>
            </div>
            <p class="product-description">${description}</p>
            <div class="separator"></div>
            <div class="price-info-container">
                <span class="product-price">$ ${price}</span>
                <button class="btn-style-dark add-product-btn" data-id="${id}">Add</button>
            </div>  
        </div>
    </div>
    `;
}

function renderProducts(arrayOfProducts){
    const html = arrayOfProducts.map(createHtmlProductCard).join("");
    productsContainer.innerHTML = html;
}

function selectProductCard(event){

    //ver la descripción de un producto
    if (event.target.classList.contains("show-product-description")){
        //obtengo la card en cuestion (o sea la seleccionada)
        const card = event.target.closest(".product-card");
        //con la card obtengo la descripción (texto)
        const description = card.querySelector(".product-description");
        //alterno la clase de la descripcion para que se muestre o no
        description.classList.toggle("visible");
        //con la card obtengo la flechita y la animo con la fx rotateArrow
        const arrow = card.querySelector(".icon-arrow-down");
        //alterno la clase de la flecha para que cambie entre vista hacia arriba y hacia abajo
        arrow.classList.toggle("look-up");
        return;
    }

    //agregar producto al carrito
    if(event.target.classList.contains("add-product-btn")){
        //se captura el id seleccionado
        const selectedIdProduct = event.target.dataset.id;
        //se captura el producto
        const selectedProduct = findProductById(selectedIdProduct, Pedals);
        // ¿ el producto existe en el carrito?
        increaseProductQuantity(selectedProduct);
    }

}

function increaseProductQuantity(objProduct){
    if(hasProductAlreadyBeenAddedToTheCart(objProduct)){
        //si el objeto existe actualizo el array pedals in carts con la nueva cantidad
        pedalsInCart = pedalsInCart.map(objPedal => {
            if(objPedal.id == objProduct.id){
                objPedal.quantity++;
            }
            return objPedal;
        })
    }else{
        //si aun no existe en el carro agrego un objeto al array
        pedalsInCart = [...pedalsInCart, {...objProduct, quantity: 1}]
    }
    //en ambos casos guardo la data en el local storage
    saveItemInLocalStorage(pedalsInCart, "pedals-in-cart");
    renderProductsInShoppingCart(pedalsInCart);
}

function decreaseProductQuantity(objProduct){
    //si el item posee cantidad igual a 1 y se hace click en menos, se consulta al usuario para eliminar
    if (objProduct.quantity == 1){
        console.log("increso")
        const res = window.confirm(`Do you want to remove ${objProduct.name} from shopping cart?`)
        if (res == true){
            removeProductFromShoppingCart(objProduct);
            return;
        }
    }
    pedalsInCart = pedalsInCart.map(objPedal => {
        if(objPedal.id == objProduct.id){
            objPedal.quantity--;
        }
        return objPedal;
    })
    saveItemInLocalStorage(pedalsInCart, "pedals-in-cart");
    renderProductsInShoppingCart(pedalsInCart);
}


function hasProductAlreadyBeenAddedToTheCart(objProduct){
    return pedalsInCart.some(objPedal =>{
        return objPedal.id == objProduct.id;
    })
}

function getCartProductsUnlessSpecified(objProduct){
    console.log(pedalsInCart)
    return pedalsInCart.filter(objPedal => {
        return objPedal.id != objProduct.id;
    })
}

function removeProductFromShoppingCart(objProduct){
    //se filtra por los productos quitando el del id seleccionado
    const filteredProducts = getCartProductsUnlessSpecified(objProduct);
    saveItemInLocalStorage(filteredProducts, "pedals-in-cart");
    renderProductsInShoppingCart(filteredProducts);   
}

function selectedCartProduct(event){
    //eliminacion de productos
    if (event.target.classList.contains("quit-product-btn")){
        const idProductSelected = event.target.dataset.id;
        const filteredProduct = findProductById(idProductSelected, pedalsInCart)
        removeProductFromShoppingCart(filteredProduct);
    }

    //agregado de productos
    if (event.target.classList.contains("increase-quantity-btn")){
        const idProductSelected = event.target.dataset.id;
        const filteredProduct = findProductById(idProductSelected, pedalsInCart)
        increaseProductQuantity(filteredProduct);
    }

    //disminucion de productos
    if (event.target.classList.contains("decrease-quantity-btn")){
        const idProductSelected = event.target.dataset.id;
        const filteredProduct = findProductById(idProductSelected, pedalsInCart)
        console.log(filteredProduct)
        decreaseProductQuantity(filteredProduct);
    }
}

function init(){
    window.addEventListener("DOMContentLoaded", function(){
        loadCategories(Categories);
        categoryCards = document.getElementsByClassName("category-card");
        categoryCards = [...categoryCards] //convierto a array de elementos
        setStyleOfSelectedCategory(categoryCards[0])
        renderProducts(Pedals);
    })

    barsMenuBtn.addEventListener("click", toggleNavbarList);
    window.addEventListener("scroll", closeOpenWindows);
    navbarList.addEventListener("click", toggleNavbarList);
    userIcon.addEventListener("click", function(){window.location.href="./login.html"});
    shoppingCartBtn.addEventListener("click", toggleShoppingCart);
    cartExitBtn.addEventListener("click", toggleShoppingCart);
    //header.addEventListener("click",closeOpenWindows);


    categoryContainer.addEventListener("click", selectCategory);
    productsContainer.addEventListener("click", selectProductCard);
    cartProductsContainer.addEventListener("click", selectedCartProduct)
    heroShowProductsBtn.addEventListener("click", function(){window.location.href='#products-section'})
}

init()