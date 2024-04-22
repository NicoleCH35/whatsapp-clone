import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import MainNavigator from "./MainNavigator";
import AuthScreen from "../screens/AuthScreen";
import { useSelector } from "react-redux";
import StartUpScreen from "../screens/StartUpScreen";

const AppNavigator = () => {
  const isAuth = useSelector((state) => {
    return state.auth.token !== null && state.auth.token !== "";
  });
  const attemptedSignIn = useSelector((state) => state.auth.didTryAutoLogin);

  return (
    <NavigationContainer>
      {isAuth && <MainNavigator />}
      {!isAuth && attemptedSignIn && <AuthScreen />}
      {!isAuth && !attemptedSignIn && <StartUpScreen />}
    </NavigationContainer>
  );
};

export default AppNavigator;
