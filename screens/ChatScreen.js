import React, { useState, useCallback } from "react";
import {
  Button,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import backgroundImage from "../assets/images/chat_background.jpg";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";
import colors from "../constants/colors";

const ChatScreen = ({}) => {
  const [message, setMessage] = useState("");

  const sendMessage = useCallback(() => {
    setMessage("");
  }, [message]);

  return (
    <SafeAreaView edges={["right", "left", "bottom"]} style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={100}
      >
        <ImageBackground
          style={styles.backgroundImage}
          source={backgroundImage}
        ></ImageBackground>
        <View style={styles.inputContainer}>
          <TouchableOpacity style={styles.mediaButton} onPress={() => {}}>
            <AntDesign name="plus" size={24} color={colors.blue} />
          </TouchableOpacity>
          <TextInput
            style={styles.textbox}
            value={message}
            onChangeText={(value) => {
              setMessage(value);
            }}
            onSubmitEditing={sendMessage}
          />
          {!message ? (
            <TouchableOpacity style={styles.mediaButton} onPress={() => {}}>
              <AntDesign name="camerao" size={24} color={colors.blue} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={{ ...styles.mediaButton, ...styles.sendButton }}
              onPress={sendMessage}
            >
              <AntDesign name="upload" size={20} color={colors.white} />
              {/* <Text>Send</Text> */}
            </TouchableOpacity>
          )}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  backgroundImage: {
    flex: 1,
    opacity: 0.4,
  },
  inputContainer: {
    flexDirection: "row",
    padding: 10,
  },
  textbox: {
    flex: 1,
    backgroundColor: colors.lightGrey,
    borderRadius: 20,
    paddingHorizontal: 10,
    marginHorizontal: 10,
  },
  mediaButton: {
    alignItems: "center",
    justifyContent: "center",
    width: 35,
  },
  sendButton: {
    backgroundColor: colors.blue,
    borderRadius: 20,
    // padding: 8,
  },
});

export default ChatScreen;
