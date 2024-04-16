import React, { useReducer, useCallback } from "react";
import Input from "../components/Input";
import { AntDesign } from "@expo/vector-icons";
import SubmitButton from "../components/SubmitButton";
import { validateInput } from "../utils/actions/form";
import { reducer } from "../utils/reducers/form";

const initialFormState = {
  inputValid: {
    firstName: false,
    lastName: false,
  },
  values: {
    firstName: "",
    lastName: "",
  },
  formValid: false,
};

const SignInForm = () => {
  const [formState, dispatchFormState] = useReducer(reducer, initialFormState);

  const inputChangeHandler = useCallback(
    (id, value) => {
      const result = validateInput(id, value);
      dispatchFormState({ id, result, value });
    },
    [dispatchFormState]
  );

  return (
    <>
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
      />

      <SubmitButton
        title="Sign In"
        onPress={() => {
          console.log("Pressed");
        }}
        disabled={!formState.formValid}
      />
    </>
  );
};

export default SignInForm;
