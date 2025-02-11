// Initial food items data
const initialFoodItems = [
    {
        id: 1,
        name: 'Margherita Pizza',
        price: 299,
        image: 'https://source.unsplash.com/800x600/?pizza,margherita',
        description: 'Classic delight with 100% real mozzarella cheese'
    },
    {
        id: 2,
        name: 'Butter Chicken',
        price: 349,
        image: 'https://source.unsplash.com/800x600/?butter,chicken',
        description: 'Tender chicken in rich, creamy butter sauce'
    },
    {
        id: 3,
        name: 'Veg Biryani',
        price: 249,
        image: 'https://source.unsplash.com/800x600/?biryani,rice',
        description: 'Fragrant rice with mixed vegetables and aromatic spices'
    },
    {
        id: 4,
        name: 'Chocolate Brownie',
        price: 129,
        image: 'https://source.unsplash.com/800x600/?brownie,chocolate',
        description: 'Rich chocolate brownie with molten center'
    }
];

// DOM Elements
const authForm = document.getElementById('auth-form');
const mainApp = document.getElementById('main-app');
const authScreen = document.getElementById('auth-screen');
const foodGrid = document.getElementById('food-grid');
const cartItems = document.getElementById('cart-items');
const cartSummary = document.getElementById('cart-summary');

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
    setupEventListeners();
});

// Initialize app data
function initializeApp() {
    // Initialize food items if not exists
    if (!localStorage.getItem('foods')) {
        localStorage.setItem('foods', JSON.stringify(initialFoodItems));
    }
    
    // Initialize cart if not exists
    if (!localStorage.getItem('cart')) {
        localStorage.setItem('cart', JSON.stringify([]));
    }
    
    // Initialize orders if not exists
    if (!localStorage.getItem('orders')) {
        localStorage.setItem('orders', JSON.stringify([]));
    }
    
    // Check if user is authenticated
    const userData = localStorage.getItem('userData');
    if (userData) {
        showMainApp();
    } else {
        // Make sure auth screen is visible and main app is hidden
        mainApp.classList.remove('active');
        authScreen.classList.add('active');
    }
}

// Setup event listeners
function setupEventListeners() {
    // Auth form submission
    if (authForm) {
        authForm.addEventListener('submit', handleAuth);
    }
    
    // Search input
    const searchInput = document.getElementById('home-search-input');
    if (searchInput) {
        searchInput.addEventListener('input', handleSearch);
    }
}

// Authentication handler
function handleAuth(e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    
    if (name && phone) {
        // Create user data with timestamp
        const userData = {
            name,
            phone,
            loginTime: new Date().toISOString(),
            lastActive: new Date().toISOString()
        };
        
        // Store in user's local storage
        localStorage.setItem('userData', JSON.stringify(userData));
        
        // Store in users list for admin tracking
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const existingUserIndex = users.findIndex(u => u.phone === phone);
        
        if (existingUserIndex >= 0) {
            // Update existing user
            users[existingUserIndex] = {
                ...users[existingUserIndex],
                ...userData,
                lastLogin: userData.loginTime
            };
        } else {
            // Add new user
            users.push({
                ...userData,
                id: Date.now().toString(),
                registeredAt: userData.loginTime,
                lastLogin: userData.loginTime
            });
        }
        
        localStorage.setItem('users', JSON.stringify(users));
        showMainApp();
    }
}

// Show main app after authentication
function showMainApp() {
    authScreen.classList.remove('active');
    mainApp.classList.add('active');
    updateProfileInfo();
    displayFoodItems();
    displayCart();
    displayOrders();
}

// Update profile information
function updateProfileInfo() {
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');
    document.getElementById('profile-name').textContent = userData.name || '';
    document.getElementById('profile-phone').textContent = userData.phone || '';
}

// Search functionality
function handleSearch(e) {
    const searchTerm = e.target.value.toLowerCase();
    const foods = JSON.parse(localStorage.getItem('foods'));
    
    const filteredFoods = foods.filter(food => 
        food.name.toLowerCase().includes(searchTerm) ||
        food.description.toLowerCase().includes(searchTerm)
    );
    
    displayFilteredFoodItems(filteredFoods);
}

