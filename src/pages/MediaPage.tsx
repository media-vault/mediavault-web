import React, { useEffect, useState } from "react";
import api from "../lib/api";
import { Link } from "react-router-dom";

import { getAllMedia } from "../lib/api";
import { Media } from "../types/Media";

const MediaPage = () => {
    const [media, setMedia] = useState<Media[]>([]);

    useEffect(() => {
        getAllMedia()
            .then((response) => setMedia(response.data))
            .catch((error) => console.error("Error fetching media:", error));
    }, []);

    return(
        <div>
            <h1>Media Library</h1>
            <Link to="/media/add">Add new media</Link>
            <ul>
                {media.map((item) => (
                <li key={item.id}>
                    <Link to={`/stream/${item.filePath}`}>{item.title}</Link>
                    <Link to={`/media/edit/${item.id}`}>Edit</Link>
                </li>
                ))}
            </ul>
        </div>
    );
}

export default MediaPage;
