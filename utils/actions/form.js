import {
  validateString,
  validateEmail,
  validatePassword,
  validateLength,
} from "../constraints";

export const validateInput = (input, value) => {
  switch (input) {
    case "firstName":
    case "lastName":
      return validateString(input, value);
    case "email":
      return validateEmail(input, value);
    case "password":
      return validatePassword(input, value);
    case "about":
      return validateLength(input, value, 0, 150, true);
  }
};
