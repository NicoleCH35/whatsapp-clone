import {
  validateString,
  validateEmail,
  validatePassword,
} from "../constraints";

export const validateInput = (input, value) => {
  switch (input) {
    case "firstName":
    case "lastName":
      return validateString(input, value);
      break;
    case "email":
      return validateEmail(input, value);
      break;
    case "password":
      return validatePassword(input, value);
      break;
  }
};
