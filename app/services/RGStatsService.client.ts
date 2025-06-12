import { collection, doc, getDoc, getDocs, query, setDoc, Timestamp, where} from "firebase/firestore";
import { db } from "~/libs/firebase/auth.client";
import { ReG } from "~/Models/Registration";


const DOCUMENT_NAME = "RG-stats";

export async function getRGOneWithID({ id }: { id: string }): Promise<ReG | null> {
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

function getTodayString(): string {
  const today = new Date();
  const day = String(today.getDate()).padStart(2, "0");
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const year = String(today.getFullYear());
  return `${day}${month}${year}`; // e.g., "10062025"
}

export async function addRGOne(
  data: Omit<ReG, "id" | "created_at">
): Promise<string | null> {
  if (typeof window === "undefined") return null;
  if (!db) throw new Error("Firestore not initialized");

  try {
    const dateStr = getTodayString();

    // Count today's entries
    const q = query(
      collection(db, DOCUMENT_NAME),
      where("date_key", "==", dateStr)
    );
    const snapshot = await getDocs(q);
    const notd = snapshot.size + 1;
    const notdPadded = String(notd).padStart(5, "0");

    // Generate custom ID
    const customId = `RG-${dateStr}-${notdPadded}`;

    const docData: ReG & { date_key: string; NOTD: number } = {
      ...data,
      id: customId,
      created_at: Timestamp.now(),
      date_key: dateStr, // for querying by day
      NOTD: notd,         // for the human-friendly sequence
    };

    await setDoc(doc(db, DOCUMENT_NAME, customId), docData);
    return customId;
  } catch (err) {
    console.error("Failed to add document:", err);
    return null;
  }
}

export async function getReGStats(): Promise<ReG[]> {
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
