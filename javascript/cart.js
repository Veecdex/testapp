document.addEventListener('DOMContentLoaded', () => {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  const cartItemsContainer = document.querySelector('.cart-items');
  const totalQuantityContainer = document.querySelector('.total-quantity');
  const totalAmountContainer = document.querySelector('.total-amount');

  const updateCartSummary = () => {
      const totalQuantity = cart.reduce((sum, product) => sum + product.quantity, 0);
      const totalAmount = cart.reduce((sum, product) => sum + product.price * product.quantity, 0);
      
      totalQuantityContainer.textContent = `Total Quantity: ${totalQuantity}`;
      totalAmountContainer.textContent = `Total Amount: $${totalAmount.toFixed(2)}`;
  };

  const renderCartItems = () => {
      cartItemsContainer.innerHTML = '';
      cart.forEach(product => {
          const cartItem = document.createElement('div');
          cartItem.className = 'cart-item';
          cartItem.innerHTML = `
              <img src="${product.image}" alt="${product.name}" class="cart-item-image">
              <div class="cart-item-info">
                  <div class="cart-item-name">${product.name}</div>
                  <div class="cart-item-price">$${product.price.toFixed(2)}</div>
                  <div class="cart-item-quantity">
                      <button class="quantity-minus" data-id="${product.id}">-</button>
                      <span>${product.quantity}</span>
                      <button class="quantity-plus" data-id="${product.id}">+</button>
                  </div>
              </div>
              <div class="cart-item-remove" data-id="${product.id}"><i class="fas fa-trash"></i></div>
          `;
          cartItemsContainer.appendChild(cartItem);
      });
      updateCartSummary();
  };

  const handleQuantityChange = (productId, change) => {
      const product = cart.find(product => product.id === productId);
      if (product) {
          product.quantity += change;
          if (product.quantity <= 0) {
              cart = cart.filter(p => p.id !== productId);
          }
      }
      localStorage.setItem('cart', JSON.stringify(cart));
      renderCartItems();
  };

  const handleRemoveItem = (productId) => {
      cart = cart.filter(product => product.id !== productId);
      localStorage.setItem('cart', JSON.stringify(cart));
      renderCartItems();
  };

  cartItemsContainer.addEventListener('click', (event) => {
      if (event.target.classList.contains('quantity-plus')) {
          const productId = event.target.getAttribute('data-id');
          handleQuantityChange(productId, 1);
      } else if (event.target.classList.contains('quantity-minus')) {
          const productId = event.target.getAttribute('data-id');
          handleQuantityChange(productId, -1);
      } else if (event.target.closest('.cart-item-remove')) {
          const productId = event.target.closest('.cart-item-remove').getAttribute('data-id');
          handleRemoveItem(productId);
      }
  });

  renderCartItems();
});

// script.js
function navigateTo(url) {
window.location.href = url;
}
// script.js
function capturePage() {
html2canvas(document.body).then(canvas => {
// Convert the canvas to a data URL
const image = canvas.toDataURL('image/png');

// Set the image source and download link
document.getElementById('captured-image').src = image;
document.getElementById('download-link').href = image;

// Show the popup
document.getElementById('popup').classList.remove('hidden');
});
}

function closePopup() {
document.getElementById('popup').classList.add('hidden');
}

document.addEventListener('DOMContentLoaded', () => {
const checkoutButton = document.querySelector('.checkout-button');
const popup = document.getElementById('popup');
const closePopupButton = document.getElementById('close-popup');
const downloadButton = document.getElementById('download-button');
const cartContainer = document.querySelector('.cart-container');

// Show the popup when checkout button is clicked
checkoutButton.addEventListener('click', () => {
popup.style.display = 'flex';
});

// Close the popup
closePopupButton.addEventListener('click', () => {
popup.style.display = 'none';
});

// Download cart container as image
downloadButton.addEventListener('click', () => {
html2canvas(cartContainer).then(canvas => {
  const link = document.createElement('a');
  link.href = canvas.toDataURL('image/png');
  link.download = 'cart.png';
  link.click();
});
});
});

document.addEventListener("DOMContentLoaded", function() {
// Simulate a delay to demonstrate the preloader
setTimeout(function() {
document.getElementById('preloader').style.display = 'none';
document.getElementById('content').style.display = 'block';
}, 20000); // Adjust the timeout duration as needed
});

  
function toggleMode() {
    document.body.classList.toggle('light-mode');
  }