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
        <div>
            <h1>Login</h1>
            <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
            <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleLogin}>Login</button>
            <br/>
            <Link to="/">Back</Link>
            <br/>
            <Link to="/register">Need to register?</Link>
        </div>
    );
}

export default LoginPage;
