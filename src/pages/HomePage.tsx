import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
    return(
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
            <h1 className="text-4xl font-bold text-blue-600 mb-8">MediaVault</h1>
            <nav className="bg-white shadow-bd rounded-lg px-9 py-4">
                <Link to="/register" className="text-blue-500 hover:text-blue-700 mr-4 transition duration-300">Register</Link> 
                    <span className="text-gray-300">|</span>
                <Link to="/login" className="text-blue-500 hover:text-blue-700 ml-4 transition duration-300">Login</Link> 
            </nav>
        </div>
    );
}

export default HomePage;
