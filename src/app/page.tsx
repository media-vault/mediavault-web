"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const HomePage = () => {
    const router = useRouter();
    const [showButtons, setShowButtons] = useState(false);

    useEffect(() => {
        setTimeout(() => setShowButtons(true), 2000);
    }, []);

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-base-200">
            <img
                src="/logo.png"
                alt="MediaVault Logo"
                className="opacity-0 animate-fadeIn"
            />

            {showButtons && (
                <div className="flex flex-col mt-8 space-y-4">
                    <button className="btn btn-primary w-48" onClick={() => router.push("/register")}>
                        Register
                    </button>
                    <button className="btn btn-primary w-48" onClick={() => router.push("/login")}>
                        Login
                    </button>
                </div>
            )}
        </div>
    );
};

export default HomePage;
