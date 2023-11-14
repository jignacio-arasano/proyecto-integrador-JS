// Contenedor de productos
const productsContainer = document.querySelector("#products-container");
// Boton ver mas
const showMoreBtn = document.querySelector(".btn-load");
// Contenedor Categorias
const categoriesContainer = document.querySelector(".categories");
// El HTML Collection de todas las categorias
const categoriesList = document.querySelectorAll(".category");
// Carrito
const cartBtn = document.querySelector(".cartlabel");
// Boton para abrir y cerrar el menu
const menuBtn = document.querySelector(".menu-label");
// Carrito div
const cartMenu = document.querySelector(".cart");
// Menu (Hamburguesa)
const barsMenu = document.querySelector(".navbar-list");
// Overlay
const overlay = document.querySelector(".body");

// Total del carrito
const total = document.querySelector(".total");
// Boton de comprar
const buyBtn = document.querySelector(".btn-buy");
// Boton para borrar
const deleteBtn = document.querySelector(".btn-delete");
// Cart container
const productsCart = document.querySelector(".cart-container");


let cart = JSON.parse(localStorage.getItem('cart')) || []
console.log(menuBtn)
// local storage
const saveCart = () => {
  localStorage.setItem('cart', JSON.stringify(cart))
}


//  crear el html del producto
function createProductTemplate(product) {
  const { id, name, price, cardImg } = product;
  return `<div class="flex flex-col items-center justify-center w-full max-w-lg mx-auto">
  <img class="object-cover w-full rounded-md h-72 xl:h-80" src="${cardImg}" alt="T-Shirt">
  <h4 class="mt-2 text-lg font-medium text-gray-700 dark:text-gray-200">Printed T-shirt</h4>
  <p class="text-blue-500">$${price}</p>

  <button class="btn-add flex items-center justify-center w-full px-2 py-2 mt-4 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-gray-800 rounded-md hover:bg-gray-700 focus:outline-none focus:bg-gray-700" data-id='${id}' 
  data-name='${name}'
  data-price='${price}' 
  data-img='${cardImg}'>
      <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 mx-1" viewBox="0 0 20 20" fill="currentColor">
          <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
      </svg>
      
      <span class="mx-1">Agregar</span>
  </button>
</div>`;
}

// renderizar productos
const renderProducts = (productList) => {
  productsContainer.innerHTML += productList
    .map(createProductTemplate)
    .join("");
};



// saber si estamos al final del array
const isLastIndexOf = () => {
  return appState.currentProductsIndex === appState.productsLimit - 1;
};

// renderizar mas productos  ver mas
const showMoreProducts = () => {
  appState.currentProductsIndex += 1;

  let { products, currentProductsIndex } = appState;

  renderProducts(products[currentProductsIndex]);

  if (isLastIndexOf()) {
    showMoreBtn.classList.add("hidden");
  }
};

// ocultar el boton ver mas 
const setShowMoreVisibility = () => {
  if (!appState.activeFilter) {
    showMoreBtn.classList.remove("hidden");
  }

  showMoreBtn.classList.add("hidden");
};


// cambiar el estado de los botones de las categorias
const changeBtnActiveState = (selectedCategory) => {
  const categories = [...categoriesList];

  categories.forEach((categoryBtn) => {
    if (categoryBtn.dataset.category !== selectedCategory) {
      categoryBtn.classList.remove("active");
      return;
    }

    categoryBtn.classList.add("active");
  });
};

//  cambiar el estado del filtro 
const changeFiltersState = (btn) => {
  appState.activeFilter = btn.dataset.category;
  changeBtnActiveState(appState.activeFilter);
  setShowMoreVisibility(appState.activeFilter);
};

// filtrar los productos
const renderFilteredProducts = () => {
  const filteredProducts = productsData.filter(
    (product) => product.category === appState.activeFilter
  );

  renderProducts(filteredProducts);
};

// aplicar filtro
const applyFilter = ({ target }) => {
  if (!isInactiveFilterBtn(target)) return;
  changeFiltersState(target);
  productsContainer.innerHTML = "";
  if (appState.activeFilter) {
    renderFilteredProducts();
    appState.currentProductsIndex = 0;
    return;
  }
  renderProducts(appState.products[0]);
};

// Funcion para saber si el elemento que apretamos es un boton de categoria y no esta activo
const isInactiveFilterBtn = (element) => {
  return (
    element.classList.contains("category") &&
    !element.classList.contains("active")
  );
};


function toggleMenu() {
  console.log("Hiciste clic en el botón del menú");
  barsMenu.classList.toggle("hidden");
  if (!cartMenu.classList.contains("hidden")) {
    
    cartMenu.classList.add("hidden");
    barsMenu.classList.remove("hidden");
  }
}
const toggleCart = (event) => {
  event.preventDefault(); 
  cartMenu.classList.toggle('hidden'); 
  if (!barsMenu.classList.contains("hidden")) {
    barsMenu.classList.add("hidden");
    cartMenu.classList.remove("hidden");
  }
};
const closeOnOverlayClick = () => {
  
    const isBarsMenuHidden = barsMenu.classList.contains("hidden");
    const isCartMenuHidden = cartMenu.classList.contains("hidden");
  
    if (!isBarsMenuHidden && !isCartMenuHidden) {
      barsMenu.classList.add("hidden");
      cartMenu.classList.add("hidden");
    } else {
      if (!isBarsMenuHidden) {
        barsMenu.classList.add("hidden");
      } else if (!isCartMenuHidden) {
        cartMenu.classList.add("hidden");
      }
    }
  
    overlay.classList.remove("show-overlay");
  
};

