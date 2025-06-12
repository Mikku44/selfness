import { initializeApp, FirebaseApp } from "firebase/app";
import { getAnalytics, Analytics } from "firebase/analytics";
import { getFirestore, Firestore } from "firebase/firestore";

interface FirebaseEnv {
  PUBLIC_FIREBASE_API_KEY: string;
  PUBLIC_FIREBASE_AUTH_DOMAIN: string;
  PUBLIC_FIREBASE_PROJECT_ID: string;
  PUBLIC_FIREBASE_STORAGE_BUCKET: string;
  PUBLIC_FIREBASE_MESSAGING_SENDER_ID: string;
  PUBLIC_FIREBASE_APP_ID: string;
  PUBLIC_FIREBASE_MEASUREMENT_ID?: string; // Optional
}

let appInstance: FirebaseApp | null = null;
let analyticsInstance: Analytics | null = null;
let dbInstance: Firestore | null = null;

export function getFirebaseClient(env: FirebaseEnv) {
  if (!appInstance) { // Initialize only if not already initialized
    const firebaseConfig = {
      apiKey: env.PUBLIC_FIREBASE_API_KEY,
      authDomain: env.PUBLIC_FIREBASE_AUTH_DOMAIN,
      projectId: env.PUBLIC_FIREBASE_PROJECT_ID,
      storageBucket: env.PUBLIC_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: env.PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
      appId: env.PUBLIC_FIREBASE_APP_ID,
      measurementId: env.PUBLIC_FIREBASE_MEASUREMENT_ID, // Include if provided
    };

    console.log("Initializing Firebase client with config:", firebaseConfig);
    appInstance = initializeApp(firebaseConfig);

    // Conditionally initialize analytics if measurementId is present and in browser
    if (typeof window !== "undefined" && env.PUBLIC_FIREBASE_MEASUREMENT_ID) {
      analyticsInstance = getAnalytics(appInstance);
    }
    dbInstance = getFirestore(appInstance);
  }
  return { app: appInstance, analytics: analyticsInstance, db: dbInstance };
}