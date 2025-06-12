// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";


// const firebaseConfig = {
//   apiKey: import.meta.env.PUBLIC_FIREBASE_API_KEY,
//   authDomain: import.meta.env.PUBLIC_FIREBASE_AUTH_DOMAIN,
//   projectId: import.meta.env.PUBLIC_FIREBASE_PROJECT_ID,
//   storageBucket: import.meta.env.PUBLIC_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: import.meta.env.PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
//   appId: import.meta.env.PUBLIC_FIREBASE_APP_ID,
//   measurementId: import.meta.env.PUBLIC_FIREBASE_MESUREMENT_ID,
// };

const firebaseConfig = {
  apiKey: "AIzaSyAva5P3Y5ERF9_S_80pL9I0BUpRK6Dvlkg",
  authDomain: "selfness-c2e96.firebaseapp.com",
  projectId: "selfness-c2e96",
  storageBucket: "selfness-c2e96.firebasestorage.app",
  messagingSenderId: "480583567180",
  appId: "1:480583567180:web:36f610a53e4549acce71e9",
  measurementId: "G-R5KF4NHTCH"
};

// console.log("Configure : ",firebaseConfig)


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export {analytics,db};