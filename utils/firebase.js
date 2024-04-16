import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const getFirebase = () => {
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

  const app = initializeApp(firebaseConfig);

  const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
  // const analytics = getAnalytics(app);

  return app;
};
