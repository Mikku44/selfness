import { Timestamp } from "firebase/firestore";
import type { User as FirebaseUser } from "firebase/auth";
import { SubscriptionPlan } from "./SubscriptionPlan";

export interface User {
    id?: string; // Likely a unique ID for the user document
    uid: string; // User ID, potentially a Firebase Auth UID
    profile_image: string;
    display_name: string;
    cover_image: string;
    created_at: Timestamp; // Using the new Timestamp interface for user creation
    achievements: UserAchievement[]; // An array of UserAchievement objects
    overall: OverallStats;
    subscription?: SubscriptionPlan;

}

export interface OverallStats {
    rank: string;
    xp: number;
    stack: number;
    life:number;
    gems:number;
}


export interface UserAchievement {
    created_at: Timestamp; // Using the new Timestamp interface
    ACM_name: string;
    ACM_ID: string;
    amount: number;
}

export function createNewUser(firebaseUser: FirebaseUser): User {
    return {
        uid: firebaseUser.uid,
        display_name: firebaseUser.displayName || "unnamed",
        profile_image: firebaseUser.photoURL ?? "",
        cover_image: "",
        created_at: Timestamp.now(),
        achievements: [],
        overall: {
            rank: "iron",
            xp: 0,
            stack: 0,
            life:5,
            gems:100
        },
        
    };

}


export interface UserHistoryEvent {
  user_id: string;
  type: "subscription" | "purchase" | "achievement";
  detail: string;
  metadata?: Record<string, any>;
  timestamp: Timestamp;
}


