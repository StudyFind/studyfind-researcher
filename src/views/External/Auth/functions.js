function getDefaultTab() {
  const modes = {
    verifyEmail: "verify email",
    resetPassword: "reset password",
  };

  const url = new URL(window.location.href);
  const mode = url.searchParams.get("mode");
  const accountExists = localStorage.getItem("exists") === "true";

  return modes[mode] || (accountExists ? "login" : "sign up");
}

function validateEmail(email) {
  if (!email) return " ";
  const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
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
          break;
        case "password":
          errors[i] = validatePassword(value);
          break;
        default:
          errors[i] = !value;
          break;
      }
    }
  }
  return errors;
}

export { getDefaultTab, validate };
