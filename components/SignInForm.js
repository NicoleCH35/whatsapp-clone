import React, { useReducer, useCallback, useState, useEffect } from "react";
import Input from "../components/Input";
import { AntDesign } from "@expo/vector-icons";
import SubmitButton from "../components/SubmitButton";
import { validateInput } from "../utils/actions/form";
import { reducer } from "../utils/reducers/form";
import { signIn } from "../utils/actions/auth";
import { ActivityIndicator, Alert } from "react-native";
import { useDispatch } from "react-redux";
import colors from "../constants/colors";

const DEV = true;

const initialFormState = {
  inputValid: {
    email: DEV,
    password: DEV,
  },
  values: {
    email: DEV ? "nicolech35+35@gmail.com" : "",
    password: DEV ? "qwerty" : "",
  },
  formValid: DEV,
};

const SignInForm = () => {
  const [formState, dispatchFormState] = useReducer(reducer, initialFormState);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      Alert.alert("Error", error, [{ text: "Okay" }]);
    }
  }, [error]);

  const inputChangeHandler = useCallback(
    (id, value) => {
      const result = validateInput(id, value);
      dispatchFormState({ id, result, value });
    },
    [dispatchFormState]
  );

  const authHandler = useCallback(async () => {
    try {
      setLoading(true);
      const action = signIn(formState.values.email, formState.values.password);
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
        id="email"
        label="Email"
        icon={(props) => <AntDesign name="mail" size={15} {...props} />}
        onInputChange={inputChangeHandler}
        keyboardType="email-address"
        autoCapitalize="none"
        defaultValue={formState.values.email}
        error={formState.inputValid.email}
      />
      <Input
        id="password"
        label="Password"
        icon={(props) => <AntDesign name="lock1" size={15} {...props} />}
        onInputChange={inputChangeHandler}
        secureTextEntry
        defaultValue={formState.values.password}
        error={formState.inputValid.password}
        autoCapitalize="none"
      />

      {loading ? (
        <ActivityIndicator size={"small"} color={colors.primary} />
      ) : (
        <SubmitButton
          title="Sign In"
          onPress={authHandler}
          disabled={!formState.formValid}
        />
      )}
    </>
  );
};

export default SignInForm;
