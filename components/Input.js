import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import colors from "../constants/colors";

const Input = ({
  id,
  label,
  icon,
  error,
  onInputChange,
  initialValue,
  ...rest
}) => {
  const Icon = icon;

  const [value, setValue] = useState(initialValue);

  const onChange = (text) => {
    if (onInputChange) {
      setValue(text);
      onInputChange(id, text);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputContainer}>
        {icon && <Icon style={styles.icon} />}
        <TextInput
          style={styles.input}
          onChangeText={onChange}
          value={value}
          {...rest}
        />
      </View>
      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  inputContainer: {
    flexDirection: "row",
    backgroundColor: colors.offWhite,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    alignItems: "center",
  },
  icon: {
    marginRight: 5,
    color: colors.grey,
  },
  label: {
    marginVertical: 8,
    fontFamily: "bold",
    color: colors.offBlack,
  },
  input: {
    color: colors.offBlack,
    flex: 1,
    fontFamily: "regular",
    paddingTop: 0,
  },
  errorContainer: {
    marginVertical: 5,
  },
  errorText: {
    color: colors.red,
    fontFamily: "semiBold",
    fontSize: 12,
  },
});

export default Input;
