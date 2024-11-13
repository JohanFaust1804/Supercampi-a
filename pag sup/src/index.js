// Obtener elementos del DOM
const searchInput = document.getElementById('search-input'); // Barra de búsqueda
const productElements = document.querySelectorAll('.item'); // Todos los productos
const cartProductsContainer = document.getElementById('cart-products'); // Contenedor del carrito
const totalPagar = document.querySelector('.total-pagar'); // Total a pagar
const contadorProductos = document.getElementById('contador-productos'); // Contador de productos en el carrito
const vaciarCarritoBtn = document.getElementById('vaciar-carrito'); // Botón para vaciar el carrito

// Array para almacenar los productos en el carrito
let cart = [];

// Función para filtrar productos por categoría al escribir en el input
searchInput.addEventListener('input', () => {
    const searchText = searchInput.value.trim().toLowerCase(); // Texto de búsqueda en minúsculas

    // Recorrer todos los productos y mostrar solo los que coincidan con el texto de búsqueda
    productElements.forEach(item => {
        const category = item.getAttribute('data-category').toLowerCase(); // Obtener la categoría en minúsculas
        if (category.includes(searchText) || searchText === '') {
            item.style.display = 'block'; // Mostrar el producto
        } else {
            item.style.display = 'none'; // Ocultar el producto
        }
    });
});

// Función para actualizar la vista del carrito
function updateCart() {
    // Limpiar el carrito antes de volver a agregar los productos
    cartProductsContainer.innerHTML = '';

    let total = 0; // Variable para el total
    let totalCount = 0; // Variable para contar los productos

    // Recorrer los productos en el carrito
    cart.forEach(product => {
        const { title, price, quantity } = product; // Desestructuración de propiedades
        total += price * quantity; // Calcular el total
        totalCount += quantity;    // Contar el total de productos

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
        cartProductsContainer.appendChild(productDiv); // Agregar producto al carrito
    });

    // Actualizar el total y el contador de productos
    totalPagar.innerText = `$${total.toFixed(2)}`;
    contadorProductos.innerText = totalCount;
}

// Función para eliminar un producto del carrito
function removeProduct(title) {
    // Filtrar el carrito para eliminar el producto seleccionado
    cart = cart.filter(product => product.title !== title);

    // Actualizar la vista del carrito después de eliminar el producto
    updateCart();
}

// Función para vaciar el carrito
vaciarCarritoBtn.addEventListener('click', () => {
    // Limpiar el carrito
    cart = [];

    // Actualizar la vista del carrito
    updateCart();
});

// Añadir productos al carrito al hacer clic en los botones
productElements.forEach(item => {
    const button = item.querySelector('button');
    button.addEventListener('click', () => {
        // Obtener el nombre y precio del producto
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

        // Mostrar una notificación de que el producto ha sido añadido
        showNotification(`Añadido: ${title}`);
    });
});

// Función para mostrar la notificación
function showNotification(message) {
    const notification = document.getElementById('notification');
    notification.innerText = message; // Establecer el mensaje de la notificación
    notification.classList.add('show'); // Mostrar la notificación

    // Ocultar la notificación después de 2 segundos
    setTimeout(() => {
        notification.classList.remove('show'); // Ocultar la notificación
    }, 2000);
}
