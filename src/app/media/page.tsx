"use client";
import { useEffect, useState } from "react";
import api from "../../lib/api";
import Link from "next/link";

type Media = {
    id: number;
    title: string;
    description: string;
    coverArtUrl: string;
};

const Media = () => {
    const [mediaList, setMediaList] = useState<Media[]>([]);

    useEffect(() => {
        api.get("/media")
            .then((response) => setMediaList(response.data))
            .catch(() => alert("Failed to fetch media"));
    }, []);

    return (
        <div className="container mx-auto py-10">
            <h2 className="text-2xl font-bold">Media Library</h2>
            <div className="grid grid-cols-4 gap-4">
                <p>Browse your media collection.</p>
                <Link href="/media/add">
                    <button>+ Add Movie</button>
                </Link>
                {mediaList.map((media) => (
                    <div key={media.id} className="card shadow-lg">
                        <img src={media.coverArtUrl} alt={media.title} className="rounded"/>
                        <h3 className="font-bold text-lg">{media.title}</h3>
                        <p>{media.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Media;
