import validator from "validator";
import { useArray } from "hooks";

function useResourcesInputs(study, onSubmit) {
  const check = (name, value) => {
    return {
      name: !value,
      link: !validator.isURL(value),
    }[name];
  };

  const validate = (values) => {
    return values.map((value) => ({
      name: check("name", value.name),
      link: check("link", value.link),
    }));
  };

  const defaultValues = [];
  const defaultErrors = [];

  const initialValues = study.resources;
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

  const createResource = () => {
    appendValue({ name: "", link: "" });
    appendError({ name: false, link: false });
  };

  const updateResource = (index, name, value) => {
    updateValue(index, { ...values[index], [name]: value });
    updateError(index, { ...errors[index], [name]: check(name, value) });
  };

  const deleteResource = (index) => {
    deleteValue(index);
    deleteError(index);
  };

  const clearResources = () => {
    clearValues();
    clearErrors();
  };

  const resetResources = () => {
    resetValues(initialValues);
    resetErrors(initialErrors);
  };

  const handleSwap = (prev, oldIndex, newIndex) => {
    const updated = [...prev];
    const removed = updated.splice(oldIndex, 1);
    updated.splice(newIndex, 0, removed[0]);
    return updated;
  };

  const sortResources = ({ oldIndex, newIndex }) => {
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
    createResource,
    updateResource,
    deleteResource,
    clearResources,
    resetResources,
    sortResources,
    handleSubmit,
  };
}

export default useResourcesInputs;