const createCartProductTemplate = (cartProduct) => {
  const {price, id, img, name, quantity} = cartProduct

  return `
  <div class="cart-item flex items-center space-x-4">
  <img src="${img}" alt="${name}" class="w-16 h-16 object-cover rounded-full" />
  <div class="item-info">
    <h3 class="item-title text-lg font-medium text-gray-800">${name}</h3>
    <p class="item-price text-sm text-gray-600">Subtotal:</p>
    <span class="item-price text-sm text-gray-900"> $ ${price} </span>
  </div>
  <div class="item-handler flex items-center space-x-2">
    <span class="quantity-handler down" data-id=${id}>-</span>
    <span class="item-quantity text-sm font-semibold">${quantity}</span>
    <span class="quantity-handler up" data-id=${id}>+</span>
  </div>
</div>

  `
} 

// Render carrito
const renderCart = () => {
  if (!cart.length) {
    productsCart.innerHTML = `<p class="empty-msg">El carrito esta vacio</p>`;
    return;
  }
  productsCart.innerHTML = cart.map(createCartProductTemplate).join('')
};


const getCartTotal = () => {
  return cart.reduce((acc, cur) => acc +Number(cur.price) * cur.quantity ,0) 
}


const showCartTotal = () => {
  total.innerHTML = ` ${getCartTotal().toFixed(2)} `
}






//  habilitar o deshabilitar botones
const disableBtn = (btn) => {
  if(!cart.length){
    btn.classList.add('disabled')
  } else {
    btn.classList.remove('disabled')
  } 
}


// ejecutar funciones necesarias para actualizar el estado carro
const updateCartState = () => {
  saveCart()
  renderCart();
  showCartTotal();
  disableBtn(buyBtn)
  disableBtn(deleteBtn)
 
}

const addProduct = (e) => {
  if (!e.target.classList.contains("btn-add")) return;
  const product = e.target.dataset;
  console.log(product)
  if (isExistingCartProduct(product)) {
    addUnitToProduct(product);
  } else {
    createCartProduct(product);
    
  }

  
  updateCartState()
};

//  agregar una unidad al producto
const addUnitToProduct = (product) => {
  cart = cart.map((cartProduct) =>
    cartProduct.id === product.id
      ? { ...cartProduct, quantity: cartProduct.quantity + 1 }
      : cartProduct
  );
};

// saber si un producto ya existe en el carrito
const isExistingCartProduct = (product) => {
  return cart.find((item) => item.id === product.id);
};

// crear un objeto con la info del produ que queremos agregar al carrito
const createCartProduct = (product) => {
  cart = [...cart, { ...product, quantity: 1 }];
};




// click de + en el producto carrito
const handlePlusBtnEvent = (id) => {
  const existingCartProduct = cart.find(item => item.id === id)
  addUnitToProduct(existingCartProduct)
}

// click del - en el producto carrito
const handleMinusBtnEvent = (id) => {
  const existingCartProduct = cart.find(item => item.id === id)

  if(existingCartProduct.quantity === 1){
    if(window.confirm('Deseas eliminar el producto?')){
      removeProductFromCart(existingCartProduct)
    }
    return
  }

  substractProductUnit(existingCartProduct)
}

const substractProductUnit = (existingCartProduct) => {
  cart = cart.map((product) => {
    return product.id === existingCartProduct.id
    ? {...product, quantity: Number(product.quantity) - 1}
    : product
  })
}

const removeProductFromCart = (existingCartProduct) => {
  cart = cart.filter((product) => product.id !== existingCartProduct.id)
  updateCartState()
}



// cantidad de los productos en el carro
const handleQuantity = (e) => {
  if(e.target.classList.contains('up')){
    handlePlusBtnEvent(e.target.dataset.id)
  } else if(e.target.classList.contains('down')){
    handleMinusBtnEvent(e.target.dataset.id)
  }


  updateCartState()
}

const resetCartItems = () => {
  cart = []
  updateCartState()
}

const completeCartAction = (confirmMsg,successMsg) => {
  if(!cart.length) return
  if(window.confirm(confirmMsg)){
    resetCartItems()
    alert(successMsg)
  }
}

const completeBuy = () => {
  completeCartAction('Deseas completar tu compra?','Gracias por tu compra!')
}

const deleteCart = () => {
  completeCartAction('Deseas borrar el carro?', 'No hay productos en el carro')
}

// Funcion init
const init = () => {
  renderProducts(appState.products[0]);
  showMoreBtn.addEventListener("click", showMoreProducts);
  categoriesContainer.addEventListener("click", applyFilter);
  cartBtn.addEventListener('click', toggleCart);
  menuBtn.addEventListener("click", toggleMenu);
  
 
 
  
 overlay.addEventListener("click", closeOnOverlayClick);


 productsContainer.addEventListener("click", addProduct);
  productsCart.addEventListener('click', handleQuantity)
  document.addEventListener("DOMContentLoaded", renderCart);

  buyBtn.addEventListener('click', completeBuy)
  deleteBtn.addEventListener('click', deleteCart)
  disableBtn(buyBtn)
  disableBtn(deleteBtn)
  
};

init();