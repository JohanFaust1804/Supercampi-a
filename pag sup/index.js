const btnCart = document.querySelector('.container-icon');
const containerCartProducts = document.querySelector('.container-cart-products');
const cartProductsContainer = document.getElementById('cart-products');
const totalPagar = document.querySelector('.total-pagar');
const contadorProductos = document.getElementById('contador-productos');

const items = document.querySelectorAll('.item');
const searchInput = document.getElementById('search-input');

let cart = [];

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
            </div>
            <svg class="icon-close" onclick="removeProduct('${title}')">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
        `;
        cartProductsContainer.appendChild(productDiv);
    });

    totalPagar.innerText = `$${total.toFixed(2)}`;
    contadorProductos.innerText = totalCount;
}

// Función para eliminar productos del carrito
function removeProduct(title) {
    cart = cart.filter(product => product.title !== title);
    updateCart();
}

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
