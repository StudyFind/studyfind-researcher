import useSortableObjectArrayWithBooleanErrors from "./useSortableObjectArrayWithBooleanErrors";

function useResourcesForm(study) {
  return useSortableObjectArrayWithBooleanErrors(study.resources, {
    name: "Inclusion",
    link: "",
  });
}

export default useResourcesForm;
