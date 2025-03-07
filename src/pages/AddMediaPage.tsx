import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { createMedia } from "../lib/api";
import { Media } from "../types/Media";
import { MediaType } from "../types/MediaType";

const AddMediaPage = () => {
    const navigate = useNavigate();
    const [media, setMedia] = useState<Media>({
        id: 0,
        title: "",
        description: "",
        filePath: "",
        coverArtUrl: "",
        genre: "",
        releaseYear: 0,
        language: "",
        mediaType: MediaType.MOVIE
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setMedia({ ...media, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await createMedia(media);
            navigate("/media");
        } catch (error) {
            console.error("Failed to add media:", error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Add New Media</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        name="title"
                        placeholder="Title"
                        value={media.title}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                    <input
                        type="text"
                        name="filePath"
                        placeholder="File Path"
                        value={media.filePath}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                    <input
                        type="text"
                        name="description"
                        placeholder="Description"
                        value={media.description}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                    <input
                        type="text"
                        name="coverArtUrl"
                        placeholder="Cover Art URL"
                        value={media.coverArtUrl}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                    <input
                        type="text"
                        name="genre"
                        placeholder="Genre"
                        value={media.genre}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                    <input
                        type="number"
                        name="releaseYear"
                        placeholder="Release Year"
                        value={media.releaseYear}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                    <input
                        type="text"
                        name="language"
                        placeholder="Language"
                        value={media.language}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                    <select
                        name="mediaType"
                        value={media.mediaType}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                    >
                        {Object.values(MediaType).map((type) => (
                            <option key={type} value={type}>{type}</option>
                        ))}
                    </select>
                    <button 
                        type="submit"
                        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-200"
                    >
                        Add Media
                    </button>
                </form>
                <Link 
                    to="/media" 
                    className="block text-center mt-4 text-blue-500 hover:text-blue-700"
                >
                    Back to Media List
                </Link>
            </div>
        </div>
    );
};

export default AddMediaPage;
