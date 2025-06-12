// app/components/FirebaseProvider.tsx

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { useLoaderData } from "@remix-run/react";
// REMOVE THIS LINE: import { loader as firebaseLoader } from "~/utils/firebase.server"; // <--- REMOVE THIS IMPORT!

import { FirebaseApp } from "firebase/app";
import { Analytics } from "firebase/analytics";
import { Firestore } from "firebase/firestore";

import { getFirebaseClient } from "~/libs/firebase/firebase.client";

// Define the type for the environment variables that come from the loader
interface LoaderDataEnv {
  PUBLIC_FIREBASE_API_KEY: string;
  PUBLIC_FIREBASE_AUTH_DOMAIN: string;
  PUBLIC_FIREBASE_PROJECT_ID: string;
  PUBLIC_FIREBASE_STORAGE_BUCKET: string;
  PUBLIC_FIREBASE_MESSAGING_SENDER_ID: string;
  PUBLIC_FIREBASE_APP_ID: string;
  PUBLIC_FIREBASE_MEASUREMENT_ID?: string;
}

// Define the type for the loader's full data structure
interface RootLoaderData {
    ENV: LoaderDataEnv;
}

interface FirebaseContextValue {
  app: FirebaseApp | null;
  analytics: Analytics | null;
  db: Firestore | null;
  isFirebaseInitialized: boolean;
}

const FirebaseContext = createContext<FirebaseContextValue>({
  app: null,
  analytics: null,
  db: null,
  isFirebaseInitialized: false,
});

interface FirebaseProviderProps {
  children: ReactNode;
}

export function FirebaseProvider({ children }: FirebaseProviderProps) {
  // useLoaderData will now correctly get its data from the loader exported by the *route*
  // (which will be app/root.tsx in our setup).
  const data = useLoaderData<RootLoaderData>();
  const env = data.ENV;

  const [firebaseApp, setFirebaseApp] = useState<FirebaseApp | null>(null);
  const [firebaseAnalytics, setFirebaseAnalytics] = useState<Analytics | null>(null);
  const [firestoreDb, setFirestoreDb] = useState<Firestore | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (env.PUBLIC_FIREBASE_API_KEY && !isInitialized) {
      try {
        const { app, analytics, db } = getFirebaseClient(env);
        setFirebaseApp(app);
        setFirebaseAnalytics(analytics);
        setFirestoreDb(db);
        setIsInitialized(true);
        console.log("FirebaseProvider: Successfully initialized Firebase client.");
      } catch (error) {
        console.error("FirebaseProvider: Failed to initialize Firebase client:", error);
      }
    }
  }, [env, isInitialized]);

  const contextValue: FirebaseContextValue = {
    app: firebaseApp,
    analytics: firebaseAnalytics,
    db: firestoreDb,
    isFirebaseInitialized: isInitialized,
  };

  return (
    <FirebaseContext.Provider value={contextValue}>
      {children}
    </FirebaseContext.Provider>
  );
}

export function useFirebase() {
  const context = useContext(FirebaseContext);
  if (context === undefined) {
    throw new Error("useFirebase must be used within a FirebaseProvider");
  }
  return context;
}

// REMOVE THIS LINE: export const loader = firebaseLoader; // <--- REMOVE THIS EXPORT!