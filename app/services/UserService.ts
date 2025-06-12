import { collection, doc, getDoc, getDocs, orderBy, query, setDoc, Timestamp, where } from "firebase/firestore";
import { db } from "~/libs/firebase/auth.client";
import { ReG } from "~/Models/Registration";
import { User } from "~/Models/User";


const DOCUMENT_NAME = "Users";

export async function getUserOneWithID({ id }: { id: string }): Promise<ReG | null> {
  if (typeof window === "undefined") return null;

  try {
    if (!db) throw new Error("Firestore not initialized");

    const docRef = doc(db, DOCUMENT_NAME, id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return null;
    }

    return {
      id: docSnap.id,
      ...docSnap.data() as ReG
    };
  } catch (error) {
    console.error("Error fetching document:", error);
    return null;
  }
}


function generateNextId(latestId: string | null): string {
  const prefix = "SN-";
  const nextNumber = latestId
    ? parseInt(latestId.replace(prefix, ""), 10) + 1
    : 1;
  return `${prefix}${String(nextNumber).padStart(7, "0")}`;
}

export async function addOneUser(userData: Omit<User, "id">): Promise<User | null> {
  try {
    if (!db) throw new Error("Firestore not initialized");

    // Fetch the latest user to get the highest ID
    const q = query(collection(db, DOCUMENT_NAME), orderBy("id", "desc"));
    const snapshot = await getDocs(q);
    const latestId = snapshot.docs.length > 0 ? snapshot.docs[0].id : null;

    const newId = generateNextId(latestId);

    const newUserData: User = {
      ...userData,
      id: newId,
    };

    // Save with custom ID
    await setDoc(doc(db, DOCUMENT_NAME, newId), newUserData);

    return newUserData;
  } catch (error) {
    console.error("Error adding user:", error);
    return null;
  }
}



export async function getUsers(): Promise<ReG[]> {
  if (typeof window === "undefined") return [];

  try {
    if (!db) throw new Error("Firestore not initialized");

    const collectionRef = collection(db, DOCUMENT_NAME);
    const querySnapshot = await getDocs(collectionRef);

    if (querySnapshot.empty) {
      return [];
    }

    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data() as ReG
    }));
  } catch (error) {
    console.error("Error fetching documents:", error);
    return [];
  }
}
