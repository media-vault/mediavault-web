"use client"
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { getMediaById, updateMedia } from "../../../../lib/api";

const EditMovie = () => {
    const router = useRouter();
    const { id } = useParams();
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

    useEffect(() => {
        if (id) {
            fetchMovie();
        }
    }, [id]);

    const fetchMovie = async () => {
        try {
            const response = await getMediaById(Number(id));
            setMovie(response.data);
        } catch (error) {
           console.log(error); 
        }
    };

    const handleChange = async (e: React.ChangeEvent) => {
        setMovie({ ...movie, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await updateMedia(Number(id), movie);
            console.log("success");
            router.push("/media");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="max-w-lg mx-auto py-10">
            <h2 className="text-2xl font-bold mb-4">Edit Movie</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    className="input input-bordered w-full"
                    value={movie.title}
                    onChange={handleChange}
                    required
                />
                <textarea
                    name="description"
                    placeholder="Description"
                    className="textarea textarea-bordered w-full"
                    value={movie.description}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="filePath"
                    placeholder="File Path"
                    className="input input-bordered w-full"
                    value={movie.filePath}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="genre"
                    placeholder="Genre"
                    className="input input-bordered w-full"
                    value={movie.genre}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="coverArtUrl"
                    placeholder="Cover Art Url"
                    className="input input-bordered w-full"
                    value={movie.coverArtUrl}
                    onChange={handleChange}
                />
                <input
                    type="number"
                    name="releaseYear"
                    placeholder="Release Year"
                    className="input input-bordered w-full"
                    value={movie.releaseYear}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="language"
                    placeholder="Language"
                    className="input input-bordered w-full"
                    value={movie.language}
                    onChange={handleChange}
                />
                <button className="btn btn-warning w-full">Update Movie</button>
            </form>
        </div>
    );
};

export default EditMovie;