// Display filtered food items
function displayFilteredFoodItems(foods) {
    if (!foodGrid) return;
    foodGrid.innerHTML = '';
    foods.forEach(food => {
        const foodCard = createFoodCard(food);
        foodGrid.appendChild(foodCard);
    });
}

// Display all food items
function displayFoodItems() {
    if (!foodGrid) return;
    const foods = JSON.parse(localStorage.getItem('foods')) || initialFoodItems;
    foodGrid.innerHTML = '';
    foods.forEach(food => {
        const foodCard = createFoodCard(food);
        foodGrid.appendChild(foodCard);
    });
}

// Create food card element
function createFoodCard(food) {
    const card = document.createElement('div');
    card.className = 'food-card';
    card.innerHTML = `
        <img src="${food.image}" alt="${food.name}">
        <div class="food-info">
            <h3>${food.name}</h3>
            <p>${food.description}</p>
            <div class="food-card-footer">
                <span class="price">₹${food.price}</span>
                <button class="button button-primary" onclick="addToCart(${food.id})">
                    <span class="material-icons-round">add_shopping_cart</span>
                    Add to Cart
                </button>
            </div>
        </div>
    `;
    return card;
}

// Cart functionality
function addToCart(foodId) {
    const foods = JSON.parse(localStorage.getItem('foods'));
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const food = foods.find(f => f.id === foodId);
    
    if (!food) return;
    
    const existingItem = cart.find(item => item.id === foodId);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: food.id,
            name: food.name,
            price: food.price,
            image: food.image,
            quantity: 1
        });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart();
    showToast('Item added to cart');
}

// Display cart items
function displayCart() {
    if (!cartItems) return;
    
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    cartItems.innerHTML = '';
    
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-cart">
                <span class="material-icons-round">shopping_cart</span>
                <p>Your cart is empty</p>
            </div>
        `;
        return;
    }
    
    cart.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'cart-item';
        itemElement.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-details">
                <h4>${item.name}</h4>
                <p class="price">₹${item.price}</p>
                <div class="quantity-controls">
                    <button onclick="updateCartQuantity(${item.id}, ${item.quantity - 1})">
                        <span class="material-icons-round">remove</span>
                    </button>
                    <span>${item.quantity}</span>
                    <button onclick="updateCartQuantity(${item.id}, ${item.quantity + 1})">
                        <span class="material-icons-round">add</span>
                    </button>
                </div>
            </div>
            <button class="remove-button" onclick="removeFromCart(${item.id})">
                <span class="material-icons-round">delete</span>
            </button>
        `;
        cartItems.appendChild(itemElement);
    });
    
    // Update cart total
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    document.getElementById('cart-total').textContent = `₹${total}`;
}

// Update cart item quantity
function updateCartQuantity(foodId, newQuantity) {
    if (newQuantity < 1) {
        removeFromCart(foodId);
        return;
    }
    
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const item = cart.find(item => item.id === foodId);
    if (item) {
        item.quantity = newQuantity;
        localStorage.setItem('cart', JSON.stringify(cart));
        displayCart();
    }
}

// Remove item from cart
function removeFromCart(foodId) {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const updatedCart = cart.filter(item => item.id !== foodId);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    displayCart();
    showToast('Item removed from cart');
}

// Proceed to checkout
function proceedToCheckout() {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    if (cart.length === 0) {
        showToast('Your cart is empty!');
        return;
    }
    
    // Calculate total and items count
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const itemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    // Pre-fill user data if available
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');
    document.getElementById('order-name').value = userData.name || '';
    document.getElementById('order-phone').value = userData.phone || '';
    
    // Update order modal
    document.getElementById('order-total-price').textContent = `₹${total}`;
    
    // Show order modal
    document.getElementById('order-modal').classList.add('active');
}

// Place order
function placeOrder() {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    if (cart.length === 0) {
        showToast('Your cart is empty!');
        return;
    }
    
    // Get order details
    const name = document.getElementById('order-name').value;
    const phone = document.getElementById('order-phone').value;
    const address = document.getElementById('order-address').value;
    const notes = document.getElementById('order-notes').value;
    
    if (!name || !phone || !address) {
        showToast('Please fill all required fields');
        return;
    }
    
    // Calculate total
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    // Create order
    const order = {
        id: Date.now(),
        items: cart,
        total: total,
        status: 'Pending',
        timestamp: new Date().toISOString(),
        customer: {
            name: name,
            phone: phone,
            address: address,
            notes: notes
        }
    };
    
    // Save order
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    orders.push(order);
    localStorage.setItem('orders', JSON.stringify(orders));
    
    // Clear cart
    localStorage.setItem('cart', JSON.stringify([]));
    
    // Close order modal
    closeOrderModal();
    
    // Show success modal
    showOrderSuccessModal(order);
    
    // Redirect to home after 3 seconds
    setTimeout(() => {
        showScreen('home');
        closeOrderSuccessModal();
    }, 3000);
}

