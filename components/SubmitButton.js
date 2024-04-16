import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import colors from "../constants/colors";

const SubmitButton = ({ title, onPress, disabled = false }) => {
  const disabledStyle = disabled ? styles.disabled : {};
  return (
    <TouchableOpacity
      style={{ ...styles.button, ...disabledStyle }}
      disabled={disabled}
      onPress={onPress}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    padding: 10,
    borderRadius: 15,
    marginVertical: 10,
    marginHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  disabled: {
    backgroundColor: colors.grey,
  },
  buttonText: {
    color: "white",
    fontFamily: "bold",
  },
});

export default SubmitButton;
