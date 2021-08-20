import { useArray } from "hooks";
import { object } from "utils";

function useLocationsInputs(study, onSubmit) {
  const validate = (values) => {
    return values.map((l) => !l);
  };

  const defaultValues = [];
  const defaultErrors = [];

  const initialValues = study.locations;
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

  const createLocation = () => {
    appendValue("");
    appendError(false);
  };

  const updateLocation = (index, value) => {
    updateValue(index, value);
    updateError(index, !value);
  };

  const deleteLocation = (index) => {
    deleteValue(index);
    deleteError(index);
  };

  const clearLocations = () => {
    clearValues();
    clearErrors();
  };

  const resetLocations = () => {
    resetValues(initialValues);
    resetErrors(initialErrors);
  };

  const handleSwap = (prev, oldIndex, newIndex) => {
    const updated = [...prev];
    const removed = updated.splice(oldIndex, 1);
    updated.splice(newIndex, 0, removed[0]);
    return updated;
  };

  const sortLocations = ({ oldIndex, newIndex }) => {
    setValues((prev) => handleSwap(prev, oldIndex, newIndex));
    setErrors((prev) => handleSwap(prev, oldIndex, newIndex));
  };

  const handleSubmit = () => {
    const errorMessages = validate(values);

    if (object.some(errorMessages)) {
      setErrors(errorMessages);
      return;
    }

    return onSubmit(values);
  };

  return {
    values,
    errors,
    hasChanged,
    notDefault,
    createLocation,
    updateLocation,
    deleteLocation,
    clearLocations,
    resetLocations,
    sortLocations,
    handleSubmit,
  };
}

export default useLocationsInputs;
