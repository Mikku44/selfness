import { Timestamp } from "firebase-admin/firestore";
import { dbAdmin } from "~/libs/firebase/firebase.server";
import { Post } from "~/Models/Post";

export async function getPostsServer(
  options?: { limitCount?: number }
): Promise<Post[]> {
  try {
    const postsRef = dbAdmin.collection("Posts"); // use your collection name
    let q = postsRef.orderBy("created_at", "desc");

    if (options?.limitCount) {
      q = q.limit(options.limitCount);
    }

    const snapshot = await q.get();

    const posts: Post[] | any = [];
    snapshot.forEach((doc) => {
      const data = doc.data();
      posts.push({
        id: doc.id,
        ...data as Post,
        created_at: data.created_at instanceof Timestamp ? data.created_at : Timestamp.now(),
        latest_update: data.latest_update instanceof Timestamp ? data.latest_update : Timestamp.now(),
      });
    });

    return posts;
  } catch (error) {
    console.error("❌ Error in getPostsServer:", error);
    return [];
  }
}