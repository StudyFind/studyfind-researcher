import useSortableObjectArrayWithBooleanErrors from "./useSortableObjectArrayWithBooleanErrors";

function useLocationsInputs(study) {
  return useSortableObjectArrayWithBooleanErrors(study.locations, { address: "" });
}

export default useLocationsInputs;
