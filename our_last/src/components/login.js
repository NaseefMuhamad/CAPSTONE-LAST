// src/components/Login.js
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await axios.post("http://localhost:8080/api/login", {
        email,
        password,
      });
      const { token } = response.data; // Assuming backend returns a token
      localStorage.setItem("authToken", token); // Store token
      setMessage({ text: "Login successful! Redirecting...", type: "success" });
      setTimeout(() => navigate("/dashboard"), 1000); // Redirect to dashboard
    } catch (error) {
      const errorMsg = error.response?.data?.message || "Login failed. Try again.";
      setMessage({ text: errorMsg, type: "error" });
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Login</h2>
        {message && (
          <p className={message.type === "success" ? "success-message" : "error-message"}>
            {message.text}
          </p>
        )}
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="auth-button">Login</button>
        </form>
        <p>
          Need an account? <Link to="/signup" className="auth-link">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;