import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

export async function uploadFileToStorage(file: File): Promise<string> {
  const storage = getStorage();
  const fileRef = ref(storage, `media/${Date.now()}_${file.name}`);
  await uploadBytes(fileRef, file);
  const url = await getDownloadURL(fileRef);
  return url;
}
