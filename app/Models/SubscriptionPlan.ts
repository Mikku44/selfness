import { Timestamp } from "firebase/firestore";

export interface SubscriptionPlan {
  id?:string,
  name: "free" | "mindfulness" | "Unicorn"; // or enum
  status: "active" | "expired" | "cancelled";
  started_at: Timestamp;
  expires_at: Timestamp;
  features: SubscriptionFeature[];
  renewal: "manual" | "auto";
  source: "stripe" | "admin" | "google" | "apple"; // tracking origin
}

export interface SubscriptionFeature {
  name: string;          // e.g. "Extra Gems"
  value: number | string; // e.g. 100 gems, or "Unlimited XP"
}
