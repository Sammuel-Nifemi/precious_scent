document.addEventListener("DOMContentLoaded", () => {
    initCartSystem();
    initContactForm();
    initSmoothScroll();
    initWhatsAppPulse();
});



// Only run this once to create default owner login
if (!localStorage.getItem("owner")) {
    localStorage.setItem("owner", JSON.stringify({
        username: "owner",
        password: "admin123"
    }));
}


/* ========================================================
   1. CART SYSTEM (Add to cart + counter + localStorage)
======================================================== */

function initCartSystem() {
    const buttons = document.querySelectorAll('.add-to-cart');
    const cartCountSpan = document.getElementById('cart-count');

    if (!buttons || !cartCountSpan) return;

    let cart = JSON.parse(localStorage.getItem('preciousCart')) || [];

    function saveCart() {
        localStorage.setItem('preciousCart', JSON.stringify(cart));
    }

    function updateCartCount() {
        let total = cart.reduce((sum, item) => sum + item.qty, 0);
        cartCountSpan.textContent = total;
    }

    buttons.forEach(btn => {
        btn.addEventListener('click', () => {

            const name = btn.dataset.name || "Unnamed Product";
            const rawPrice = btn.dataset.price || "0";
            const price = Number(rawPrice.replace(/[^0-9]/g, ""));
            const image = btn.dataset.image || "";

            let existing = cart.find(item => item.name === name);

            if (existing) {
                existing.qty++;
            } else {
                cart.push({
                    name,
                    price,
                    image,
                    qty: 1
                });
            }

            saveCart();
            updateCartCount();

            alert(`${name} added to cart!`);
        });
    });

    updateCartCount();
}

/* ========================================================
   2. CONTACT FORM → SEND MESSAGE TO WHATSAPP
======================================================== */

function initContactForm() {
    const form = document.querySelector(".contact-form");
    if (!form) return;

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const name = document.getElementById("name").value.trim();
        const contact = document.getElementById("email").value.trim();
        const message = document.getElementById("message").value.trim();

        if (!name || !contact || !message) {
            alert("Please fill in all fields.");
            return;
        }

        const phone = "2348022130525";

        // Clean WhatsApp message format
        const text =
            `Hello Precious-Scent,%0A` +
            `I would like to order for this.%0A%0A` +
            `Name: ${name}%0A` +
            `Contact: ${contact}%0A%0A` +
            `Order Details:%0A${message}`;

        const url = `https://wa.me/${phone}?text=${text}`;
        window.open(url, "_blank");
    });
}

/* ========================================================
   3. SMOOTH SCROLL
======================================================== */

function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener("click", (e) => {
            const targetId = link.getAttribute("href");
            if (targetId.length <= 1) return;

            const section = document.querySelector(targetId);
            if (!section) return;

            e.preventDefault();
            section.scrollIntoView({ behavior: "smooth", block: "start" });
        });
    });
}

/* ========================================================
   4. WHATSAPP FLOATING BUTTON ANIMATION
======================================================== */

function initWhatsAppPulse() {
    const waBtn = document.querySelector(".whatsapp-float");
    if (!waBtn) return;

    setTimeout(() => {
        waBtn.classList.add("pulse");
    }, 1000);
}

/* ========================================================
   5. CLEAR CART (Cart Page)
======================================================== */

function clearCart() {
    localStorage.removeItem('preciousCart');
    window.location.reload();
}
