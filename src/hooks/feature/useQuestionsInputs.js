import { useArray } from "hooks";

function useQuestionsInputs(study, onSubmit) {
  const validate = (values) => {
    return values.map((value) => ({
      type: !value.type,
      prompt: !value.prompt,
    }));
  };

  const defaultValues = [];
  const defaultErrors = [];

  const initialValues = study.questions;
  const initialErrors = validate(initialValues);

  const notDefault = JSON.stringify(initialValues) !== JSON.stringify(defaultValues);

  const [
    values,
    setValues,
    {
      appendItem: appendValue,
      updateItem: updateValue,
      deleteItem: deleteValue,
      clearArray: clearValues,
      resetArray: resetValues,
    },
  ] = useArray(initialValues);

  const [
    errors,
    setErrors,
    {
      appendItem: appendError,
      updateItem: updateError,
      deleteItem: deleteError,
      clearArray: clearErrors,
      resetArray: resetErrors,
    },
  ] = useArray(notDefault ? initialErrors : defaultErrors);

  const hasChanged = JSON.stringify(initialValues) !== JSON.stringify(values);

  const createQuestion = () => {
    appendValue({ type: "Inclusion", prompt: "" });
    appendError({ type: false, prompt: false });
  };

  const updateQuestion = (index, name, value) => {
    updateValue(index, { ...values[index], [name]: value });
    updateError(index, { ...errors[index], [name]: !value });
  };

  const deleteQuestion = (index) => {
    deleteValue(index);
    deleteError(index);
  };

  const clearQuestions = () => {
    clearValues();
    clearErrors();
  };

  const resetQuestions = () => {
    resetValues(initialValues);
    resetErrors(initialErrors);
  };

  const handleSwap = (prev, oldIndex, newIndex) => {
    const updated = [...prev];
    const removed = updated.splice(oldIndex, 1);
    updated.splice(newIndex, 0, removed[0]);
    return updated;
  };

  const sortQuestions = ({ oldIndex, newIndex }) => {
    setValues((prev) => handleSwap(prev, oldIndex, newIndex));
    setErrors((prev) => handleSwap(prev, oldIndex, newIndex));
  };

  const handleSubmit = () => {
    const errorMessages = validate(values);
    const valid = errorMessages
      .map((v) => Object.values(v))
      .flat()
      .every((v) => !v);

    if (!valid) {
      setErrors(errorMessages);
      return;
    }

    return onSubmit(values);
  };

  return {
    values,
    errors,
    notDefault,
    hasChanged,
    createQuestion,
    updateQuestion,
    deleteQuestion,
    clearQuestions,
    resetQuestions,
    sortQuestions,
    handleSubmit,
  };
}

export default useQuestionsInputs;
