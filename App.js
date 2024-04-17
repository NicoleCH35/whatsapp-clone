import { StyleSheet } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState, useCallback } from "react";
import * as Font from "expo-font";
import "react-native-gesture-handler";
import AppNavigator from "./navigation/AppNavigator";
import colors from "./constants/colors";
import { Provider } from "react-redux";
import { store } from "./store/store";
import AsyncStorage from "@react-native-async-storage/async-storage";

SplashScreen.preventAutoHideAsync();
// AsyncStorage.clear();

export default function App() {
  const [loaded, setLoaded] = useState(false);

  // Load fonts
  const loadFonts = async () => {
    try {
      await Font.loadAsync({
        black: require("./assets/fonts/Montserrat-Black.ttf"),
        bold: require("./assets/fonts/Montserrat-Bold.ttf"),
        semiBold: require("./assets/fonts/Montserrat-SemiBold.ttf"),
        medium: require("./assets/fonts/Montserrat-Medium.ttf"),
        regular: require("./assets/fonts/Montserrat-Regular.ttf"),
        light: require("./assets/fonts/Montserrat-Light.ttf"),
        italic: require("./assets/fonts/Montserrat-Italic.ttf"),
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoaded(true);
    }
  };

  useEffect(() => {
    loadFonts();
  }, []);

  // Hide splash screen when app is loaded
  const onLayout = useCallback(async () => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  // Return nothing if app is not loaded
  if (!loaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <SafeAreaProvider style={styles.container} onLayout={onLayout}>
        <AppNavigator />
      </SafeAreaProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightGrey,
  },
});
