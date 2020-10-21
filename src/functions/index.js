const validate = {
  all: (inputs) => {
    const errors = {};

    for (const i in inputs) {
      if (inputs[i] !== undefined) {
        if (i.toLowerCase().includes("email")) {
          errors[i] = validate.email(inputs[i]);
        } else if (i.toLowerCase().includes("password")) {
          errors[i] = validate.password(inputs[i]);
        } else {
          errors[i] = validate.input(inputs[i]);
        }
      }
    }

    return errors;
  },

  email: (email) => {
    const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const checkValid = EMAIL_REGEX.test(email.toLowerCase());

    if (!email) return " ";
    if (!checkValid) return "Email is invalid";
    return "";
  },

  password: (password) => {
    const checkCase = password !== password.toLowerCase();
    const checkSize = password.length > 7;

    if (!password) return " ";
    if (!checkCase && !checkSize) return "Password must have 8 characters and one capital letter";
    if (!checkCase) return "Password must have a capital letter";
    if (!checkSize) return "Password must have 8 characters";
    return "";
  },

  input: (i) => !i,
};

export { validate };
