"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getAllMedia, deleteMedia } from "../../lib/api";
import { clearAuthToken } from "../../lib/auth";
import { Edit, Trash2, Play, PlusCircle, LogOut } from "lucide-react";
import toast from "react-hot-toast";
import ProtectedRoute from "../ProtectedRoute";

type Media = {
    id: number;
    title: string;
    filename: string;
    description: string;
    coverArtUrl: string;
    filePath: string;
};

const Media = () => {
    const router = useRouter();
    const [mediaList, setMediaList] = useState<Media[]>([]);

    useEffect(() => {
        fetchMedia();
    }, []);

    const fetchMedia = async () => {
        try {
            const response = await getAllMedia();
            setMediaList(response.data);
        } catch (error) {
            toast.error("Failed to fetch media");
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm("Are you sure you want to delete this movie?")) return;
        try {
            await deleteMedia(id);
            toast.success("Movie deleted successfully");
            setMediaList(mediaList.filter((media) => media.id !== id));
        } catch (error) {
            toast.error("Failed to delete movie");
        }
    };

    const handleLogout = () => {
        clearAuthToken();
        router.push("/");
    };

    return (
        <ProtectedRoute>
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-4xl font-bold text-gray-800">Media Library</h2>
                    <div className="space-x-4">
                        <Link href="/media/add">
                            <button className="btn bg-green-500 hover:bg-green-600 text-white">
                                <PlusCircle className="w-5 h-5 mr-2" />
                                Add Movie
                            </button>
                        </Link>
                        <button className="btn bg-red-500 hover:bg-red-600 text-white" onClick={handleLogout}>
                            <LogOut className="w-5 h-5 mr-2" />
                            Logout
                        </button>
                    </div>
                </div>
                <p className="text-gray-600 mb-8">Browse your media collection.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {mediaList.map((media) => (
                        <div key={media.id} className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105">
                            <img src={media.coverArtUrl} alt={media.title} className="w-full h-64 object-cover"/>
                            <div className="p-4">
                                <h3 className="text-xl font-semibold text-gray-800 mb-2">{media.title}</h3>
                                <p className="text-gray-600 mb-4 h-12 overflow-hidden">{media.description}</p>
                                <div className="flex justify-between items-center">
                                    <Link href={`/stream/${media.id}?filePath=${media.filePath}`}>
                                        <button className="btn bg-blue-500 hover:bg-blue-600 text-white text-sm">
                                            <Play className="w-4 h-4 mr-1"/>
                                            Play
                                        </button>
                                    </Link>
                                    <div className="space-x-2">
                                        <Link href={`/media/edit/${media.id}`}>
                                            <button className="btn bg-yellow-500 hover:bg-yellow-600 text-white text-sm">
                                                <Edit className="w-4 h-4"/>
                                            </button>
                                        </Link>
                                        <button onClick={() => handleDelete(media.id)} className="btn bg-red-500 hover:bg-red-600 text-white text-sm">
                                            <Trash2 className="w-4 h-4"/>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
        </ProtectedRoute>
    );
};

export default Media;
