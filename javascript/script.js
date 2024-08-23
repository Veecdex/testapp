const products = [
    { id: 1, name: "Smart Watch Pro", price: 199.99, category: "electronics", image: "pdtim01.png", description: "A state-of-the-art smartwatch with advanced health tracking features and a sleek design." },
    { id: 2, name: "Noise-Canceling Headphones", price: 249.99, category: "electronics", image: "pdtimg02.png", description: "High-quality wireless headphones with advanced noise-canceling technology for immersive audio experience." },
    { id: 3, name: "Ultra Comfort Sneakers", price: 89.99, category: "fashion", image: "pdtimg03.png", description: "Stylish and comfortable sneakers perfect for everyday wear or light workouts." },
    { id: 4, name: "NextGen Smartphone", price: 799.99, category: "electronics", image: "pdtimg04.png", description: "The latest smartphone with cutting-edge features, including an advanced camera system and 5G capabilities." },
    { id: 5, name: "Ergonomic Office Chair", price: 299.99, category: "home", image: "pdtimg05.png", description: "A comfortable and supportive office chair designed for long hours of work." },
    { id: 6, name: "Smart Home Security System", price: 399.99, category: "home", image: "pdtimg06.png", description: "An advanced home security system with AI-powered cameras and smartphone integration." },
    { id: 7, name: "Luxury Skincare Set", price: 149.99, category: "beauty", image: "pdtimg07.png", description: "A complete set of premium skincare products for a radiant complexion." },
    { id: 8, name: "Professional Yoga Mat", price: 59.99, category: "sports", image: "pdtimg08.png", description: "High-quality, non-slip yoga mat perfect for all types of yoga practices." },
    { id: 4, name: "NextGen Smartphone", price: 799.99, category: "electronics", image: "pdtimg09.png", description: "The latest smartphone with cutting-edge features, including an advanced camera system and 5G capabilities." },
    { id: 5, name: "Ergonomic Office Chair", price: 299.99, category: "home", image: "pdtimg10.png", description: "A comfortable and supportive office chair designed for long hours of work." },
    { id: 6, name: "Smart Home Security System", price: 399.99, category: "home", image: "pdtimg11.png", description: "An advanced home security system with AI-powered cameras and smartphone integration." },
    { id: 7, name: "Luxury Skincare Set", price: 149.99, category: "beauty", image: "pdtimg12.png", description: "A complete set of premium skincare products for a radiant complexion." }
  ];
  let cart = [];
  let likedProducts = new Set();
  
  function toggleMode() {
    document.body.classList.toggle('light-mode');
  }
  
  function renderProducts(productsToRender) {
    const productList = document.getElementById('productList');
    productList.innerHTML = '';
    
    productsToRender.forEach(product => {
      const productCard = document.createElement('div');
      productCard.className = 'product-card';
      productCard.innerHTML = `
        <div class="product-image-container">
          <img src="${product.image}" alt="${product.name}" class="product-image">
          <div class="product-icons">
            <div class="product-icon like-button ${likedProducts.has(product.id) ? 'liked' : ''}" data-id="${product.id}"><i class="fas fa-heart"></i></div>
            <div class="product-icon add-to-cart" data-id="${product.id}"><i class="fas fa-plus"></i></div>
            <div class="product-icon view-details" data-id="${product.id}"><i class="fas fa-eye"></i></div>
          </div>
        </div>
        <div class="product-info">
          <div class="product-name">${product.name}</div>
          <div class="product-price">$${product.price.toFixed(2)}</div>
        </div>
      `;
      productList.appendChild(productCard);
    });
  
    addEventListeners();
  }
  
  function addEventListeners() {
    document.querySelectorAll('.view-details').forEach(button => {
      button.addEventListener('click', showProductDetails);
    });
  
    document.querySelectorAll('.add-to-cart').forEach(button => {
      button.addEventListener('click', addToCart);
    });
  
    document.querySelectorAll('.like-button').forEach(button => {
      button.addEventListener('click', toggleLike);
    });
  }
  
  function showProductDetails(event) {
    const productId = event.currentTarget.dataset.id;
    const product = products.find(p => p.id === parseInt(productId));
    
    document.getElementById('modalProductName').textContent = product.name;
    document.getElementById('modalProductPrice').textContent = `$${product.price.toFixed(2)}`;
    document.getElementById('modalProductDescription').textContent = product.description;
    
    document.getElementById('productModal').style.display = "block";
  }
  
  function addToCart(event) {
    const productId = event.currentTarget.dataset.id;
    const product = products.find(p => p.id === parseInt(productId));
    
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    
    updateCartCount();
  }
  
  function updateCartCount() {
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    document.getElementById('cartCount').textContent = count;
    document.getElementById('cartCountMobile').textContent = count;
  }
  
  function showCart() {
    const cartItems = document.getElementById('cartItems');
    cartItems.innerHTML = '';
    
    let total = 0;
    
    cart.forEach(item => {
      const itemTotal = item.price * item.quantity;
      total += itemTotal;
      
      const cartItem = document.createElement('div');
      cartItem.innerHTML = `
        <p></p>
      `;
      cartItems.appendChild(cartItem);
    });
    
    document.getElementById('cartTotal').textContent = total.toFixed(2);
    document.getElementById('cartModal').style.display = "block";
  }
  
  function toggleLike(event) {
    const productId = parseInt(event.currentTarget.dataset.id);
    if (likedProducts.has(productId)) {
      likedProducts.delete(productId);
      event.currentTarget.classList.remove('liked');
    } else {
      likedProducts.add(productId);
      event.currentTarget.classList.add('liked');
    }
  }
  
  const searchInput = document.getElementById('searchInput');
  const noResults = document.getElementById('noResults');
  const searchTerm = document.getElementById('searchTerm');
  
  searchInput.addEventListener('input', function() {
    const searchValue = this.value.toLowerCase();
    searchTerm.textContent = searchValue;
    
    const filteredProducts = products.filter(product => 
      product.name.toLowerCase().includes(searchValue) ||
      product.description.toLowerCase().includes(searchValue)
    );
    
    if (filteredProducts.length === 0) {
      document.getElementById('productList').style.display = 'none';
      noResults.style.display = 'block';
    } else {
      document.getElementById('productList').style.display = 'grid';
      noResults.style.display = 'none';
      renderProducts(filteredProducts);
    }
  });
  
  document.querySelectorAll('.category').forEach(category => {
    category.addEventListener('click', function() {
      document.querySelectorAll('.category').forEach(c => c.classList.remove('active'));
      this.classList.add('active');
      
      const selectedCategory = this.dataset.category;
      const filteredProducts = selectedCategory === 'all' 
        ? products 
        : products.filter(product => product.category === selectedCategory);
      
      renderProducts(filteredProducts);
    });
  });
  
  document.getElementById('cartIcon').addEventListener('click', showCart);
  document.getElementById('cartIconMobile').addEventListener('click', showCart);
  
  document.getElementById('aboutIcon').addEventListener('click', () => {
    document.getElementById('aboutModal').style.display = "block";
  });
  
  document.getElementById('aboutIconMobile').addEventListener('click', () => {
    document.getElementById('aboutModal').style.display = "block";
  });
  
  document.getElementById('contactIcon').addEventListener('click', () => {
    document.getElementById('contactModal').style.display = "block";
  });
  
  document.getElementById('contactIconMobile').addEventListener('click', () => {
    document.getElementById('contactModal').style.display = "block";
  });
  
  document.querySelectorAll('.modal .close').forEach(closeBtn => {
    closeBtn.addEventListener('click', function() {
      this.closest('.modal').style.display = 'none';
    });
  });
  
  window.addEventListener('click', function(event) {
    if (event.target.classList.contains('modal')) {
      event.target.style.display = 'none';
    }
  });
  
  // Initial render
  renderProducts(products);

    document.addEventListener("DOMContentLoaded", function() {
      // Simulate a delay to demonstrate the preloader
      setTimeout(function() {
          document.getElementById('preloader').style.display = 'none';
          document.getElementById('content').style.display = 'block';
      }, 10000); // Adjust the timeout duration as needed
  });
  

    document.addEventListener('DOMContentLoaded', () => {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const addToCartButtons = document.querySelectorAll('.add-to-cart');
  
        addToCartButtons.forEach(button => {
            button.addEventListener('click', () => {
                const productId = button.getAttribute('data-id');
                const productImage = button.closest('.product-card').querySelector('.product-image').src;
                const productName = button.closest('.product-card').querySelector('.product-name').textContent;
                const productPrice = parseFloat(button.closest('.product-card').querySelector('.product-price').textContent.replace('$', ''));
  
                const existingProduct = cart.find(product => product.id === productId);
                if (existingProduct) {
                    existingProduct.quantity += 1;
                } else {
                    cart.push({ id: productId, image: productImage, name: productName, price: productPrice, quantity: 1 });
                }
  
                localStorage.setItem('cart', JSON.stringify(cart));
                showAlert(productName);
            });
        });
  
        function showAlert(productName) {
            const alertContainer = document.createElement('div');
            alertContainer.className = 'alert-container';
            alertContainer.innerHTML = `<div class="alert">${productName} added to cart</div>`;
            
            document.body.appendChild(alertContainer);
            
            setTimeout(() => {
                alertContainer.classList.add('show');
            }, 100);
  
            setTimeout(() => {
                alertContainer.classList.remove('show');
                setTimeout(() => {
                    document.body.removeChild(alertContainer);
                }, 500);
            }, 3000);
        }
    });

  
  // script.js
  document.addEventListener('DOMContentLoaded', () => {
      const defaultActiveItem = 'home-item'; // ID of the default active sidebar item
  
      // Remove 'active' class from all sidebar items
      const sidebarItems = document.querySelectorAll('.sidebar-item');
      sidebarItems.forEach(item => item.classList.remove('active'));
  
      // Add 'active' class to the default item
      const defaultItem = document.getElementById(defaultActiveItem);
      if (defaultItem) {
          defaultItem.classList.add('active');
      }
  });
  
          // script.js
          function navigateTo(url) {
      window.location.href = url;
  }