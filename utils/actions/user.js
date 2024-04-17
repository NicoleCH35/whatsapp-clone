import { ref, getDatabase, child, get } from "firebase/database";
import { getFirebase } from "../firebase";

export const getUser = async (id) => {
  try {
    const app = getFirebase();
    const dbRef = ref(getDatabase(app));
    const userRef = child(dbRef, `users/${id}`);

    const snapshot = await get(userRef);
    return snapshot.val();
  } catch (error) {
    console.log(error);
  }
};
