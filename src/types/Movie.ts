import { Media } from "./Media";

export interface Movie extends Media {
    duration: number;
    director: string;
}
