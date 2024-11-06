const btnCart = document.querySelector('.container-icon');
const containerCartProducts = document.querySelector('.container-cart-products');
const cartProductsContainer = document.getElementById('cart-products');
const totalPagar = document.querySelector('.total-pagar');
const contadorProductos = document.getElementById('contador-productos');
const vaciarCarritoBtn = document.getElementById('vaciar-carrito');

// Array para almacenar los productos del carrito
let cart = [];

// Mostrar y ocultar el carrito al hacer clic en el icono del carrito
btnCart.addEventListener('click', () => {
    containerCartProducts.classList.toggle('hidden-cart');
});

// Obtener todos los productos (artículos) de la página
const productElements = document.querySelectorAll('.item');
productElements.forEach(item => {
    const button = item.querySelector('button');
    button.addEventListener('click', () => {
        // Obtener nombre y precio del producto
        const title = item.querySelector('h2').innerText;
        const price = parseFloat(item.querySelector('.price').innerText.replace('$', ''));

        // Comprobar si el producto ya está en el carrito
        const existingProduct = cart.find(product => product.title === title);

        if (existingProduct) {
            // Si el producto ya está en el carrito, incrementar la cantidad
            existingProduct.quantity++;
        } else {
            // Si el producto no está en el carrito, agregarlo con cantidad 1
            cart.push({ title, price, quantity: 1 });
        }

        // Actualizar la vista del carrito
        updateCart();
        
        // Mostrar notificación
        showNotification(`Añadido: ${title}`);
    });
});

// Función para actualizar el carrito en la UI
function updateCart() {
    // Limpiar el carrito actual antes de volver a agregar los productos
    cartProductsContainer.innerHTML = '';
    
    let total = 0;
    let totalCount = 0;

    // Recorrer los productos en el carrito
    cart.forEach(product => {
        const { title, price, quantity } = product;
        total += price * quantity; // Calcular el total
        totalCount += quantity;    // Calcular el total de productos

        // Crear un div para mostrar cada producto en el carrito
        const productDiv = document.createElement('div');
        productDiv.classList.add('cart-product');
        productDiv.innerHTML = `
            <div class="info-cart-product">
                <span class="cantidad-producto-carrito">${quantity}</span>
                <p class="titulo-producto-carrito">${title}</p>
                <span class="precio-producto-carrito">$${(price * quantity).toFixed(2)}</span>
                <button class="btn-remove" onclick="removeProduct('${title}')">Eliminar</button>
            </div>
        `;
        cartProductsContainer.appendChild(productDiv); // Agregar producto al contenedor del carrito
    });

    // Mostrar el total y la cantidad total de productos
    totalPagar.innerText = `$${total.toFixed(2)}`;
    contadorProductos.innerText = totalCount;
}

// Función para eliminar un producto del carrito
function removeProduct(title) {
    // Filtrar el carrito para eliminar el producto seleccionado
    cart = cart.filter(product => product.title !== title);
    
    // Actualizar la vista del carrito
    updateCart();
}

// Función para vaciar el carrito
vaciarCarritoBtn.addEventListener('click', () => {
    // Limpiar el carrito
    cart = [];
    
    // Actualizar la vista del carrito
    updateCart();
});

// Función para mostrar la notificación
function showNotification(message) {
    const notification = document.getElementById('notification');
    notification.innerText = message; // Establecer el mensaje de la notificación
    notification.classList.add('show'); // Mostrar la notificación

    // Ocultar el mensaje después de 2 segundos
    setTimeout(() => {
        notification.classList.remove('show'); // Ocultar la notificación
    }, 2000);
}
