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
        <div>
            <h1>Register</h1>
            <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
            <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleRegister}>Register</button>
            <br/>
            <Link to="/">Back</Link>
            <br/>
            <Link to="/login">Already have an account?</Link>
        </div>
    );
}

export default RegisterPage;
