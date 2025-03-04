"use client"
import { useState } from "react";
import api from "../../../lib/api";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const AddMovie = () => {
    const router = useRouter();
    const [movie, setMovie] = useState({
        title: "",
        description: "",
        filePath: "",
        coverArtUrl: "",
        genre: "",
        releaseYear: "",
        language: "",
        mediaType: "MOVIE",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setMovie({ ...movie, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!movie.title || !movie.filePath) {
            toast.error("Title and File Path are required");
            return;
        }

        try {
            await api.post("/media", movie);
            toast.success("Movie added successfully!");
            router.push("/media");
        } catch (error) {
            console.log("[Movie add error]", error);
            toast.error("Failed to add movie.");
        }
    };

    return (
        <div>
            <h2>Add a new movie</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    className=""
                    value={movie.title}
                    onChange={handleChange}
                    required
                />
                <textarea
                    name="description"
                    placeholder="Description"
                    className=""
                    value={movie.description}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="filePath"
                    placeholder="File Path"
                    className=""
                    value={movie.filePath}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="genre"
                    placeholder="Genre"
                    className=""
                    value={movie.genre}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="coverArtUrl"
                    placeholder="Cover Art Url"
                    className=""
                    value={movie.coverArtUrl}
                    onChange={handleChange}
                />
                <input
                    type="number"
                    name="releaseYear"
                    placeholder="Release Year"
                    className=""
                    value={movie.releaseYear}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="language"
                    placeholder="Language"
                    className=""
                    value={movie.language}
                    onChange={handleChange}
                />
                <button>Add Movie</button>
            </form>
            <button className="btn btn-primary cursor-pointer" onClick={() => router.push("/media")}>Back</button>
        </div>
    );
};

export default AddMovie;
