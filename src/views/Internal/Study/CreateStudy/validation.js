export const check = {
  title: (value) => {
    const length = value.length;
    const min = 50;
    const max = 100;

    if (!value.length) {
      return "The study title cannot be empty";
    }

    if (length < min || length > max) {
      return `Please ensure that the study title is between ${min} and ${max} characters`;
    }
  },

  description: (value) => {
    const length = value.length;
    const min = 300;
    const max = 500;

    if (!value.length) {
      return "The study description cannot be empty";
    }

    if (length < min || length > max) {
      return `Please ensure that the study description is between ${min} and ${max} characters`;
    }
  },

  question: (value) => {
    if (!value.prompt.length) {
      return " ";
    }

    return "";
  },
};
