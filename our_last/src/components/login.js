import React, { useState, useContext} from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {AuthContext} from '../context/AuthContext';
import "./Auth.css"; // Shared CSS file


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(""); // Message state
  const navigate = useNavigate();

  const {login} = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage(""); // Clear previous messages

    try {
      const response= await axios.post("http://localhost:8080/api/signin", {
        email,
        password,
      });
      console.log(response);
      const userData = response.data;
      console.log('User Data after login:', userData);
      login(userData);

      setMessage({ text: "Login successful! Redirecting...", type: "success" });
      setTimeout(() => {
        if (userData.role === 'president'){
          console.log('Redirecting to /PresDash')
          navigate('/PresDash');
        } else{
        navigate("/dashboard"); 
        }// Redirect to dashboard
      }, 2000);
    } catch (error) {
      const errorMsg = error.response?.data?.message || "Invalid email or password.";
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
          Don't have an account? <Link to="/signup" className="auth-link">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;