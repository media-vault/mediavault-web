"use client"
import { useState } from "react";
import api from "../../lib/api";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await api.post("/auth/login", { username, password });
            localStorage.setItem("token", response.data.token);
            toast.success("Login successful!");
            router.push("/media");
        } catch (error) {
            toast.error("Invalid credentials");
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="card w-96 bg-base-100 shadow-xl p-5">
                <h2 className="text-center text-lg font-bold">Login</h2>
                <form onSubmit={handleLogin} className="flex flex-col gap-3">
                    <input 
                        type="text"
                        placeholder="Username"
                        className="input input-bordered"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <input 
                        type="text"
                        placeholder="Password"
                        className="input input-bordered"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button className="btn btn-primary">Login</button>
                </form>
            </div>
        </div>
    );
};

export default Login;
