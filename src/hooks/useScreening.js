import { useState } from "react";

function useScreening(study) {
  const validate = (values) => {
    return values.map((value) => ({
      type: !value.type,
      prompt: !value.prompt,
    }));
  };

  const [values, setValues] = useState(study.questions);
  const [errors, setErrors] = useState(validate(study.questions));

  const createQuestion = () => {
    setValues((prev) => prev.concat({ type: "Inclusion", prompt: "" }));
    setErrors((prev) => prev.concat({ type: false, prompt: false }));
  };

  const updateQuestion = (index, name, value) => {
    setValues((prev) => prev.map((v, i) => (index === i ? { ...v, [name]: value } : v)));
    setErrors((prev) => prev.map((e, i) => (index === i ? { ...e, [name]: !value } : e)));
  };

  const deleteQuestion = (index) => {
    setValues((prev) => prev.filter((_, i) => i !== index));
    setErrors((prev) => prev.filter((_, i) => i !== index));
  };

  const clearQuestions = () => {
    setValues([]);
    setErrors([]);
  };

  const resetQuestions = () => {
    setValues(study.questions);
    setErrors(validate(study.questions));
  };

  const sortQuestions = ({ oldIndex, newIndex }) => {
    setValues((prev) => {
      const updated = [...prev];
      const removed = updated.splice(oldIndex, 1);
      updated.splice(newIndex, 0, removed[0]);
      return updated;
    });

    setErrors((prev) => {
      const updated = [...prev];
      const removed = updated.splice(oldIndex, 1);
      updated.splice(newIndex, 0, removed[0]);
      return updated;
    });
  };

  const handleSubmit = () =>
    new Promise((resolve, reject) => {
      const error = validate(values);
      const valid = error
        .map((v) => [v.type, v.prompt])
        .flat()
        .every((v) => !v);

      if (!valid) {
        setErrors(error);
        reject(error);
        return;
      }

      resolve();
    });

  return {
    values,
    errors,
    createQuestion,
    updateQuestion,
    deleteQuestion,
    clearQuestions,
    resetQuestions,
    sortQuestions,
    handleSubmit,
  };
}

export default useScreening;
