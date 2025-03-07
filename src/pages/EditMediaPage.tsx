import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getMediaById, updateMedia } from "../lib/api";
import { Media } from "../types/Media";
import { MediaType } from "../types/MediaType";

const EditMediaPage = () => {
    const { id } = useParams();
    const [media, setMedia] = useState<Media | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (!id) return;
        getMediaById(Number(id))
            .then((response) => setMedia(response.data))
            .catch((error) => console.error("Error fetching media:", error));
    }, [id]);

    const handleUpdate = async () => {
        if (!id || !media) return;
        try {
            await updateMedia(Number(id), media);
            navigate("/media");
        } catch(error) {
            console.error("Failed to update media:", error);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        if (!media) return;
        setMedia({ ...media, [e.target.name]: e.target.value });
    };

    return(
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Edit Media</h1>
                { media ? (
                    <form onSubmit={(e) => { e.preventDefault(); handleUpdate(); }} className="space-y-4">
                        <input 
                            type="text"
                            name="title"
                            value={media.title}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded"
                            placeholder="Title"
                        />
                        <input 
                            type="text"
                            name="filePath"
                            value={media.filePath}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded"
                            placeholder="File Path"
                        />
                        <input 
                            type="text"
                            name="description"
                            value={media.description}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded"
                            placeholder="Description"
                        />
                        <input 
                            type="text"
                            name="coverArtUrl"
                            value={media.coverArtUrl}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded"
                            placeholder="Cover Art URL"
                        />
                        <input 
                            type="text"
                            name="genre"
                            value={media.genre}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded"
                            placeholder="Genre"
                        />
                        <input 
                            type="number"
                            name="releaseYear"
                            value={media.releaseYear}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded"
                            placeholder="Release Year"
                        />
                        <input 
                            type="text"
                            name="language"
                            value={media.language}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded"
                            placeholder="Language"
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
                            Save Changes
                        </button>
                    </form>
                ) : (
                    <p className="text-center text-gray-600">Loading media...</p>
                )}
                <Link 
                    to="/media" 
                    className="block text-center mt-4 text-blue-500 hover:text-blue-700"
                >
                    Back to Media List
                </Link>
            </div>
        </div>
    );
}

export default EditMediaPage;
