// DOM Elements
const authScreen = document.getElementById('auth-screen');
const mainApp = document.getElementById('main-app');
const authForm = document.getElementById('auth-form');

// Admin credentials (in real app, this would be handled server-side)
const ADMIN_EMAIL = 'adminhum@gmail.com';
const ADMIN_PASSWORD = 'adminhum123';

// Screen Management
function showScreen(screenId) {
    console.log('Showing screen:', screenId);
    // Hide all screens first
    document.querySelectorAll('.screen-content').forEach(screen => {
        screen.classList.remove('active');
    });
    
    // Show the selected screen
    const screenToShow = document.getElementById(screenId + '-screen');
    if (screenToShow) {
        screenToShow.classList.add('active');
        console.log('Screen activated:', screenId);
        
        // Load screen specific data
        switch(screenId) {
            case 'dashboard':
                loadDashboardStats();
                break;
            case 'orders':
                loadOrders();
                break;
            case 'menu':
                loadMenuItems();
                break;
            case 'users':
                loadUsers();
                break;
        }
    }
    
    // Update active state in bottom navigation
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    const activeNavItem = document.querySelector(`.nav-item[onclick*="${screenId}"]`);
    if (activeNavItem) {
        activeNavItem.classList.add('active');
    }
}

// Authentication
function handleAuth(event) {
    event.preventDefault();
    console.log('Handling authentication...');
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        // Store admin session
        localStorage.setItem('adminSession', 'true');
        
        // Show main app
        authScreen.classList.remove('active');
        mainApp.classList.add('active');
        
        // Initialize dashboard
        showScreen('dashboard');
        console.log('Admin authenticated');
    } else {
        alert('Invalid credentials');
    }
}

// Check if admin is already authenticated
function checkAuth() {
    console.log('Checking admin authentication...');
    const adminSession = localStorage.getItem('adminSession');
    
    if (adminSession === 'true') {
        authScreen.classList.remove('active');
        mainApp.classList.add('active');
        showScreen('dashboard');
        console.log('Admin session found');
    } else {
        authScreen.classList.add('active');
        mainApp.classList.remove('active');
        console.log('No admin session found');
    }
}

// Logout Handler
function handleLogout() {
    console.log('Logging out admin...');
    localStorage.removeItem('adminSession');
    authScreen.classList.add('active');
    mainApp.classList.remove('active');
    if (authForm) {
        authForm.reset();
    }
    console.log('Admin logged out');
}

// Dashboard Stats
function loadDashboardStats() {
    console.log('Loading dashboard stats...');
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    const foods = JSON.parse(localStorage.getItem('foods') || '[]');
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    document.getElementById('total-orders').textContent = orders.length;
    document.getElementById('pending-orders').textContent = orders.filter(order => order.status === 'Pending').length;
    document.getElementById('total-items').textContent = foods.length;
    document.getElementById('total-users').textContent = users.length;
}

// Orders Management
function loadOrders() {
    console.log('Loading orders...');
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    const container = document.getElementById('orders-container');
    
    if (container) {
        container.innerHTML = '';
        orders.forEach(order => {
            const orderElement = createOrderElement(order);
            container.appendChild(orderElement);
        });
    }
}

