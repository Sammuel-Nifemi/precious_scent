const API_URL = "http://localhost:5000/products";

async function loadShopProducts() {
    try {
        const response = await fetch(API_URL);
        const products = await response.json();

        const shopDiv = document.getElementById("shop-products");
        shopDiv.innerHTML = "";

        if (products.length === 0) {
            shopDiv.innerHTML = "<p>No products available.</p>";
            return;
        }

        products.forEach(product => {
            const card = document.createElement("div");
            card.classList.add("product-card");

            card.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>₦${product.price}</p>

                <button class="add-btn"
                    onclick="addToCart('${product.name}', ${product.price}, '${product.image}')">
                    Add to Cart
                </button>
            `;

            shopDiv.appendChild(card);
        });

    } catch (err) {
        console.log("Error loading products:", err);
    }
}

loadShopProducts();

