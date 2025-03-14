import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api"; // Adjust this URL if needed

// Function to register a user
export const registerUser = async (name, email, password, role = "student") => {
    try {
        const response = await axios.post(`${API_BASE_URL}/register`, {
            name,
            email,
            password,
            role,
        });

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
        const response = await axios.post(`${API_BASE_URL}/login`, {
            email,
            password,
        });

        console.log("Login successful:", response.data);
        localStorage.setItem("token", response.data.token); // Store token
        return response.data;
    } catch (error) {
        console.error("Login failed:", error.response?.data || error.message);
        throw error;
    }
};