import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getMediaById, updateMedia } from "../lib/api";
import { Media } from "../types/Media";

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
        if (!id) return;
        try {
            await updateMedia(Number(id), media);
            navigate("/media");
        } catch(error) {
            console.error("Failed to update media:", error);
        }
    };

    return(
        <div>
            <h1>Edit Media</h1>
            { media ? (
                <>
            <input 
                type="text" 
                value={media.title} 
                onChange={(e) => setMedia({ ...media, title: e.target.value })} 
            />
            <input 
                type="text" 
                value={media.filePath} 
                onChange={(e) => setMedia({ ...media, filePath: e.target.value })} 
            />
            <button onClick={handleUpdate}>Save</button>
            </>
            ) : (
                <p>Loading media...</p>
            )}
            <br/>
            <Link to="/media">Back</Link>
        </div>
    );
}

export default EditMediaPage;
