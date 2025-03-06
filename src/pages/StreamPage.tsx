import React from "react";
import { useParams, Link } from "react-router-dom";

const StreamPage = () => {
    const { id } = useParams();
    const streamUrl = `http://localhost:8080/api/stream/${id}`;

    return(
        <div>
            <h1> Streaming: {id}</h1>
            <video controls>
                <source src={streamUrl} type="video/mp4" />
            </video>
            <br/>
            <Link to="/media">Back</Link>
        </div>
    );
}

export default StreamPage;

