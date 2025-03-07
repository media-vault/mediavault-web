import React, { useState } from "react";
import api from "../lib/api";
import { useNavigate, Link } from "react-router-dom";

const LoginPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await api.post("/auth/login", { username, password });
            localStorage.setItem("mediaVaultToken", response.data.accessToken);
            navigate("/media");
        } catch (error) {
            console.log("Registration error:", error);
        }
    };

    return(
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Login</h1>
                <input 
                    type="text"     
                    placeholder="Username" 
                    onChange={(e) => setUsername(e.target.value)} 
                    className="w-full p-2 mb-4 border border-gray-300 rounded"
                />
                <input 
                    type="password" 
                    placeholder="Password" 
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-2 mb-4 border border-gray-300 rounded"
                />
                <button 
                    onClick={handleLogin}
                    className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-200"
                >
                    Register
                </button>
                <div className="mt-4 text-center">
                    <Link to="/" className="text-blue-500 hover:text-blue-700 mr-4">Back</Link>
                    <Link to="/register" className="text-blue-500 hover:text-blue-700">Don't have an account?</Link>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
