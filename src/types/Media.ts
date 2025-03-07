import { MediaType } from "./MediaType";

export interface Media {
    id: number;
    title: string;
    description: string;
    filePath: string;
    coverArtUrl: string;
    genre: string;
    releaseYear: number;
    language: string;
    mediaType: MediaType;
}
