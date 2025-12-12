[]
const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const auth = require("./auth");

const productsFile = path.join(__dirname, "../data/products.json");

// Helper function to read products
function readProducts() {
    return JSON.parse(fs.readFileSync(productsFile, "utf8"));
}

// Helper function to write products
function writeProducts(data) {
    fs.writeFileSync(productsFile, JSON.stringify(data, null, 2));
}

// ------------------------------------
// GET ALL PRODUCTS (staff + admin)
// ------------------------------------
router.get("/", auth.staffOrAdmin, (req, res) => {
    const products = readProducts();
    res.json(products);
});

// ------------------------------------
// ADD NEW PRODUCT (staff + admin)
// ------------------------------------
router.post("/add", auth.staffOrAdmin, (req, res) => {
    const { name, price, description, image } = req.body;

    if (!name || !price) {
        return res.status(400).json({ message: "Name and price required" });
    }

    const products = readProducts();

    const newProduct = {
        id: Date.now(),
        name,
        price,
        description: description || "",
        image: image || ""
    };

    products.push(newProduct);
    writeProducts(products);

    res.json({ message: "Product added", product: newProduct });
});

// ------------------------------------
// EDIT PRODUCT (staff + admin)
// ------------------------------------
router.put("/edit/:id", auth.staffOrAdmin, (req, res) => {
    const id = Number(req.params.id);
    const { name, price, description, image } = req.body;

    const products = readProducts();
    const index = products.findIndex(p => p.id === id);

    if (index === -1) {
        return res.status(404).json({ message: "Product not found" });
    }

    products[index] = {
        ...products[index],
        name: name || products[index].name,
        price: price || products[index].price,
        description: description || products[index].description,
        image: image || products[index].image
    };

    writeProducts(products);

    res.json({ message: "Product updated", product: products[index] });
});

// ------------------------------------
// DELETE PRODUCT (ADMIN ONLY)
// ------------------------------------
router.delete("/delete/:id", auth.adminOnly, (req, res) => {
    const id = Number(req.params.id);

    const products = readProducts();
    const updated = products.filter(p => p.id !== id);

    if (updated.length === products.length) {
        return res.status(404).json({ message: "Product not found" });
    }

    writeProducts(updated);

    res.json({ message: "Product deleted successfully" });
});

module.exports = router;
