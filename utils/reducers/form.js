export const reducer = (state, action) => {
  const { id, result, value } = action;

  const validateInput = {
    ...state.inputValid,
    [id]: result,
  };

  const values = {
    ...state.values,
    [id]: value,
  };

  return {
    ...state,
    inputValid: {
      ...validateInput,
    },
    values: {
      ...values,
    },
    formValid: Object.values(validateInput).every(
      (value) => value === undefined
    ),
  };
};
