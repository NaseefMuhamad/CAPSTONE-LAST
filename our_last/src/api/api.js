import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api"; // Adjust this if needed

// Function to register a user (with optional admin secret key)
export const registerUser = async (name, email, password, role = "student", adminSecret = null) => {
    try {
        const requestData = { name, email, password, role };

        // Include adminSecret only if the role is "admin"
        if (role === "admin" && adminSecret) {
            requestData.admin_secret = adminSecret;
        }

        const response = await axios.post(`${API_BASE_URL}/register`, requestData);

        console.log("Registration successful:", response.data);
        return response.data;
    } catch (error) {
        console.error("Registration failed:", error.response?.data || error.message);
        throw error;
    }
};

// Function to log in a user
export const loginUser = async (email, password) => {
    try {
        const response = await axios.post(
            `${API_BASE_URL}/signin`,
            { email, password }, // Only send email and password
            { headers: { "Content-Type": "application/json" } }
        );

        console.log("Login successful:", response.data);
        localStorage.setItem("token", response.data.token); // Store token
        return response.data;
    } catch (error) {
        console.error("Login failed:", error.response?.data || error.message);
        throw error;
    }
};
// // Function to log in a user

// export const loginUser = async (email, password, role, adminSecret = null) => {
//     try {
//         const requestData = { email, password, role };

//         // Include adminSecret only if the role is "admin"
//         if (role === "admin" && adminSecret) {
//             requestData.ADMIN_SECRET = adminSecret;
//         }

//         const response = await axios.post(
//             `${API_BASE_URL}/signin`,
//             requestData,
//             { headers: { "Content-Type": "application/json" } }
//         );

//         console.log("Login successful:", response.data);
//         localStorage.setItem("token", response.data.token); // Store token
//         return response.data;
//     } catch (error) {
//         console.error("Login failed:", error.response?.data || error.message);
//         throw error;
//     }
// };
// export const loginUser = async (email, password, role, adminSecret= null) => {
//     try {
//         const response = await axios.post(
//             `${API_BASE_URL}/signin`,
//             { email, password }, // ✅ Corrected Request Body
//             { headers: { "Content-Type": "application/json" } } // ✅ Ensuring JSON format
//         );

//         console.log("Login successful:", response.data);
//         localStorage.setItem("token", response.data.access_token); // ✅ Store token
//         return response.data;
//     } catch (error) {
//         console.error("Login failed:", error.response?.data || error.message);
//         throw error;
//     }
// };


// // Alternative login function
// export const LoginUser = async (credentials) => {
//     const response = await fetch("/api/signin", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(credentials),
//     });
//     if (!response.ok) throw new Error("Login failed");
//     return response.json(); // { role: 'president', name: 'Lisa', token: '...' }
// };

// Function to log out a user
export const logoutUser = async () => {
    // Optional: Call a logout endpoint if needed
    await fetch("/api/logout", { method: "POST" });
}; 
