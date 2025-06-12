import { Timestamp } from "firebase/firestore";

export interface User {
    id: string; // Likely a unique ID for the user document
    uid: string; // User ID, potentially a Firebase Auth UID
    profile_image: string;
    display_name: string;
    cover_image: string;
    created_at: Timestamp; // Using the new Timestamp interface for user creation
    achievements: UserAchievement[]; // An array of UserAchievement objects
    overall: OverallStats;
}

export interface OverallStats {
    rank: string;
    xp: number;
    stack: number;
}


export interface UserAchievement {
    created_at: Timestamp; // Using the new Timestamp interface
    ACM_name: string;
    ACM_ID: string;
    amount: number;
}