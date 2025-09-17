import {
  collection,
  doc,
  setDoc,
  deleteDoc,
  getDoc,
  getDocs,
} from "firebase/firestore";
import { db } from "../firebase";

export async function saveFavorite(
  uid: string,
  videoId: string,
  videoUrl: string
) {
  try {
    // Save under: users/{uid}/favorites/{videoId}
    const favRef = doc(db, "users", uid, "favorites", videoId);

    await setDoc(favRef, { videoUrl, addedAt: new Date() });

    console.log(`Favorite saved: ${videoId}`);
  } catch (error) {
    console.error("Error saving favorite:", error);
  }
}

export async function removeFavorite(uid: string, videoId: string) {
  const favRef = doc(db, "users", uid, "favorites", videoId);
  await deleteDoc(favRef);
}

export async function isFavorite(
  uid: string,
  videoId: string
): Promise<boolean> {
  const favRef = doc(db, "users", uid, "favorites", videoId);
  const snapshot = await getDoc(favRef);
  return snapshot.exists();
}

export async function getFavorites(uid: string) {
  try {
    const favsRef = collection(db, "users", uid, "favorites");
    const snapshot = await getDocs(favsRef);

    const favorites = snapshot.docs.map((doc) => ({
      id: doc.id, // videoId
      ...doc.data(),
    }));

    return favorites;
  } catch (error) {
    console.error("Error fetching favorites:", error);
    return [];
  }
}
