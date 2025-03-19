
// // src/components/Login.js
// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { loginUser } from '../api/api'; // Adjust path
// import { useAuth } from '../context/AuthContext';

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [role, setRole] = useState("student"); // Default role
//   const [adminSecret, setAdminSecret] = useState(""); // For admin role
//   const [message, setMessage] = useState("");
//   const navigate = useNavigate();
//   const { login } = useAuth();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setMessage("");

//     try {
//       console.log("Attempting to log in with:", { email, password, role, adminSecret });
//       const data = await loginUser(email, password, role, role === "admin" ? adminSecret : null); // Use API call
//       login({ userId: data.userId, role: data.role, token: data.token }); // Sync with context
//       setMessage({ text: "Login successful! Redirecting...", type: "success" });

//       // Redirecting based on role
//       if (data.role === "president") {
//         setTimeout(() => navigate("/PresDash"), 1000); // Redirect to President Dashboard
//       } else if (data.role === "admin") {
//         setTimeout(() => navigate("/Admin"), 1000); // Redirect to Admin Dashboard
//       } else {
//         setTimeout(() => navigate("/dashboard"), 1000); // Redirect to default dashboard
//       }
//     } catch (error) {
//       console.error("Login error:", error);
//       const errorMsg = error.response?.data?.message || "Login failed. Try again.";
//       setMessage({ text: errorMsg, type: "error" });
//     }
//   };

//   return (
//     <div className="auth-container">
//       <div className="auth-box">
//         <h2>Login</h2>
//         {message && (
//           <p className={message.type === "success" ? "success-message" : "error-message"}>
//             {message.text}
//           </p>
//         )}
//         <form onSubmit={handleLogin}>
//           <input
//             type="email"
//             placeholder="Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//           <select
//             value={role}
//             onChange={(e) => setRole(e.target.value)}
//             required
//           >
//             <option value="student">Student</option>
//             <option value="president">President</option>
//             <option value="admin">Admin</option>
//           </select>
//           {role === "admin" && (
//             <input
//               type="password"
//               placeholder="Admin Secret Key"
//               value={adminSecret}
//               onChange={(e) => setAdminSecret(e.target.value)}
//               required
//             />
//           )}
//           <button type="submit" className="auth-button">Login</button>
//         </form>
//         <p>
//           Need an account? <Link to="/signup" className="auth-link">Sign Up</Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Login; 

// src/components/Login.js
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from '../api/api'; // Adjust path
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const data = await loginUser(email, password); // Use API call
      login({ userId: data.userId, role: data.role, token: data.token }); // Sync with context
      setMessage({ text: "Login successful! Redirecting...", type: "success" });

      // Redirecting based on role
      if (data.role === "president") {
        setTimeout(() => navigate("/PresDash"), 1000); // Redirect to President Dashboard
      } else if (data.role === "admin") {
        setTimeout(() => navigate("/Admin"), 1000); // Redirect to Admin Dashboard
      } else {
        setTimeout(() => navigate("/dashboard"), 1000); // Redirect to default dashboard
      }
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