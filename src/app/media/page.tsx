"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { getAllMedia, deleteMedia } from "../../lib/api";
import { Edit, Trash2, Play } from "lucide-react";
import Toast from "react-hot-toast";

type Media = {
    id: number;
    title: string;
    description: string;
    coverArtUrl: string;
};

const Media = () => {
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
            toast.success("Movie delete successfully");
            setMediaList(mediaList.filter((media) => media.id !== id));
        } catch (error) {
            toast.error("Failed to delete movie");
        }
    };

    return (
        <div>
            <h2 className="text-3xl font-bold mb-4">Media Library</h2>
            <div className="flex justify-between mb-4">
                <p>Browse your media collection.</p>
                <Link href="/media/add">
                    <button className="btn btn-primary">+ Add Movie</button>
                </Link>
                <Link href="/">
                    <button className="btn btn-primary">Logout</button>
                </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {mediaList.map((media) => (
                    <div key={media.id} className="card bg-base-100 shadow-xl">
                        <figure>
                            <img src={media.coverArtUrl} alt={media.title} className="rounded"/>
                        </figure>
                        <div className="card-body">
                            <h3 className="card-title">{media.title}</h3>
                            <p className="truncate">{media.description}</p>
                            <div className="card-actions justify-end">
                                <button className="btn btn-primary btn-sm">
                                    <Play className="w-4 h-4 mr-2"/>
                                    Play
                                </button>
                                <Link href={`/media/edit/${media.id}`}>
                                    <button className="btn btn-warning btn-sm">
                                        <Edit className="w-4 h-4 mr-2"/>
                                        Edit
                                    </button>
                                </Link>
                                <button onClick={() => handleDelete(media.id)} className="btn btn-error btn-sm">
                                    <Trash2 className="w-4 h-4 mr-2"/>
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Media;
