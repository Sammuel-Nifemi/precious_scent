import React, { useEffect, useState } from "react";
import "./Admin.css";

function Products() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    name: "",
    price: "",
    image: "",
  });

  // Fetch products from backend
  const fetchProducts = async () => {
    try {
      const res = await fetch("http://localhost:5000/products");
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.log("Error fetching products", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Add product
  const addProduct = async () => {
    if (!form.name || !form.price || !form.image) {
      alert("Fill all fields");
      return;
    }

    await fetch("http://localhost:5000/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    setForm({ name: "", price: "", image: "" });
    fetchProducts();
  };

  // Delete product
  const deleteProduct = async (id) => {
    await fetch(`http://localhost:5000/products/${id}`, {
      method: "DELETE",
    });

    fetchProducts();
  };

  return (
    <div className="admin-content">

      <h2>Manage Products</h2>

      {/* ADD PRODUCT FORM */}
      <div className="product-form">
        <input
          type="text"
          placeholder="Product Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
        />

        <input
          type="text"
          placeholder="Image URL"
          value={form.image}
          onChange={(e) => setForm({ ...form, image: e.target.value })}
        />

        <button onClick={addProduct}>Add Product</button>
      </div>

      {/* PRODUCTS LIST */}
      <div className="product-list">
        {products.length === 0 ? (
          <p>No products yet.</p>
        ) : (
          products.map((p) => (
            <div key={p.id} className="product-card-admin">
              <img src={p.image} alt={p.name} />

              <h4>{p.name}</h4>
              <p>₦{p.price}</p>

              <button className="delete-btn" onClick={() => deleteProduct(p.id)}>
                Delete
              </button>
            </div>
          ))
        )}
      </div>

    </div>
  );
}

export default Products;
