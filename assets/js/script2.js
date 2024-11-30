// Variables globales para manejar el carrito
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Función para añadir productos al carrito
function addToCart(name, price) {
  cart.push({ name, price });
  localStorage.setItem('cart', JSON.stringify(cart));
  alert(`${name} añadido al carrito.`);
}

// Función para cargar los productos del carrito en carrito.html
function loadCartItems() {
  const cartItemsContainer = document.querySelector('.cart-items');
  const cartTotal = document.getElementById('cart-total');
  cartItemsContainer.innerHTML = ''; // Limpia el contenedor
  let total = 0;

  cart.forEach((item, index) => {
    const div = document.createElement('div');
    div.className = 'cart-item';
    div.innerHTML = `
      <p>${item.name} - $${item.price}</p>
      <button onclick="removeFromCart(${index})">Eliminar</button>
    `;
    cartItemsContainer.appendChild(div);
    total += parseFloat(item.price);
  });

  cartTotal.textContent = total.toFixed(2);
}

// Función para eliminar productos del carrito
function removeFromCart(index) {
  cart.splice(index, 1);
  localStorage.setItem('cart', JSON.stringify(cart));
  loadCartItems();
}

// Función para cargar el resumen de la compra en compra.html
function loadPurchaseDetails() {
  const purchaseDetails = document.querySelector('.purchase-details');
  let total = 0;

  cart.forEach(item => {
    const div = document.createElement('div');
    div.innerHTML = `<p>${item.name} - $${item.price}</p>`;
    purchaseDetails.appendChild(div);
    total += parseFloat(item.price);
  });

  const totalDiv = document.createElement('div');
  totalDiv.innerHTML = `<p>Total: $${total.toFixed(2)}</p>`;
  purchaseDetails.appendChild(totalDiv);
}

// Evento: añadir al carrito
document.querySelectorAll('.add-to-cart').forEach(button => {
  button.addEventListener('click', () => {
    const name = button.dataset.name;
    const price = button.dataset.price;
    addToCart(name, price);
  });
});

// Evento: proceder al pago
if (document.querySelector('.proceed-to-checkout')) {
  document.querySelector('.proceed-to-checkout').addEventListener('click', () => {
    window.location.href = 'compra.html';
  });
}

// Carga dinámica en las páginas
if (document.querySelector('.cart-items')) {
  loadCartItems();
}

if (document.querySelector('.purchase-details')) {
  loadPurchaseDetails();
}