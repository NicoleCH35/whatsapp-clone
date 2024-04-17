import React, { useCallback, useReducer, useState, useEffect } from "react";
import { ActivityIndicator, Alert } from "react-native";
import PageContainer from "../components/PageContainer";
import Input from "../components/Input";
import { validateInput } from "../utils/actions/form";
import { reducer } from "../utils/reducers/form";
import { AntDesign } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import SubmitButton from "../components/SubmitButton";
import { updateUser, userLogout } from "../utils/actions/auth";
import colors from "../constants/colors";

const SettingsScreen = () => {
  const user = useSelector((state) => state.auth.user);

  const initialFormState = {
    inputValid: {
      firstName: undefined,
      lastName: undefined,
      about: undefined,
    },
    values: {
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      about: user.about || "",
    },
    formValid: false,
  };

  const [formState, dispatchFormState] = useReducer(reducer, initialFormState);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const inputChangeHandler = useCallback(
    (id, value) => {
      const result = validateInput(id, value);
      console.log("result", result);
      dispatchFormState({ id, result, value });
    },
    [dispatchFormState]
  );

  useEffect(() => {
    if (error) {
      Alert.alert("Error", error, [{ text: "Okay" }]);
    }
  }, [error]);

  const saveHandler = async () => {
    try {
      setLoading(true);
      await updateUser(user.id, formState.values);
      setError(null);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageContainer>
      <Input
        id="firstName"
        label="First name"
        icon={(props) => <AntDesign name="user" size={15} {...props} />}
        onInputChange={inputChangeHandler}
        initialValue={user.firstName}
        error={formState.inputValid.firstName}
      />

      <Input
        id="lastName"
        label="Last name"
        icon={(props) => <AntDesign name="user" size={15} {...props} />}
        onInputChange={inputChangeHandler}
        initialValue={user.lastName}
        error={formState.inputValid.lastName}
      />

      <Input
        id="about"
        label="About"
        icon={(props) => <AntDesign name="infocirlceo" size={15} {...props} />}
        onInputChange={inputChangeHandler}
        initialValue={user.about}
        error={formState.inputValid.about}
      />

      {loading ? (
        <ActivityIndicator size={"small"} color={colors.primary} />
      ) : (
        <SubmitButton
          title="Update"
          onPress={saveHandler}
          disabled={!formState.formValid}
        />
      )}

      <SubmitButton
        title="Logout"
        onPress={() => {
          dispatch(userLogout());
        }}
        style={{ backgroundColor: colors.red }}
      />
    </PageContainer>
  );
};

export default SettingsScreen;
