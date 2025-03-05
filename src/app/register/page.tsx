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
        <div className="flex justify-center items-center h-screen p-4">
            <div className="w-full max-w-md rounded-lg shadow-xl p-5">
                <h2 className="text-center text-lg font-extrabold">Register</h2>
                <form onSubmit={handleRegister} className="flex flex-col gap-3">
                    <input 
                        type="text"
                        placeholder="Username"
                        className="input input-bordered w-full"
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
                <div className="flex flex-col mt-8 space-y-4">
                    <button className="btn btn-primary cursor-pointer" onClick={() => router.push("/")}>Back</button>
                    <button className="btn btn-primary cursor-pointer" onClick={() => router.push("/login")}>Already have an account?</button>
                </div>
            </div>
        </div>
    );
};

export default Register;
