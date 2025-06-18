// utils/firebase.server.ts

// export async function loader() {
 
//   console.log("Loading Firebase API Key:", process.env.PUBLIC_FIREBASE_API_KEY ? "Loaded" : "Not Found");


//   return Response.json({
//     ENV: {
//       PUBLIC_FIREBASE_API_KEY: process.env.PUBLIC_FIREBASE_API_KEY,
//       PUBLIC_FIREBASE_AUTH_DOMAIN: process.env.PUBLIC_FIREBASE_AUTH_DOMAIN,
//       PUBLIC_FIREBASE_PROJECT_ID: process.env.PUBLIC_FIREBASE_PROJECT_ID,
//       PUBLIC_FIREBASE_STORAGE_BUCKET: process.env.PUBLIC_FIREBASE_STORAGE_BUCKET,
//       PUBLIC_FIREBASE_MESSAGING_SENDER_ID: process.env.PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
//       PUBLIC_FIREBASE_APP_ID: process.env.PUBLIC_FIREBASE_APP_ID,
//       PUBLIC_FIREBASE_MEASUREMENT_ID: process.env.PUBLIC_FIREBASE_MEASUREMENT_ID, 
//     },
//   });
// }


import { initializeApp, cert, getApps } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";


// console.log("PRIVATE KEY : ",process.env.FIREBASE_PRIVATE_KEY)

if (getApps().length === 0) {
  initializeApp({
    credential: cert({
      projectId: process.env.PUBLIC_FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    }),
  });
}

export const dbAdmin = getFirestore();
