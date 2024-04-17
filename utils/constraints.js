import { validate } from "validate.js";

// String validation
export const validateString = (id, value) => {
  const rule = {
    presence: { allowEmpty: false },
    format: {
      pattern: "[a-z]+",
      flags: "i",
      message: "can only contain letters",
    },
  };
  const res = validate({ [id]: value }, { [id]: rule });
  return res && res[id];
};

// Email validation
export const validateEmail = (id, value) => {
  const rule = {
    presence: { allowEmpty: false },
    email: true,
  };
  const res = validate({ [id]: value }, { [id]: rule });
  return res && res[id];
};

// Password validation
export const validatePassword = (id, value) => {
  const rule = {
    presence: { allowEmpty: false },
    length: {
      minimum: 6,
      message: "must be at least 6 characters",
    },
  };
  const res = validate({ [id]: value }, { [id]: rule });
  return res && res[id];
};

// Length validation
export const validateLength = (id, value, minLength, maxLength, allowEmpty) => {
  const rule = {
    presence: { allowEmpty },
    length: {
      minimum: minLength,
      maximum: maxLength,
      message: `must be between ${minLength} and ${maxLength} characters`,
    },
  };
  const res = validate({ [id]: value }, { [id]: rule });
  return res && res[id];
};
