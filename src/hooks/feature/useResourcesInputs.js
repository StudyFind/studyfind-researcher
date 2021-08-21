import useSortableObjectArrayWithBooleanErrors from "./useSortableObjectArrayWithBooleanErrors";

function useResourcesInputs(study) {
  return useSortableObjectArrayWithBooleanErrors(study.resources, {
    name: "Inclusion",
    link: "",
  });
}

export default useResourcesInputs;
