import React, { useState } from "react";
import "./Login.css";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    // Backend authentication call will come later
    onLogin(email, password);
  };

  return (
    <div className="login-container">
      <div className="login-card">

        {/* Logo */}
        <h1 className="login-title">
          Precious <span>Scent</span>
        </h1>

        <p className="login-sub">Admin Access</p>

        <form onSubmit={handleLogin} className="login-form">

          <label>Email Address</label>
          <input
            type="email"
            placeholder="admin@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" className="login-btn">Login</button>
        </form>

        <p className="forgot">Forgot Password?</p>
      </div>
    </div>
  );
}
