import React, { useState } from "react";
import api from "../lib/api";
import { useNavigate, Link } from "react-router-dom";

const RegisterPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleRegister = async () => {
        try {
            await api.post("/auth/register", { username, password });
            navigate("/login");
        } catch (error) {
            console.log("Registration error:", error);
        }
    };

    return(
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Register</h1>
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
                    onClick={handleRegister}
                    className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-200"
                >
                    Register
                </button>
                <div className="mt-4 text-center">
                    <Link to="/" className="text-blue-500 hover:text-blue-700 mr-4">Back</Link>
                    <Link to="/login" className="text-blue-500 hover:text-blue-700">Already have an account?</Link>
                </div>
            </div>
        </div>
    );
}

export default RegisterPage;
