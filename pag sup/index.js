const btnCart = document.querySelector('.container-icon');
const containerCartProducts = document.querySelector('.container-cart-products');
const cartProductsContainer = document.getElementById('cart-products');
const totalPagar = document.querySelector('.total-pagar');
const contadorProductos = document.getElementById('contador-productos');
const items = document.querySelectorAll('.item');
const searchInput = document.getElementById('search-input');
const vaciarCarritoBtn = document.getElementById('vaciar-carrito');
const iconCart = document.querySelector('.icon-cart');
const cartContainer = document.querySelector('.container-cart-products');

let cart = [];



iconCart.addEventListener('click', () => {
    cartContainer.classList.toggle('show');
});



// Mostrar y ocultar el carrito
btnCart.addEventListener('click', () => {
    containerCartProducts.classList.toggle('hidden-cart');
});

// Función para agregar productos al carrito
items.forEach(item => {
    const button = item.querySelector('button');
    button.addEventListener('click', () => {
        const title = item.querySelector('h2').innerText;
        const price = parseFloat(item.querySelector('.price').innerText.replace('$', ''));

        const existingProduct = cart.find(product => product.title === title);
        
        if (existingProduct) {
            existingProduct.quantity++;
        } else {
            cart.push({ title, price, quantity: 1 });
        }

        updateCart();
        showNotification(`Añadido: ${title}`);
    });
});

// Función para actualizar el carrito
function updateCart() {
    cartProductsContainer.innerHTML = '';
    let total = 0;
    let totalCount = 0;

    cart.forEach(product => {
        const { title, price, quantity } = product;
        total += price * quantity;
        totalCount += quantity;

        const productDiv = document.createElement('div');
        productDiv.classList.add('cart-product');
        productDiv.innerHTML = `
            <div class="info-cart-product">
                <span class="cantidad-producto-carrito">${quantity}</span>
                <p class="titulo-producto-carrito">${title}</p>
                <span class="precio-producto-carrito">$${(price * quantity).toFixed(2)}</span>
                <button class="btn-reduce" onclick="reduceQuantity('${title}')">-</button>
                <button class="btn-remove" onclick="removeProduct('${title}')">Eliminar</button>
            </div>
        `;
        cartProductsContainer.appendChild(productDiv);
    });

    totalPagar.innerText = `$${total.toFixed(2)}`;
    contadorProductos.innerText = totalCount;
}

// Función para reducir la cantidad de un producto
// Función para reducir la cantidad de un producto
function reduceQuantity(title) {
    const product = cart.find(product => product.title === title);
    if (product) {
        if (product.quantity > 1) {
            product.quantity--;
            showNotification(`Cantidad reducida: ${title}`); // Notificación al reducir
        } else {
            const confirmation = confirm(`¿Estás seguro de que quieres eliminar "${title}" del carrito?`);
            if (confirmation) {
                cart = cart.filter(product => product.title !== title);
                showNotification(`Eliminado: ${title}`); // Notificación al eliminar
            }
        }
        updateCart();
    }
}


// Función para eliminar productos del carrito
function removeProduct(title) {
    const confirmation = confirm(`¿Estás seguro de que quieres eliminar "${title}" del carrito?`);
    if (confirmation) {
        cart = cart.filter(product => product.title !== title);
        updateCart();
        showNotification(`Eliminado: ${title}`); // Notificación al eliminar
    }
}

// Función para vaciar el carrito
vaciarCarritoBtn.addEventListener('click', () => {
    cart = [];
    updateCart();
    showNotification('Carrito vaciado');
});

// Filtrar productos por categoría
searchInput.addEventListener('input', () => {
    const searchTerm = searchInput.value.toLowerCase();

    items.forEach(item => {
        const category = item.getAttribute('data-category').toLowerCase();
        if (category.includes(searchTerm)) {
            item.style.display = 'block'; // Mostrar producto
        } else {
            item.style.display = 'none'; // Ocultar producto
        }
    });
});

// Función para mostrar notificación
function showNotification(message) {
    const notification = document.getElementById('notification');
    notification.innerText = message;
    notification.classList.add('show');

    // Ocultar el mensaje después de 2 segundos
    setTimeout(() => {
        notification.classList.remove('show');
    }, 2000);
}
