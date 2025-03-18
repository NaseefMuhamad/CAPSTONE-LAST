// src/components/Signup.js
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("president");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await axios.post("http://localhost:8080/api/register", {
        name,
        email,
        password,
        role,
      });
      const { token } = response.data; // Assuming backend returns a token
      localStorage.setItem("authToken", token); // Store token
      setMessage({ text: "Signup successful! Redirecting...", type: "success" });
      setTimeout(() => navigate("/dashboard"), 1000); // Redirect to dashboard
    } catch (error) {
      const errorMsg = error.response?.data?.message || "Signup failed. Try again.";
      setMessage({ text: errorMsg, type: "error" });
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Sign Up</h2>
        {message && (
          <p className={message.type === "success" ? "success-message" : "error-message"}>
            {message.text}
          </p>
        )}
        <form onSubmit={handleSignup}>
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
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
          <select value={role} onChange={(e) => setRole(e.target.value)} required>
            <option value="president">President</option>
            <option value="admin">Admin</option>
          </select>
          <button type="submit" className="auth-button">Sign Up</button>
        </form>
        <p>
          Already have an account? <Link to="/login" className="auth-link">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;