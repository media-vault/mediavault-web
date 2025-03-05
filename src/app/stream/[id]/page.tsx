"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getStreamUrl } from "../../../lib/api";

const StreamPage = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const filePath = searchParams.get('filePath');

    return ( 
            <div className="flex flex-col items-center justify-center h-screen bg-base-200 p-4">
                <h2 className="text-2xl font-bold mb-4"> Now playing:</h2>
                <video className="w-full max-w-4xl border border-gray-300 shadow-lg"
                    controls
                    autoPlay
                    onError={(e) => console.log("Video fail to load", e)}
                >
                    <source src={`http://localhost:8080/api/stream/test.mp4`} type="video/mp4" />
                </video>
                <button
                    className="btn btn-primary mt-4"
                    onClick={() => router.push("/media")}
                >
                    Back to Library
                </button>
            </div>
    );
};

export default StreamPage;
