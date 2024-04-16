import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import PageContainer from "../components/PageContainer";
import colors from "../constants/colors";
import SignUpForm from "../components/SignUpForm";
import SignInForm from "../components/SignInForm";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import logo from "../assets/icon.png";

const AuthScreen = ({}) => {
  const [isSignUp, setIsSignUp] = useState(true);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <PageContainer style={{ backgroundColor: colors.white }}>
        <ScrollView>
          <KeyboardAvoidingView
            style={{ flex: 1, justifyContent: "center" }}
            behavior={Platform.OS === "ios" ? "height" : undefined}
            keyboardVerticalOffset={100}
          >
            <View style={styles.imageContainer}>
              <Image style={styles.image} source={logo} />
            </View>

            {isSignUp ? <SignUpForm /> : <SignInForm />}
            <TouchableOpacity
              style={styles.linkContainer}
              onPress={() => {
                setIsSignUp(!isSignUp);
              }}
            >
              <Text style={styles.link}>{`Switch to ${
                isSignUp ? "Sign In" : "Sign Up"
              }`}</Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </ScrollView>
      </PageContainer>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  linkContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 15,
  },
  link: {
    color: colors.blue,
    fontFamily: "semiBold",
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 15,
  },
  image: {
    width: 100,
    height: 100,
  },
});

export default AuthScreen;