function createOrderElement(order) {
    const div = document.createElement('div');
    div.className = 'order-card';
    
    const date = new Date(order.timestamp);
    const formattedDate = date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
    
    div.innerHTML = `
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
                        <p class="price">₹${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                </div>
            `).join('')}
        </div>
        <div class="order-footer">
            <div class="delivery-details">
                <p><strong>Deliver to:</strong> ${order.customer.name}</p>
                <p>${order.customer.address}</p>
                <p>Phone: ${order.customer.phone}</p>
                ${order.customer.notes ? `<p><strong>Notes:</strong> ${order.customer.notes}</p>` : ''}
            </div>
            <div class="order-total">
                <span>Total Amount:</span>
                <span class="price">₹${order.total.toFixed(2)}</span>
            </div>
        </div>
        <div class="order-actions">
            ${order.status === 'Pending' ? `
                <button class="button button-primary" onclick="updateOrderStatus(${order.id}, 'Completed')">
                    <span class="material-icons-round">check_circle</span>
                    Mark as Completed
                </button>
            ` : ''}
            <button class="button button-secondary" onclick="deleteOrder(${order.id})">
                <span class="material-icons-round">delete</span>
                Delete Order
            </button>
        </div>
    `;
    return div;
}

function updateOrderStatus(orderId, newStatus) {
    console.log('Updating order status:', orderId, newStatus);
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    const updatedOrders = orders.map(order => 
        order.id === orderId ? {...order, status: newStatus} : order
    );
    localStorage.setItem('orders', JSON.stringify(updatedOrders));
    loadOrders();
    loadDashboardStats();
}

function deleteOrder(orderId) {
    console.log('Deleting order:', orderId);
    if (confirm('Are you sure you want to delete this order?')) {
        const orders = JSON.parse(localStorage.getItem('orders') || '[]');
        const filteredOrders = orders.filter(order => order.id !== orderId);
        localStorage.setItem('orders', JSON.stringify(filteredOrders));
        loadOrders();
        loadDashboardStats();
    }
}

function filterOrders(filter) {
    console.log('Filtering orders:', filter);
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    const container = document.getElementById('orders-container');
    
    if (container) {
        container.innerHTML = '';
        let filteredOrders = orders;
        
        if (filter !== 'all') {
            filteredOrders = orders.filter(order => 
                order.status.toLowerCase() === filter
            );
        }
        
        filteredOrders.forEach(order => {
            const orderElement = createOrderElement(order);
            container.appendChild(orderElement);
        });
        
        // Update active filter
        document.querySelectorAll('.chip').forEach(chip => {
            chip.classList.remove('active');
        });
        document.querySelector(`.chip[onclick*="${filter}"]`).classList.add('active');
    }
}

// Menu Management
function loadMenuItems() {
    const foods = JSON.parse(localStorage.getItem('foods') || '[]');
    const container = document.getElementById('menu-container');
    displayFilteredMenuItems(foods, container);

    // Add search functionality
    const searchInput = document.getElementById('menu-search-input');
    if (searchInput) {
        searchInput.addEventListener('input', handleMenuSearch);
    }
}

function handleMenuSearch(e) {
    const searchTerm = e.target.value.toLowerCase().trim();
    const foods = JSON.parse(localStorage.getItem('foods') || '[]');
    const container = document.getElementById('menu-container');
    
    if (searchTerm === '') {
        displayFilteredMenuItems(foods, container);
        return;
    }
    
    const filteredFoods = foods.filter(food => 
        food.name.toLowerCase().includes(searchTerm) ||
        food.description.toLowerCase().includes(searchTerm)
    );
    
    displayFilteredMenuItems(filteredFoods, container);
}

function displayFilteredMenuItems(foods, container) {
    if (!container) return;
    
    container.innerHTML = '';
    
    if (foods.length === 0) {
        container.innerHTML = `
            <div class="no-results">
                <span class="material-icons-round">search_off</span>
                <p>No items found</p>
            </div>
        `;
        return;
    }
    
    foods.forEach(food => {
        container.appendChild(createFoodElement(food));
    });
}

function createFoodElement(food) {
    const card = document.createElement('div');
    card.className = 'food-card';
    card.innerHTML = `
        <img src="${food.image}" alt="${food.name}">
        <div class="food-card-content">
            <h3>${food.name}</h3>
            <p class="description">${food.description || 'No description available'}</p>
            <div class="price">₹${food.price}</div>
        </div>
        <div class="food-card-actions">
            <button class="button button-secondary" onclick="deleteMenuItem(${food.id})">
                <span class="material-icons-round">delete</span>
                Delete
            </button>
        </div>
    `;
    return card;
}

function deleteMenuItem(foodId) {
    console.log('Deleting menu item:', foodId);
    if (confirm('Are you sure you want to delete this menu item?')) {
        const foods = JSON.parse(localStorage.getItem('foods') || '[]');
        const filteredFoods = foods.filter(food => food.id !== foodId);
        localStorage.setItem('foods', JSON.stringify(filteredFoods));
        loadMenuItems();
        loadDashboardStats();
    }
}

function showAddItemModal() {
    document.getElementById('add-item-modal').classList.add('active');
    // Clear form
    document.getElementById('add-item-form').reset();
}

function closeAddItemModal() {
    document.getElementById('add-item-modal').classList.remove('active');
}

function addMenuItem() {
    const name = document.getElementById('item-name').value;
    const description = document.getElementById('item-description').value;
    const price = document.getElementById('item-price').value;
    const image = document.getElementById('item-image').value;
    
    if (!name || !description || !price || !image) {
        alert('Please fill in all fields');
        return;
    }
    
    const foods = JSON.parse(localStorage.getItem('foods') || '[]');
    const newFood = {
        id: Date.now(),
        name,
        description,
        price: parseInt(price),
        image
    };
    
    foods.push(newFood);
    localStorage.setItem('foods', JSON.stringify(foods));
    
    closeAddItemModal();
    loadMenuItems();
    loadDashboardStats();
}

// User Management
let users = [];
let lastUserCheck = 0;

// Fetch users from localStorage and set up real-time updates
function initializeUserManagement() {
    console.log('Initializing user management...');
    fetchUsers();
    updateUserCount();
    
    // Set up polling for new users and updates
    setInterval(checkForUserUpdates, 5000); // Check every 5 seconds
}

// Check for new users or updates
function checkForUserUpdates() {
    const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
    
    // Check for new users
    if (storedUsers.length > users.length) {
        const newUsers = storedUsers.filter(stored => 
            !users.some(existing => existing.id === stored.id)
        );
        
        newUsers.forEach(newUser => {
            showNotification(`New user registered: ${newUser.name}`);
        });
    }
    
    // Check for user logins
    storedUsers.forEach(stored => {
        const existing = users.find(u => u.id === stored.id);
        if (existing && stored.lastLogin !== existing.lastLogin) {
            showNotification(`User logged in: ${stored.name}`);
        }
    });
    
    // Update local users array
    users = storedUsers;
    displayUsers();
    updateUserCount();
}

// Show notification in admin panel
function showNotification(message) {
    const notificationContainer = document.getElementById('notification-container');
    if (!notificationContainer) {
        // Create notification container if it doesn't exist
        const container = document.createElement('div');
        container.id = 'notification-container';
        container.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 1000;
        `;
        document.body.appendChild(container);
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.style.cssText = `
        background-color: #4CAF50;
        color: white;
        padding: 12px 24px;
        margin-bottom: 10px;
        border-radius: 4px;
        box-shadow: 0 2px 5px rgba(0,0,0,0.2);
        animation: slideIn 0.5s ease-out;
    `;
    notification.innerHTML = `
        <div style="display: flex; align-items: center;">
            <span class="material-icons-round" style="margin-right: 8px;">notification_important</span>
            <span>${message}</span>
        </div>
    `;
    
    // Add to container
    const container = document.getElementById('notification-container');
    container.appendChild(notification);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.5s ease-out';
        setTimeout(() => notification.remove(), 500);
    }, 5000);
}

