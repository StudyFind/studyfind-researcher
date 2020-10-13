import { useState, useEffect } from "react";

function validateEmail(email) {
  if (!email) return " ";
  const checkValid = emailRegex.test(email.toLowerCase());
  if (!checkValid) return "Email is invalid";
  return "";
}

function validatePassword(password) {
  if (!password) return " ";
  const checkCase = password !== password.toLowerCase();
  const checkSize = password.length > 7;
  if (!checkCase && !checkSize)
    return "Password must have at least 8 digits and one capital letter";
  if (!checkCase) return "Password must have a capital letter";
  if (!checkSize) return "Password must be at least 8 characters long";
  return "";
}

function validate(inputs) {
  const errors = {};

  for (const i in inputs) {
    const value = inputs[i];
    if (value !== undefined) {
      switch (i) {
        case "email":
          errors[i] = validateEmail(value);
        case "password":
          errors[i] = validatePassword(value);
        default:
          errors[i] = !value;
      }
    }
  }

  return errors;
}

function useForm(initial) {
  const [inputs, setInputs] = useState(initial || {});
  const [errors, setErrors] = useState({});

  const setForm = (name, value) => {
    const newInputs = { ...inputs, [name]: value.trim() };
    const newErrors = { ...errors, [name]: validate(newInputs) };
    setInputs(newInputs);
    setErrors(newErrors);
  };

  return [inputs, errors, setForm];
}
