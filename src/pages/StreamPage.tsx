import React from "react";
import { useParams, Link } from "react-router-dom";

const StreamPage = () => {
    const { id } = useParams();
    const streamUrl = `http://localhost:8080/api/stream/${id}`;

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold mb-6 text-gray-800">Streaming: {id}</h1>
                <div className="aspect-w-16 aspect-h-9 mb-6">
                    <video className="w-full h-full object-cover rounded-lg shadow-lg" controls>
                        <source src={streamUrl} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>
                <Link 
                    to="/media" 
                    className="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
                >
                    Back to Media Library
                </Link>
            </div>
        </div>
    );
}

export default StreamPage;
