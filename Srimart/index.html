<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover">
    <title>Sriart</title>
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons+Round" rel="stylesheet">
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="app-container">
        <!-- Auth Screen -->
        <div id="auth-screen" class="screen active">
            <div class="auth-container">
                <div class="auth-header">
                    <img src="file:///C:/Users/win10/Pictures/Screenshot_2025-01-18-15-44-20-34~2-fotor-20250118154932-fotor-bg-remover-2025011815523%20(1).png" alt="Srimart Logo" class="auth-logo">
                    <h1>Welcome</h1>
                    <p>Please enter your details to continue</p>
                </div>
                <form id="auth-form">
                    <div class="input-field">
                        <span class="material-icons-round">person</span>
                        <input type="text" id="name" placeholder=" " required>
                        <label for="name">Full Name</label>
                    </div>
                    <div class="input-field">
                        <span class="material-icons-round">phone</span>
                        <input type="tel" id="phone" placeholder=" " required>
                        <label for="phone">Phone Number</label>
                    </div>
                    <button type="submit" class="button button-primary">
                        Continue
                        <span class="material-icons-round">arrow_forward</span>
                    </button>
                </form>
            </div>
        </div>

        <!-- Main App -->
        <div id="main-app" class="screen">
            <!-- Content Container -->
            <div class="content-container">
                <!-- Home Screen -->
                <div id="home-screen" class="screen-content active">
                    <div class="search-bar">
                        <span class="material-icons-round">search</span>
                        <input type="text" id="home-search-input" placeholder="Search for food...">
                    </div>
                    <div class="food-grid" id="food-grid"></div>
                </div>

                <!-- Orders Screen -->
                <div id="orders-screen" class="screen-content">
                    <div class="section-title">
                        <h3>Your Orders</h3>
                    </div>
                    <div class="orders-list" id="orders-container"></div>
                </div>

                <!-- Cart Screen -->
                <div id="cart-screen" class="screen-content">
                    <div class="section-title">
                        <h3>Shopping Cart</h3>
                    </div>
                    <div class="cart-container">
                        <div id="cart-items" class="cart-items"></div>
                        <div id="cart-summary" class="cart-summary">
                            <div class="total">
                                <span>Total Amount:</span>
                                <span id="cart-total">₹0</span>
                            </div>
                            <button class="button button-primary" onclick="proceedToCheckout()">
                                <span class="material-icons-round">shopping_cart_checkout</span>
                                Proceed to Checkout
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Profile Screen -->
                <div id="profile-screen" class="screen-content">
                    <div class="profile-header">
                        <div class="profile-avatar">
                            <span class="material-icons-round">account_circle</span>
                        </div>
                        <h3 id="profile-name"></h3>
                        <p id="profile-phone"></p>
                    </div>
                    <div class="profile-menu">
                        <div class="menu-item" onclick="showScreen('home')">
                            <span class="material-icons-round">home</span>
                            <span>Home</span>
                            <span class="material-icons-round">chevron_right</span>
                        </div>
                        <div class="menu-item" onclick="showScreen('cart')">
                            <span class="material-icons-round">shopping_cart</span>
                            <span>My Cart</span>
                            <span class="material-icons-round">chevron_right</span>
                        </div>
                        <div class="menu-item" onclick="showScreen('orders')">
                            <span class="material-icons-round">receipt_long</span>
                            <span>Orders</span>
                            <span class="material-icons-round">chevron_right</span>
                        </div>
                        <div class="menu-item" onclick="window.location.href='tel:9708506737'">
                            <span class="material-icons-round">help</span>
                            <span>Help & Support</span>
                            <span class="material-icons-round">chevron_right</span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Bottom Navigation -->
            <nav class="bottom-nav">
                <button class="nav-item active" onclick="showScreen('home')">
                    <span class="material-icons-round">home</span>
                    <span>Home</span>
                </button>
                <button class="nav-item" onclick="showScreen('cart')">
                    <span class="material-icons-round">shopping_cart</span>
                    <span>Cart</span>
                </button>
                <button class="nav-item" onclick="showScreen('orders')">
                    <span class="material-icons-round">receipt_long</span>
                    <span>Orders</span>
                </button>
                <button class="nav-item" onclick="showScreen('profile')">
                    <span class="material-icons-round">person</span>
                    <span>Profile</span>
                </button>
            </nav>
        </div>

        <!-- Order Modal -->
        <div class="modal" id="order-modal">
            <div class="modal-content">
                <div class="modal-header">
                    <h4>Place Order</h4>
                    <button class="icon-button" onclick="closeOrderModal()">
                        <span class="material-icons-round">close</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="selected-food">
                        <img id="order-food-image" src="" alt="Food Image">
                        <div class="food-details">
                            <h3 id="order-food-name"></h3>
                            <p id="order-food-price"></p>
                        </div>
                    </div>
                    <form id="order-form" onsubmit="event.preventDefault(); placeOrder();">
                        <div class="input-field">
                            <span class="material-icons-round">person</span>
                            <input type="text" id="order-name" placeholder=" " required>
                            <label for="order-name">Full Name</label>
                        </div>
                        <div class="input-field">
                            <span class="material-icons-round">phone</span>
                            <input type="tel" id="order-phone" placeholder=" " required>
                            <label for="order-phone">Mobile Number</label>
                        </div>
                        <div class="input-field">
                            <span class="material-icons-round">location_on</span>
                            <input type="text" id="order-address" placeholder=" " required>
                            <label for="order-address">Delivery Address</label>
                        </div>
                        <div class="input-field">
                            <span class="material-icons-round">shopping_cart</span>
                            <input type="number" id="order-quantity" min="1" value="1" onchange="updateOrderTotal()" placeholder=" " required>
                            <label for="order-quantity">Quantity</label>
                        </div>
                        <div class="input-field">
                            <span class="material-icons-round">note</span>
                            <textarea id="order-notes" placeholder=" " rows="3"></textarea>
                            <label for="order-notes">Special Instructions (Optional)</label>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <div class="order-total">
                        <span>Total Amount:</span>
                        <span id="order-total-price">₹0.00</span>
                    </div>
                    <div class="modal-actions">
                        <button class="button button-secondary" onclick="closeOrderModal()">Cancel</button>
                        <button class="button button-primary" onclick="placeOrder()">
                            <span class="material-icons-round">shopping_cart_checkout</span>
                            Place Order
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Order Success Modal -->
        <div class="modal" id="order-success-modal">
            <div class="modal-content">
                <div class="modal-header">
                    <h4>Order Placed Successfully!</h4>
                    <button class="icon-button" onclick="closeOrderSuccessModal()">
                        <span class="material-icons-round">close</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="success-icon">
                        <span class="material-icons-round">check_circle</span>
                    </div>
                    <div class="order-details">
                        <h5>Order Details</h5>
                        <p id="success-order-id"></p>
                        <p id="success-order-items"></p>
                        <p id="success-order-total"></p>
                    </div>
                    <div class="delivery-details">
                        <h5>Delivery Details</h5>
                        <p id="success-order-name"></p>
                        <p id="success-order-phone"></p>
                        <p id="success-order-address"></p>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script src="app.js"></script>
</body>
</html>