// Add notification styles
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);

// Fetch users from localStorage
function fetchUsers() {
    try {
        const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
        users = storedUsers;
        displayUsers();
        updateUserCount();
    } catch (error) {
        console.error('Error fetching users:', error);
    }
}

// Display users in cards
function displayUsers() {
    const usersContainer = document.getElementById('users-container');
    if (!usersContainer) return;
    
    usersContainer.innerHTML = '';

    if (users.length === 0) {
        usersContainer.innerHTML = '<p class="no-results">No users registered yet</p>';
        return;
    }

    users.forEach(user => {
        const userCard = document.createElement('div');
        userCard.className = 'user-card';
        userCard.innerHTML = `
            <div class="user-avatar">
                <span class="material-icons-round">account_circle</span>
            </div>
            <div class="user-details">
                <h4>${user.name || 'N/A'}</h4>
                <p><span class="material-icons-round">email</span> ${user.email || 'N/A'}</p>
                <p><span class="material-icons-round">phone</span> ${user.phone || 'N/A'}</p>
                <p class="user-date"><span class="material-icons-round">calendar_today</span> ${new Date(user.createdAt).toLocaleDateString()}</p>
            </div>
        `;
        usersContainer.appendChild(userCard);
    });
}

// Update total users count in dashboard
function updateUserCount() {
    const totalUsersElement = document.getElementById('total-users');
    if (totalUsersElement) {
        totalUsersElement.textContent = users.length;
    }
}

