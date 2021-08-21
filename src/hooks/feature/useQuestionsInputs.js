import useSortableObjectArrayWithBooleanErrors from "./useSortableObjectArrayWithBooleanErrors";

function useQuestionsInputs(study) {
  return useSortableObjectArrayWithBooleanErrors(study.questions, {
    type: "Inclusion",
    prompt: "",
  });
}

export default useQuestionsInputs;
