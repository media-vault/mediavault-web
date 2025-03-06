import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
    return(
        <div>
            <h1>MediaVault</h1>
            <nav>
                <Link to="/register">Register</Link> |
                <Link to="/login">Login</Link>
            </nav>
        </div>
    );
}

export default HomePage;
