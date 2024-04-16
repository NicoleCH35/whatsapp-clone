import { getFirebase } from "../firebase";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { ref, getDatabase, child, set } from "firebase/database";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { authenticate } from "../../store/authSlice";

export const signUp = (firstName, lastName, email, password) => {
  return async (dispatch) => {
    const app = getFirebase();
    const auth = getAuth(app);

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const { uid, stsTokenManager } = res.user;
      const { accessToken, expirationTime } = stsTokenManager;

      const expiryDate = new Date(expirationTime).toISOString();

      const newUser = await createUser(uid, firstName, lastName, email);

      dispatch(authenticate({ user: newUser, token: accessToken }));
      saveDataToStorage(accessToken, uid, expiryDate);
    } catch (error) {
      console.log("----ERROR 22222", error);
      const code = error.code;
      let message = "Something went wrong";

      if (code === "auth/email-already-in-use") {
        message = "Email already in use";
      }

      throw new Error(message);
    }
  };
};

const createUser = async (id, firstName, lastName, email) => {
  const names = `${firstName} ${lastName}`;
  const user = {
    id,
    firstName,
    lastName,
    names,
    email,
    createdAt: new Date().toISOString(),
  };

  const dbRef = ref(getDatabase());
  const childRef = child(dbRef, `users/${id}`);
  await set(childRef, user);
  return user;
};

const saveDataToStorage = (token, id, expiryDate) => {
  AsyncStorage.setItem(
    "user",
    JSON.stringify({
      token,
      id,
      expiryDate,
    })
  );
};
