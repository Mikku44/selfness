import {  collection, deleteDoc, doc, getDoc, getDocs, increment, limit, onSnapshot, orderBy, query, serverTimestamp, setDoc, Timestamp, updateDoc } from "firebase/firestore";
import { db } from "~/libs/firebase/auth.client";
import { Post } from "~/Models/Post";


const DOCUMENT_NAME = "Posts";

export async function getOneWithID({ id }: { id: string }): Promise<Post | null> {
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
      ...docSnap.data() as Post
    };
  } catch (error) {
    console.error("Error fetching document:", error);
    return null;
  }
}


function getRandomIdPart(): string {
  return String(Math.floor(10000 + Math.random() * 90000)); // random 5-digit number
  // or use getRandomAlphanumericId() if preferred
}

function getDateString(): string {
  const now = new Date();
  const dd = String(now.getDate()).padStart(2, "0");
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const yyyy = now.getFullYear();
  return `${dd}${mm}${yyyy}`; // "11062025"
}


export async function createPost(
  postData: Omit<Post, "id" | "latest_update" | "created_at" | "support_count">
): Promise<Post | null> {
  if (typeof window === "undefined") return null;
  if (!db) throw new Error("Firestore not initialized");

  try {
    const datePart = getDateString();
    const randomPart = getRandomIdPart();
    const postId = `PS-${datePart}-${randomPart}`;

    const postDocRef = doc(db, DOCUMENT_NAME, postId);

    const newPostData: Post = {
      id: postId,
      ...postData,
      support_count: 0,
      created_at: serverTimestamp() as Timestamp,
      latest_update: serverTimestamp() as Timestamp,
    };

    await setDoc(postDocRef, newPostData);

    return newPostData;
  } catch (error) {
    console.error("Error creating post with random ID:", error);
    return null;
  }
}

export async function updatePost(
  id: string,
  updates: Partial<Omit<Post, 'id' | 'created_at'>>
): Promise<boolean> {
  if (typeof window === "undefined") return false;

  try {
    if (!db) throw new Error("Firestore instance is not initialized.");

    const docRef = doc(db, DOCUMENT_NAME, id);
    await updateDoc(docRef, {
      ...updates,
      latest_update: serverTimestamp(),
    });
    return true;
  } catch (error) {
    console.error(`Error updating post with ID ${id}:`, error);
    return false;
  }
}

export async function incrementSupportCount(
  id: string,
  count? : number
): Promise<boolean> {
  if (typeof window === "undefined") return false;

  try {
    if (!db) throw new Error("Firestore instance is not initialized.");

    const docRef = doc(db, DOCUMENT_NAME, id);
    await updateDoc(docRef, {
      support_count: increment(count || 1), // Atomically increment the count
      latest_update: serverTimestamp(),
    });
    return true;
  } catch (error) {
    console.error(`Error incrementing support count for post ID ${id}:`, error);
    return false;
  }
}


export async function deletePost(

  id: string
): Promise<boolean> {
  if (typeof window === "undefined") return false;

  try {
    if (!db) throw new Error("Firestore instance is not initialized.");

    const docRef = doc(db, DOCUMENT_NAME, id);
    await deleteDoc(docRef);
    return true;
  } catch (error) {
    console.error(`Error deleting post with ID ${id}:`, error);
    return false;
  }
}


export async function getPosts(
  options?: { limitCount?: number; }
): Promise<Post[]> {
  if (typeof window === "undefined") return []; // ตรวจสอบว่ารันบนฝั่ง client

  try {
    if (!db) throw new Error("Firestore instance is not initialized.");

    const postsRef = collection(db, DOCUMENT_NAME);

    // กำหนด Query โดยใช้ orderBy เพื่อเรียงลำดับ และ limit เพื่อจำกัดจำนวน
    const q = query(
      postsRef,
      // orderBy("created_at", "desc"), 
      // limit(options?.limitCount || 20) // จำกัดจำนวนตามที่ระบุ หรือ 20 หากไม่ได้ระบุ
    );

    const querySnapshot = await getDocs(q);
    const posts: Post[] = [];
    querySnapshot.forEach((doc) => {
      // ตรวจสอบ Timestamp ที่เป็น object ก่อนแปลง เพื่อความปลอดภัย
      const data = doc.data();
      posts.push({
        id: doc.id,
        ...data as Post,
        created_at: data.created_at instanceof Timestamp ? data.created_at : undefined,
        latest_update: data.latest_update instanceof Timestamp ? data.latest_update : undefined,
      });
    });
    console.log("POST : ",posts)
    return posts;
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
}




export function listenToPosts(
  options: { limitCount?: number } = {},
  onUpdate: (posts: Post[]) => void
): () => void {
  if (typeof window === "undefined" || !db) return () => {};

  const postsRef = collection(db, DOCUMENT_NAME);
  const q = query(
    postsRef,
    orderBy("created_at", "desc"),
    limit(options.limitCount || 20)
  );

  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const posts: Post[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      posts.push({
        id: doc.id,
        ...data as Post,
        created_at: data.created_at instanceof Timestamp ? data.created_at : undefined,
        latest_update: data.latest_update instanceof Timestamp ? data.latest_update : undefined,
      });
    });
    onUpdate(posts);
  }, (error) => {
    console.error("Realtime post listener error:", error);
    onUpdate([]); // or handle error differently
  });

  return unsubscribe;
}