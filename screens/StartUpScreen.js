import React, { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import colors from "../constants/colors";
import styles from "../constants/styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { attemptedLogin } from "../store/authSlice";

const StartUpScreen = () => {
  const dispatch = useDispatch();

  const attemptLogin = async () => {
    const storage = await AsyncStorage.getItem("user");

    if (!storage) {
      dispatch(attemptedLogin());
      return;
    }

    const parsedData = JSON.parse(storedAuthInfo);
    const { token, id, expiryDate: expiryDateString } = parsedData;

    const expiryDate = new Date(expiryDateString);
    if (expiryDate <= new Date() || !token || !id) {
      dispatch(attemptedLogin());
      return;
    }
  };

  useEffect(() => {
    attemptLogin();
  }, []);

  return (
    <View style={styles.center}>
      <ActivityIndicator size="large" color={colors.primary} />
    </View>
  );
};

export default StartUpScreen;
