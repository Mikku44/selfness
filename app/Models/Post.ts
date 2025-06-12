import { Timestamp } from "firebase/firestore"

export interface Post {
    id?: string;
    user_id: string;
    display_name: string;
    content: string;
    media?: PostMedia[] | null;
    tags?: string[];
    support_count?: number;
    latest_update?: Timestamp
    created_at?: Timestamp
}


export interface PostMedia {
    url: string;
    type: "image" | "video" | "audio" | "file";
    name?: string; // optional filename
    mime_type?: string; // optional MIME type
}
