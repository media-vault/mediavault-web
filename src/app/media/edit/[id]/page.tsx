"use client"
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { getMediaById, updateMedia } from "../../../../lib/api";
import { ArrowLeft, Save } from "lucide-react";
import toast from "react-hot-toast";
import ProtectedRoute from "../../../ProtectedRoute";

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
            toast.error("Failed to fetch movie details");
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setMovie({ ...movie, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await updateMedia(Number(id), movie);
            toast.success("Movie updated successfully");
            router.push("/media");
        } catch (error) {
            toast.error("Failed to update movie");
        }
    };

    return (
        <ProtectedRoute>
        <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
                <div className="px-4 py-5 sm:p-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Edit Movie</h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                            <input
                                type="text"
                                name="title"
                                id="title"
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                value={movie.title}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                            <textarea
                                name="description"
                                id="description"
                                rows={3}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                value={movie.description}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="filePath" className="block text-sm font-medium text-gray-700">File Path</label>
                            <input
                                type="text"
                                name="filePath"
                                id="filePath"
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                value={movie.filePath}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="genre" className="block text-sm font-medium text-gray-700">Genre</label>
                            <input
                                type="text"
                                name="genre"
                                id="genre"
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                value={movie.genre}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="coverArtUrl" className="block text-sm font-medium text-gray-700">Cover Art URL</label>
                            <input
                                type="text"
                                name="coverArtUrl"
                                id="coverArtUrl"
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                value={movie.coverArtUrl}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="releaseYear" className="block text-sm font-medium text-gray-700">Release Year</label>
                            <input
                                type="number"
                                name="releaseYear"
                                id="releaseYear"
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                value={movie.releaseYear}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="language" className="block text-sm font-medium text-gray-700">Language</label>
                            <input
                                type="text"
                                name="language"
                                id="language"
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                value={movie.language}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="flex justify-between">
                            <button
                                type="button"
                                onClick={() => router.push("/media")}
                                className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Back
                            </button>
                            <button
                                type="submit"
                                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                <Save className="mr-2 h-4 w-4" />
                                Update Movie
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        </ProtectedRoute>
    );
};

export default EditMovie;
