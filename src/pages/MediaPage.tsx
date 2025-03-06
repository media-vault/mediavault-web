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
        <div>
            <h1>Media Library</h1>
            <Link to="/media/add">Add new media</Link>
            <ul>
                {media.map((item) => (
                <li key={item.id}>
                    <Link to={`/stream/${item.filePath}`}>{item.title}</Link>
                    <br/>
                    <Link to={`/media/edit/${item.id}`}>Edit</Link>
                    <br/>
                    <button onClick={() => handleDelete(item.id)}>Delete</button>
                </li>
                ))}
            </ul>
            <br/>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
}

export default MediaPage;
