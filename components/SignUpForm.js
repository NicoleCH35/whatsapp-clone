import React, { useReducer, useCallback, useEffect, useState } from "react";
import Input from "../components/Input";
import { AntDesign } from "@expo/vector-icons";
import SubmitButton from "../components/SubmitButton";
import { validateInput } from "../utils/actions/form";
import { reducer } from "../utils/reducers/form";
import { signUp } from "../utils/actions/auth";
import { ActivityIndicator, Alert } from "react-native";
import colors from "../constants/colors";
import { useDispatch } from "react-redux";

const initialFormState = {
  inputValid: {
    firstName: false,
    lastName: false,
    email: false,
    password: false,
  },
  values: {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  },
  formValid: false,
};

const SignUpForm = () => {
  const [formState, dispatchFormState] = useReducer(reducer, initialFormState);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const inputChangeHandler = useCallback(
    (id, value) => {
      const result = validateInput(id, value);
      dispatchFormState({ id, result, value });
    },
    [dispatchFormState]
  );

  useEffect(() => {
    if (error) {
      Alert.alert("Error", error, [{ text: "Okay" }]);
    }
  }, [error]);

  const authHandler = useCallback(async () => {
    try {
      setLoading(true);
      const action = signUp(
        formState.values.firstName,
        formState.values.lastName,
        formState.values.email,
        formState.values.password
      );
      setError(null);
      await dispatch(action);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  }, [dispatch, formState]);

  return (
    <>
      <Input
        id="firstName"
        label="First Name"
        icon={(props) => <AntDesign name="user" size={15} {...props} />}
        onInputChange={inputChangeHandler}
        error={formState.inputValid.firstName}
      />
      <Input
        id="lastName"
        label="Last Name"
        icon={(props) => <AntDesign name="user" size={15} {...props} />}
        onInputChange={inputChangeHandler}
        error={formState.inputValid.lastName}
      />
      <Input
        id="email"
        label="Email"
        icon={(props) => <AntDesign name="mail" size={15} {...props} />}
        onInputChange={inputChangeHandler}
        keyboardType="email-address"
        autoCapitalize="none"
        error={formState.inputValid.email}
      />
      <Input
        id="password"
        label="Password"
        icon={(props) => <AntDesign name="lock1" size={15} {...props} />}
        onInputChange={inputChangeHandler}
        secureTextEntry
        error={formState.inputValid.password}
        autoCapitalize={"none"}
      />

      {loading ? (
        <ActivityIndicator size={"small"} color={colors.primary} />
      ) : (
        <SubmitButton
          title="Sign Up"
          onPress={authHandler}
          disabled={!formState.formValid}
        />
      )}
    </>
  );
};

export default SignUpForm;
