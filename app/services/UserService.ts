import { addDoc, collection, doc, getDoc, getDocs, onSnapshot, orderBy, query, runTransaction, setDoc, Timestamp, where } from "firebase/firestore";
import { db } from "~/libs/firebase/auth.client";
import { ReG } from "~/Models/Registration";
import { createNewUser, OverallStats, User, UserAchievement, UserHistoryEvent } from "~/Models/User";
import type { User as FirebaseUser, Unsubscribe } from "firebase/auth";
import { SubscriptionPlan } from "~/Models/SubscriptionPlan";
import getRankByXP from "~/libs/ranks";

const DOCUMENT_NAME = "Users";

export async function getUserOneWithID({ id }: { id: string }): Promise<User | null> {
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
      ...docSnap.data() as User
    };
  } catch (error) {
    console.error("Error fetching document:", error);
    return null;
  }
}

export async function getUserByUid(uid: string): Promise<User | null> {
  try {
    const q = query(collection(db, DOCUMENT_NAME), where("uid", "==", uid));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) return null;

    const docSnap = querySnapshot.docs[0];
    return {
      id: docSnap.id,
      ...docSnap.data() as User
    };
  } catch (error) {
    console.error("Error fetching user by UID:", error);
    return null;
  }
}

export function onUserByUid(
  uid: string,
  callback: (user: User | null) => void
): Unsubscribe {
  const q = query(collection(db, DOCUMENT_NAME), where("uid", "==", uid));

  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    if (querySnapshot.empty) {
      callback(null);
    } else {
      const docSnap = querySnapshot.docs[0];
      callback({
        id: docSnap.id,
        ...docSnap.data() as User
      });
    }
  }, (error) => {
    console.error("Error in real-time user fetch:", error);
    callback(null);
  });

  return unsubscribe;
}

export async function saveUserToDatabase(firebaseUser: FirebaseUser) {
  const userData = createNewUser(firebaseUser);

  try {
    await setDoc(doc(db, DOCUMENT_NAME, userData.uid), userData);
    console.log("User saved to Firestore");
  } catch (error) {
    console.error("Error saving user to Firestore:", error);
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


export async function logUserHistory(userId: string, event: Omit<UserHistoryEvent, "timestamp">) {
  const ref = collection(db, "Users", userId, "History"); // or "UserHistory"
  await addDoc(ref, {
    ...event,
    timestamp: Timestamp.now(),
  });
}

export function isAdsDisabled(subscription?: SubscriptionPlan): boolean {
  if (!subscription) return false;
  const now = Timestamp.now();

  const isActive =
    subscription.status === "active" &&
    subscription.expires_at.toMillis() > now.toMillis();

  const adFreePlans = ["mindfulness", "Unicorn"];

  return isActive && adFreePlans.includes(subscription.name);
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


export async function patchUserOverallStats(id: string, updates: Partial<OverallStats>): Promise<void> {
  const userRef = doc(db, DOCUMENT_NAME, id);

  try {
    await runTransaction(db, async (transaction) => {
      const userDoc = await transaction.get(userRef);
      if (!userDoc.exists()) throw new Error("User not found");

      const currentOverall = userDoc.data().overall || {};

      
      const totalXP = Math.max(0, (currentOverall.xp ?? 0) + (updates.xp ?? 0))
      const newOverall: OverallStats = {
        xp: totalXP,
        gems: Math.max(0, (currentOverall.gems ?? 0) + (updates.gems ?? 0)),
        life: Math.max(0, (currentOverall.life ?? 0) + (updates.life ?? 0)),
        stack: Math.max(0, (currentOverall.stack ?? 0) + (updates.stack ?? 0)),
        rank: getRankByXP(totalXP).name ?? "Iron", // or your default
      };

      transaction.update(userRef, { overall: newOverall });
    });
  } catch (error) {
    console.error("Safe update to overall stats failed:", error);
    throw error;
  }
}

export async function addUserAchievement(id: string, newAchievement: Partial<UserAchievement>): Promise<void> {
  const userRef = doc(db, DOCUMENT_NAME, id); // Replace with actual doc path logic if needed

  try {
    await runTransaction(db, async (transaction) => {
      const userDoc = await transaction.get(userRef);
      if (!userDoc.exists()) throw new Error("User not found");

      const currentAchievements = userDoc.data().achievements ?? [];

      // Optional: Prevent duplicates by ACM_ID
      const isDuplicate = currentAchievements.some(
        (a: UserAchievement) => a.ACM_ID === newAchievement.ACM_ID
      );
      if (isDuplicate) {
        console.warn("Achievement already exists:", newAchievement.ACM_ID);
        return;
      }

      const updatedAchievements = [...currentAchievements, newAchievement];
      transaction.update(userRef, {
        achievements: updatedAchievements
      });
    });
  } catch (error) {
    console.error("Failed to add achievement:", error);
    throw error;
  }
}