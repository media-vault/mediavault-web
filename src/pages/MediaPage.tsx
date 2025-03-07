import React, { useEffect, useState } from "react";
import api from "../lib/api";
import { Link, useNavigate } from "react-router-dom";

import { getAllMedia, deleteMedia } from "../lib/api";
import { Media } from "../types/Media";

const MediaPage = () => {
    const [media, setMedia] = useState<Media[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        getAllMedia()
            .then((response) => setMedia(response.data))
            .catch((error) => console.error("Error fetching media:", error));
    }, []);

    const handleDelete = async (id: number) => {
        try {
            await deleteMedia(id);
            setMedia(media.filter((item) => item.id !== id));
        } catch (error) {
            console.error("Failed to delete media:", error);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("mediaVaultToken");
        navigate("/");
    };

    return(
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold mb-6 text-gray-800">Media Library</h1>
            <Link to="/media/add" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200 inline-block mb-6">Add new media</Link>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {media.map((item) => (
                <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
                    <div className="relative pb-[150%]">
                        { item.coverArtUrl ? (
                            <img    
                                src={item.coverArtUrl} 
                                alt={item.title} 
                                className="absolute top-0 left-0 w-full h-full object-cover" 
                            />
                        ) : (
                            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-gray-300">
                                <span className="text-gray-500">Cover Art</span>
                            </div>
                        )}
                    </div>
                    <div className="p-4">
                        <h2 className="font-bold text-xl mb-2 truncate">{item.title}</h2>
                        <p className="text-gray-600 text-sm mb-4">{item.mediaType}</p>
                        <div className="flex justify-between items-center">
                            <Link to={`/stream/${item.filePath}`} className="text-blue-500 hover:text-blue-700">Play</Link>
                            <Link to={`/media/edit/${item.id}`} className="text-gray-600 hover:text-gray-800 mr-2">Edit</Link>
                            <button 
                                onClick={() => handleDelete(item.id)}
                                className="text-red-500 hover:text-red-700"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
                ))}
            </div>
            <br/>
            <button    
                onClick={handleLogout}
                className="mt-8 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-200"
            >
                Logout
            </button>
            </div>
        </div>
    );
}

export default MediaPage;
