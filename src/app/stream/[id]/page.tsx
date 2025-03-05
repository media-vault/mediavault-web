"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getStreamUrl } from "../../../lib/api";
import { ArrowLeft, Maximize, Minimize } from "lucide-react";
import ProtectedRoute from "../../ProtectedRoute";

const StreamPage = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const filePath = searchParams.get('filePath');
    const [isFullScreen, setIsFullScreen] = useState(false);

    const toggleFullScreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
            setIsFullScreen(true);
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
                setIsFullScreen(false);
            }
        }
    };

    return ( 
        <ProtectedRoute>
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
            <div className="w-full max-w-4xl">
                <h2 className="text-3xl font-bold mb-6 text-center">Now Playing</h2>
                <div className="relative">
                    <video 
                        className="w-full rounded-lg shadow-2xl"
                        controls
                        autoPlay
                        onError={(e) => console.log("Video failed to load", e)}
                    >
                        <source src={`http://localhost:8080/api/stream/test.mp4`} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                    <button
                        className="absolute top-4 right-4 bg-black bg-opacity-50 p-2 rounded-full hover:bg-opacity-75 transition-all duration-300"
                        onClick={toggleFullScreen}
                    >
                        {isFullScreen ? <Minimize className="w-6 h-6" /> : <Maximize className="w-6 h-6" />}
                    </button>
                </div>
                <div className="flex justify-center mt-8">
                    <button
                        className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors duration-300"
                        onClick={() => router.push("/media")}
                    >
                        <ArrowLeft className="w-5 h-5 mr-2" />
                        Back to Library
                    </button>
                </div>
            </div>
        </div>
        </ProtectedRoute>
    );
};

export default StreamPage;
