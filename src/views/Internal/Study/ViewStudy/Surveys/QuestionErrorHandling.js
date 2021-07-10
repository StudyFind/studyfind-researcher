function handleErrors(question, setErrors) {
  setErrors({ prompt: "", constraints: {}, options: [] });
  let errors = { prompt: "", constraints: {}, options: [] };
  if (!question.prompt || question.prompt === "") {
    setErrors((prev) => {
      return { ...prev, prompt: "Please enter a prompt." };
    });
    errors = { ...errors, prompt: "Please enter a prompt." };
  }
  if (["multiple choice", "checkbox", "dropdown"].includes(question.type)) {
    question?.options?.map((option, i) => {
      errors.options = [...errors.options, null];
      setErrors((prev) => {
        return { ...prev, options: [...prev.options, null] };
      });
      if (!option || option === "") {
        errors.options[i] = "Please enter a value for all answer choices.";
        setErrors((prev) => {
          const temp = { ...prev };
          temp.options[i] = "Please enter a value for all answer choices.";
          return temp;
        });
      }
      return null;
    });
  }

  if (
    ["short answer", "long answer"].includes(question.type) &&
    question.constraints.characterMin &&
    question.constraints.characterMax
  ) {
    if (parseInt(question.constraints.characterMin) > parseInt(question.constraints.characterMax)) {
      errors.constraints = {
        characterMin:
          "The maximum number of characters must be greater than the minimum number of characters.",
        characterMax: " ",
      };
      setErrors((prev) => {
        return {
          ...prev,
          constraints: {
            characterMin:
              "The maximum number of characters must be greater than the minimum number of characters.",
            characterMax: " ",
          },
        };
      });
    }
  }

  if (["date"].includes(question.type)) {
    if (Date.parse(question?.constraints?.dateMin) > Date.parse(question?.constraints?.dateMax)) {
      errors.constraints = {
        dateMin: "The latest possible date must be later than the earliest date.",
        dateMax: " ",
      };
      setErrors((prev) => {
        return {
          ...prev,
          constraints: {
            dateMin: "The latest possible date must be later than the earliest date.",
            dateMax: " ",
          },
        };
      });
    }
    //TODO change date selection to a date selection component with range for cleaner handling
  }
  if (["number"].includes(question.type)) {
    if (parseInt(question.constraints.numberMin) > parseInt(question.constraints.numberMax)) {
      errors.constraints = {
        numberMin:
          "The maximum number of characters must be greater than the minimum number of characters.",
        numberMax: " ",
      };
      setErrors((prev) => {
        return {
          ...prev,
          constraints: {
            numberMin:
              "The maximum number of characters must be greater than the minimum number of characters.",
            numberMax: " ",
          },
        };
      });
    }
  }
  return errors;
}

export default handleErrors;
