import React, { useState } from "react";
import Login from "./pages/Login";
import Products from "./Products";
import Settings from "./pages/Settings";
import "./Admin.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [page, setPage] = useState("dashboard");

  const handleLogin = (email, password) => {
    // For now, simple login — we integrate backend next
    if (email === "admin@preciousscent.com" && password === "admin123") {
      setIsLoggedIn(true);
    } else {
      alert("Invalid login details");
    }
  };

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="admin-container">

      {/* SIDEBAR */}
      <aside className="admin-sidebar">
        <h2 className="sidebar-logo">Precious Scent</h2>

        <ul className="sidebar-menu">
          <li className={page === "dashboard" ? "active" : ""} onClick={() => setPage("dashboard")}>Dashboard</li>
          <li className={page === "products" ? "active" : ""} onClick={() => setPage("products")}>Products</li>
          <li className={page === "settings" ? "active" : ""} onClick={() => setPage("settings")}>Settings</li>
        </ul>
      </aside>

      {/* MAIN CONTENT */}
      <main className="admin-main">
        {page === "dashboard" && <h1>Dashboard</h1>}
        {page === "products" && <Products />}
        {page === "settings" && <Settings />}
      </main>
    </div>
  );
}

export default App;