// Show order success modal
function showOrderSuccessModal(order) {
    // Format items text
    const itemsText = order.items.map(item => 
        `${item.quantity}x ${item.name}`
    ).join(', ');
    
    // Update success modal content
    document.getElementById('success-order-id').textContent = `Order #${order.id}`;
    document.getElementById('success-order-items').textContent = itemsText;
    document.getElementById('success-order-total').textContent = `Total: ₹${order.total}`;
    document.getElementById('success-order-name').textContent = `Name: ${order.customer.name}`;
    document.getElementById('success-order-phone').textContent = `Phone: ${order.customer.phone}`;
    document.getElementById('success-order-address').textContent = `Address: ${order.customer.address}`;
    
    // Show modal
    document.getElementById('order-success-modal').classList.add('active');
}

// Modal management
function closeOrderModal() {
    document.getElementById('order-modal').classList.remove('active');
    document.getElementById('order-form').reset();
}

function closeOrderSuccessModal() {
    document.getElementById('order-success-modal').classList.remove('active');
}

// Display orders
function displayOrders() {
    const ordersContainer = document.getElementById('orders-container');
    if (!ordersContainer) return;
    
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    ordersContainer.innerHTML = '';
    
    if (orders.length === 0) {
        ordersContainer.innerHTML = `
            <div class="empty-orders">
                <span class="material-icons-round">receipt_long</span>
                <p>No orders yet</p>
            </div>
        `;
        return;
    }
    
    orders.reverse().forEach(order => {
        const orderElement = createOrderElement(order);
        ordersContainer.appendChild(orderElement);
    });
}

// Create order element
function createOrderElement(order) {
    const element = document.createElement('div');
    element.className = 'order-card';
    
    const date = new Date(order.timestamp);
    const formattedDate = date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
    
    element.innerHTML = `
        <div class="order-header">
            <div class="order-title">
                <h4>Order #${order.id}</h4>
                <span class="status ${order.status.toLowerCase()}">${order.status}</span>
            </div>
            <p class="timestamp">${formattedDate}</p>
        </div>
        <div class="order-items">
            ${order.items.map(item => `
                <div class="order-item">
                    <img src="${item.image}" alt="${item.name}">
                    <div class="item-details">
                        <h5>${item.name}</h5>
                        <p>Quantity: ${item.quantity}</p>
                        <p class="price">₹${item.price * item.quantity}</p>
                    </div>
                </div>
            `).join('')}
        </div>
        <div class="order-footer">
            <div class="delivery-details">
                <p><strong>Deliver to:</strong> ${order.customer.name}</p>
                <p>${order.customer.address}</p>
                <p>Phone: ${order.customer.phone}</p>
            </div>
            <div class="order-total">
                <span>Total Amount:</span>
                <span class="price">₹${order.total}</span>
            </div>
        </div>
    `;
    
    return element;
}

// Show screens
function showScreen(screenId) {
    // Hide all screen content
    document.querySelectorAll('.screen-content').forEach(screen => {
        screen.classList.remove('active');
    });
    
    // Remove active class from all nav items
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Show selected screen
    const selectedScreen = document.getElementById(`${screenId}-screen`);
    if (selectedScreen) {
        selectedScreen.classList.add('active');
    }
    
    // Update navigation
    const navItem = document.querySelector(`.nav-item[onclick="showScreen('${screenId}')"]`);
    if (navItem) {
        navItem.classList.add('active');
    }
    
    // Refresh screen content
    if (screenId === 'home') {
        displayFoodItems();
    } else if (screenId === 'orders') {
        displayOrders();
    } else if (screenId === 'cart') {
        displayCart();
    }
}

// Show toast message
function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 300);
    }, 3000);
}
