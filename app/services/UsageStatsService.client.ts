import { doc, getDoc, increment, serverTimestamp, updateDoc } from "firebase/firestore";
import { db } from "~/libs/firebase/auth.client";
import { UsageStats } from "~/Models/UsageStats";

const DOCUMENT_NAME = "usage-stats";

export async function getOneWithID({ id }: { id: string }): Promise<UsageStats | null> {
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
      ...docSnap.data() as UsageStats
    };
  } catch (error) {
    console.error("Error fetching document:", error);
    return null;
  }
}


export async function updateUsageStats(
  id: string,
  options: { device: "mobile" | "web" }
): Promise<boolean> {
  if (typeof window === "undefined") return false;

  try {
    if (!db) throw new Error("Firestore not initialized");

    const docRef = doc(db, DOCUMENT_NAME, id);

    // Build dynamic field update
    const updates: Record<string, any> = {
      count: increment(1),
      latest_update: serverTimestamp(),
    };

    // Increment only the correct device field
    updates[`source.${options.device}`] = increment(1);

    await updateDoc(docRef, updates);

    return true;
  } catch (error) {
    console.error("Error updating usage stats:", error);
    return false;
  }
}