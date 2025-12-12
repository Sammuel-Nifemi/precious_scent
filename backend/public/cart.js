
    /* ============================================================
   CART.JS — Handles cart display, quantity change, remove,
   clear cart, WhatsApp order, and Firebase order save.
============================================================ */

// Load Firebase (already included in HTML via CDN)
// db => Firestore instance from firebase.js

// Load cart from localStorage
let cart = JSON.parse(localStorage.getItem("preciousCart")) || [];

const cartItemsDiv = document.getElementById("cart-items");
const subtotalSpan = document.getElementById("cart-subtotal");
const deliverySpan = document.getElementById("cart-delivery");
const totalSpan = document.getElementById("cart-total");

// Delivery fee (optional)
const DELIVERY_FEE = 0;

// Save cart to localStorage
function saveCart() {
    localStorage.setItem("preciousCart", JSON.stringify(cart));
}

// Render cart items
function renderCart() {
    cartItemsDiv.innerHTML = "";

    if (cart.length === 0) {
        cartItemsDiv.innerHTML = `<p class="empty-cart">Your cart is currently empty.</p>`;
        subtotalSpan.textContent = "0";
        deliverySpan.textContent = DELIVERY_FEE.toLocaleString();
        totalSpan.textContent = "0";
        return;
    }

    let subtotal = 0;

    cart.forEach((item, index) => {
        const itemTotal = item.price * item.qty;
        subtotal += itemTotal;

        cartItemsDiv.innerHTML += `
            <div class="cart-item">

                <img src="${item.image}" alt="${item.name}">

                <div class="item-details">
                    <p class="item-name">${item.name}</p>
                    <p class="item-price">₦${item.price.toLocaleString()}</p>
                </div>

                <div class="item-quantity">
                    <button class="qty-btn" onclick="decreaseQty(${index})">-</button>
                    <span class="qty-value">${item.qty}</span>
                    <button class="qty-btn" onclick="increaseQty(${index})">+</button>
                </div>

                <button class="remove-btn" onclick="removeItem(${index})">
                    Remove
                </button>
            </div>
        `;
    });

    subtotalSpan.textContent = subtotal.toLocaleString();
    deliverySpan.textContent = DELIVERY_FEE.toLocaleString();
    totalSpan.textContent = (subtotal + DELIVERY_FEE).toLocaleString();
}

// Increase quantity
function increaseQty(index) {
    cart[index].qty += 1;
    saveCart();
    renderCart();
}

// Decrease quantity
function decreaseQty(index) {
    if (cart[index].qty > 1) {
        cart[index].qty -= 1;
    } else {
        cart.splice(index, 1);
    }
    saveCart();
    renderCart();
}

// Remove item
function removeItem(index) {
    cart.splice(index, 1);
    saveCart();
    renderCart();
}

// Clear cart
function clearCart() {
    cart = [];
    saveCart();
    renderCart();
}

/* ============================================================
   CHECKOUT — WhatsApp Order + Save to Firebase
============================================================ */


function checkout() {
    let cart = JSON.parse(localStorage.getItem("preciousCart")) || [];

    if (cart.length === 0) {
        alert("Your cart is empty.");
        return;
    }

    // WhatsApp number
    const phone = "2348022130525";

    // Get today's date (auto)
    const today = new Date().toLocaleDateString("en-GB"); // DD/MM/YYYY

    // ✨ NEW BRANDED WHATSAPP MESSAGE
    let orderText = 
`🌸 *Precious Scent Order Request*
📅 *Date:* ${today}

Hello Precious-Scent,
I would like to place an order.

🛒 *Order Details:*  
(Please type your order here)

👤 *Customer Information:*  
Name:  
Phone:  
Delivery Address:  
`;

    const url = `https://wa.me/${phone}?text=${encodeURIComponent(orderText)}`;
    window.open(url, "_blank");
}



// INITIAL RENDER
renderCart();
