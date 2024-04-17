import { getFirebase } from "../firebase";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { ref, getDatabase, child, set, update } from "firebase/database";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { authenticate, logout } from "../../store/authSlice";
import { getUser } from "./user";

let timer;

export const signUp = (firstName, lastName, email, password) => {
  return async (dispatch) => {
    const app = getFirebase();
    const auth = getAuth(app);

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const { uid, stsTokenManager } = res.user;
      const { accessToken, expirationTime } = stsTokenManager;

      const expiryDate = new Date(expirationTime);

      const newUser = await createUser(uid, firstName, lastName, email);

      dispatch(authenticate({ user: newUser, token: accessToken }));
      saveDataToStorage(accessToken, uid, expiryDate);
      setLogoutTimer(expiryDate, dispatch);
    } catch (error) {
      const code = error.code;
      let message = "Something went wrong";

      if (code === "auth/email-already-in-use") {
        message = "Email already in use";
      }

      throw new Error(message);
    }
  };
};

export const signIn = (email, password) => {
  return async (dispatch) => {
    const app = getFirebase();
    const auth = getAuth(app);

    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      const { uid, stsTokenManager } = res.user;
      const { accessToken, expirationTime } = stsTokenManager;

      const expiryDate = new Date(expirationTime);

      const user = await getUser(uid);

      dispatch(authenticate({ user, token: accessToken }));
      saveDataToStorage(accessToken, uid, expiryDate);
      setLogoutTimer(expiryDate, dispatch);
    } catch (error) {
      const code = error.code;
      let message = "Something went wrong";

      console.log(code);

      if (code === "auth/user-not-found" || code === "auth/wrong-password") {
        message = "Email or password is incorrect.";
      }

      if (code === "auth/too-many-requests") {
        message = "Too many requests. Try again later";
      }

      throw new Error(message);
    }
  };
};

const setLogoutTimer = (expiryDate, dispatch) => {
  const timeNow = new Date();
  const millisecondsUntilExpiry = expiryDate - timeNow;
  timer = setTimeout(() => {
    dispatch(userLogout());
  }, millisecondsUntilExpiry);
};

export const userLogout = () => {
  return async (dispatch) => {
    AsyncStorage.clear();
    clearTimeout(timer);
    await dispatch(logout());
  };
};

export const updateUser = async (id, data) => {
  const names = `${data.firstName} ${data.lastName}`;
  data.names = names;

  const dbRef = ref(getDatabase());
  const childRef = child(dbRef, `users/${id}`);

  await update(childRef, data);
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
      expiryDate: expiryDate.toISOString(),
    })
  );
};
