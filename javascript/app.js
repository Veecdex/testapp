const foodItems = [
    { id: 1, name: "Poulet Yassa", image: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80", description: "Chicken marinated in onions and lemon juice" },
    { id: 2, name: "Mafé", image: "https://images.unsplash.com/photo-1584840005087-2d24deb3ddb5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80", description: "Meat stew with peanut sauce" },
    { id: 3, name: "Thiéboudienne", image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80", description: "Rice with fish and vegetables" },
    { id: 4, name: "Dibi", image: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80", description: "Grilled lamb with onions and mustard" },
    { id: 5, name: "Attieke", image: "https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80", description: "Cassava couscous with grilled fish" }
  ];
  
  let cart = [];
  let budget = 2000;
  
  function renderFoodItems(items) {
    const foodList = document.getElementById('food-list');
    foodList.innerHTML = '';
    
    items.forEach(item => {
      const foodItem = document.createElement('div');
      foodItem.classList.add('food-item');
      foodItem.innerHTML = `
        <div class="food-info">
          <img src="${item.image}" alt="${item.name}" class="food-image">
          <div class="food-details">
            <h3>${item.name}</h3>
            <p>${item.description}</p>
            <p>Pay what you can</p>
          </div>
        </div>
        <button class="toggle-btn" onclick="toggleCart(${item.id}, this)">
          <i class="material-icons">add</i>
        </button> 
      `;
      foodList.appendChild(foodItem);
    });
  }
  
  function toggleCart(id, btn) {
    const item = foodItems.find(item => item.id === id);
    if (item) {
      const index = cart.findIndex(cartItem => cartItem.id === id);
      if (index === -1) {
        // Add to cart
        cart.push(item);
        btn.classList.add('added');
        btn.innerHTML = '<i class="material-icons">remove</i>';
        showNotification(`${item.name} added to cart`);
      } else {
        // Remove from cart
        cart.splice(index, 1);
        btn.classList.remove('added');
        btn.innerHTML = '<i class="material-icons">add</i>';
        showNotification(`${item.name} removed from cart`);
      }
      updateCartIndicator();
      updateCheckoutPage();
    }
  }
  
  function updateCartIndicator() {
    const cartCount = document.getElementById('cart-count');
    cartCount.textContent = cart.length;
  }
  
  function updateCheckoutPage() {
    const cartItems = document.getElementById('cart-items');
    
    cartItems.innerHTML = '';
    
    cart.forEach((item, index) => {
      const cartItem = document.createElement('div');
      cartItem.classList.add('checkout-item');
      cartItem.innerHTML = `
        <div class="checkout-item-info">
          <span>${item.name}</span>
        </div>
        <button class="remove-item" onclick="removeFromCart(${index})">
          <i class="material-icons">delete</i>
        </button>
      `;
      cartItems.appendChild(cartItem);
    });
    
    const payBtn = document.getElementById('pay-btn');
    payBtn.textContent = `Pay ${budget} CFA`;
  }
  
  function removeFromCart(index) {
    const removedItem = cart[index];
    cart.splice(index, 1);
    updateCartIndicator();
    updateCheckoutPage();
    showNotification(`${removedItem.name} removed from cart`);
  
    // Update the toggle button on the home page
    const toggleBtn = document.querySelector(`.toggle-btn[onclick="toggleCart(${removedItem.id}, this)"]`);
    if (toggleBtn) {
      toggleBtn.classList.remove('added');
      toggleBtn.innerHTML = '<i class="material-icons">add</i>';
    }
  }
  
  function searchFood(query) {
    const filteredItems = foodItems.filter(item => 
      item.name.toLowerCase().includes(query.toLowerCase()) ||
      item.description.toLowerCase().includes(query.toLowerCase())
    );
    renderFoodItems(filteredItems);
  }
  
  document.getElementById('search-input').addEventListener('input', (e) => {
    searchFood(e.target.value);
  });
  
  document.getElementById('set-budget-btn').addEventListener('click', () => {
    const budgetInput = document.getElementById('budget-input');
    const newBudget = parseFloat(budgetInput.value);
    if (isNaN(newBudget) || newBudget < 2000) {
      showNotification('Please enter a valid budget amount (minimum 2000 CFA).');
      return;
    }
    budget = newBudget;
    showNotification(`Budget set to ${budget} CFA`);
    updateCheckoutPage();
  });
  
  document.getElementById('pay-btn').addEventListener('click', () => {
    if (cart.length === 0) {
      showNotification('Your cart is empty. Add some items before paying.');
      return;
    }
    
    document.getElementById('details-form').style.display = 'block';
    showNotification('Please enter your delivery details to complete the order.');
  });
  
  document.getElementById('details-form').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const nameInput = document.getElementById('name-input');
    const phoneInput = document.getElementById('phone-input');
    const dateInput = document.getElementById('delivery-date');
    
    const nameError = document.getElementById('name-error');
    const phoneError = document.getElementById('phone-error');
    const dateError = document.getElementById('date-error');
    
    nameError.textContent = '';
    phoneError.textContent = '';
    dateError.textContent = '';
    
    let isValid = true;
    
    if (!/^[A-Za-z\s]+$/.test(nameInput.value)) {
      nameError.textContent = 'Please enter a valid name (letters and spaces only)';
      isValid = false;
    }
    
    if (!/^\d+$/.test(phoneInput.value)) {
      phoneError.textContent = 'Please enter a valid phone number (digits only)';
      isValid = false;
    }
    
    if (!dateInput.value) {
      dateError.textContent = 'Please select a delivery date';
      isValid = false;
    }
    
    if (isValid) {
      showNotification(`Order placed for ${nameInput.value}. Delivery scheduled for ${dateInput.value}.`);
      cart = [];
      updateCartIndicator();
      updateCheckoutPage();
      document.getElementById('details-form').style.display = 'none';
      document.getElementById('details-form').reset();
      
      // Reset all toggle buttons
      const toggleBtns = document.querySelectorAll('.toggle-btn');
      toggleBtns.forEach(btn => {
        btn.classList.remove('added');
        btn.innerHTML = '<i class="material-icons">add</i>';
      });
    }
  });
  
  function showNotification(message) {
    const notification = document.getElementById('notification');
    const notificationMessage = document.getElementById('notification-message');
    notificationMessage.textContent = message;
    notification.classList.add('show');
    setTimeout(() => {
      closeNotification();
    }, 5000);
  }
  
  function closeNotification() {
    const notification = document.getElementById('notification');
    notification.classList.remove('show');
  }
  
  // Navigation functionality
  const navItems = document.querySelectorAll('.nav-item');
  const pages = document.querySelectorAll('#home-page, #checkout-page');
  
  navItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      navItems.forEach(navItem => navItem.classList.remove('active'));
      item.classList.add('active');
      
      const pageToShow = item.getAttribute('data-page');
      pages.forEach(page => {
        page.style.display = page.id === `${pageToShow}-page` ? 'block' : 'none';
      });
    });
  });
  
  // Initial render
  renderFoodItems(foodItems);
  updateCartIndicator();
  updateCheckoutPage();