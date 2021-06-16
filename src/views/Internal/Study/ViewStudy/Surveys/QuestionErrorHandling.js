function handleErrors(question, setErrors) {
  setErrors({ prompt: null, constraints: {}, options: [] });
  if (!question.prompt || question.prompt === "") {
    setErrors((prev) => {
      return { ...prev, prompt: "Please enter a prompt." };
    });
  }
  if (["multiple choice", "checkbox", "dropdown"].includes(question.type)) {
    question?.options?.map((option, i) => {
      setErrors((prev) => {
        return { ...prev, options: [...prev.options, null] };
      });
      if (!option || option === "") {
        setErrors((prev) => {
          const temp = { ...prev };
          temp.options[i] = "Please enter a value for all answer choices.";
          return temp;
        });
      }
      return null;
    });
  }

  if (["short answer", "long answer"].includes(question.type)) {
    if (parseInt(question.constraints.characterMin) > parseInt(question.constraints.characterMax)) {
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

  // if (["date"].includes(question.type)) {
  //   //TODO
  // }
  // if (["time"].includes(question.type)) {
  //   //TODO
  // }
  // if (["number"].includes(question.type)) {
  //   //TODO
  // }
}

export default handleErrors;
