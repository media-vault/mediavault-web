"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getAuthToken } from "../lib/auth";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

    useEffect(() => {
        const token = getAuthToken();
        if (!token) {
            router.push("/login");
        } else {
            setIsAuthenticated(true);
        }
    }, [router]);

    if (isAuthenticated === null) {
        return <p className="text-center">Loading...</p>
    }

    return <>{children}</>;

};

export default ProtectedRoute;