// Search users
const userSearchInput = document.getElementById('user-search');
if (userSearchInput) {
    userSearchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const filteredUsers = users.filter(user => 
            (user.name && user.name.toLowerCase().includes(searchTerm)) ||
            (user.email && user.email.toLowerCase().includes(searchTerm)) ||
            (user.phone && user.phone.toLowerCase().includes(searchTerm))
        );
        displayFilteredUsers(filteredUsers);
    });
}

function displayFilteredUsers(filteredUsers) {
    const usersContainer = document.getElementById('users-container');
    if (!usersContainer) return;

    usersContainer.innerHTML = '';

    if (filteredUsers.length === 0) {
        usersContainer.innerHTML = '<p class="no-results">No users found</p>';
        return;
    }

    filteredUsers.forEach(user => {
        const userCard = document.createElement('div');
        userCard.className = 'user-card';
        userCard.innerHTML = `
            <div class="user-avatar">
                <span class="material-icons-round">account_circle</span>
            </div>
            <div class="user-details">
                <h4>${user.name || 'N/A'}</h4>
                <p><span class="material-icons-round">email</span> ${user.email || 'N/A'}</p>
                <p><span class="material-icons-round">phone</span> ${user.phone || 'N/A'}</p>
                <p class="user-date"><span class="material-icons-round">calendar_today</span> ${new Date(user.createdAt).toLocaleDateString()}</p>
            </div>
        `;
        usersContainer.appendChild(userCard);
    });
}

// Initialize user management when the page loads
document.addEventListener('DOMContentLoaded', () => {
    initializeUserManagement();
});

// Function to clear all admin data
function clearAdminData() {
    if (confirm('Are you sure you want to clear all data? This action cannot be undone.')) {
        // Clear all localStorage data
        localStorage.removeItem('adminData');
        localStorage.removeItem('menuItems');
        localStorage.removeItem('orders');
        localStorage.removeItem('users');
        
        // Reset UI elements
        document.getElementById('total-orders').textContent = '0';
        document.getElementById('pending-orders').textContent = '0';
        document.getElementById('total-items').textContent = '0';
        document.getElementById('total-users').textContent = '0';
        
        document.getElementById('orders-container').innerHTML = '';
        document.getElementById('menu-container').innerHTML = '';
        document.getElementById('users-container').innerHTML = '';
        
        // Reset search input
        document.getElementById('menu-search-input').value = '';
        
        // Show auth screen and hide main app
        document.getElementById('auth-screen').classList.add('active');
        document.getElementById('main-app').classList.remove('active');
        
        // Reset auth form
        document.getElementById('auth-form').reset();
        
        // Show confirmation message
        alert('All admin data has been cleared successfully!');
    }
}

// Add clear data button to top app bar
document.querySelector('.top-app-bar').innerHTML += `
    <button class="button button-secondary" onclick="clearAdminData()">
        <span class="material-icons-round">delete_forever</span>
        Clear All Data
    </button>
`;

// Event Listeners
if (authForm) {
    authForm.addEventListener('submit', handleAuth);
}

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    console.log('Admin dashboard initializing...');
    checkAuth();
});
