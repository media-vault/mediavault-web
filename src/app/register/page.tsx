"use client"
import { useState } from "react";
import api from "../../lib/api";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const Register = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await api.post("/auth/register", { username, password, role: "USER" });
            console.log("Register response:", response.data);
            toast.success("Registration successful! Please login.");
            router.push("/login");
        } catch (error) {
            console.log("Register error:", error);
            toast.error("Registration failed");
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="card w-96 bg-base-100 shadow-xl p-5">
                <h2 className="text-center text-lg font-bold">Register</h2>
                <form onSubmit={handleRegister} className="flex flex-col gap-3">
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
                    <button type="submit" className="btn btn-primary cursor-pointer" onClick={handleRegister}>Register</button>
                </form>
            </div>
        </div>
    );
};

export default Register;
