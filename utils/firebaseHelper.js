// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import {
  initializeAuth,
  getReactNativePersistence,
  getAuth,
} from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const getFirebaseApp = () => {
  const firebaseConfig = {
    apiKey: "AIzaSyBbRVxMyzt9R4N1SoqJqbEz6Usp4wma2AE",
    authDomain: "messaging-clone-97db8.firebaseapp.com",
    projectId: "messaging-clone-97db8",
    storageBucket: "messaging-clone-97db8.appspot.com",
    messagingSenderId: "15285119924",
    appId: "1:15285119924:web:c038c630fb3b906f5120e1",
    measurementId: "G-9SESBH3VYT",
    databaseURL:
      "https://messaging-clone-97db8-default-rtdb.europe-west1.firebasedatabase.app",
  };

  let app;
  let auth;
  if (!getApps().length) {
    try {
      app = initializeApp(firebaseConfig);
      auth = initializeAuth(app, {
        persistence: getReactNativePersistence(AsyncStorage),
      });
    } catch (error) {
      console.log("Firebase initialization error");
    }
  }

  app = getApp();
  auth = getAuth(app);

  return app;
};
