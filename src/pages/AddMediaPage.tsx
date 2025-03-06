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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
        <div>
            <h1>Add New Media</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    value={media.title}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="filePath"
                    placeholder="File Path"
                    value={media.filePath}
                    onChange={handleChange}
                    required
                />
                <button type="submit">Add Media</button>
            </form>
            <br/>
            <Link to="/media">Back</Link>
        </div>
    );
};

export default AddMediaPage;
