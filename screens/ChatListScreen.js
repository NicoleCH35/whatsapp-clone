import React from "react";
import { Button, Text } from "react-native";
import PageContainer from "../components/PageContainer";

const ChatListScreen = ({ navigation }) => {
  return (
    <PageContainer>
      <Text style={{ fontFamily: "black", color: "red" }}>ChatListScreen</Text>
      <Button title="Chat" onPress={() => navigation.navigate("Chat")} />
    </PageContainer>
  );
};

export default ChatListScreen;
