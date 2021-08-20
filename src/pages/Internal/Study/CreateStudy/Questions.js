import { useQuestionsInputs } from "hooks";

import QuestionsInputs from "components/feature/Study/QuestionsInputs/QuestionsInputs";
import WizardFormButton from "components/complex/WizardForm/WizardFormButtons";
import CreateStudyWrapper from "./CreateStudyWrapper";

function Questions({ newStudy, setNewStudy, handleBack, handleNext }) {
  const {
    values,
    errors,
    hasChanged,
    notDefault,
    createQuestion,
    updateQuestion,
    deleteQuestion,
    clearQuestions,
    resetQuestions,
    sortQuestions,
    handleSubmit,
  } = useQuestionsInputs(newStudy, (data) => {
    setNewStudy((prev) => ({ ...prev, questions: data }));
    handleNext();
  });

  return (
    <CreateStudyWrapper
      title="Questions"
      description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation"
    >
      <QuestionsInputs
        values={values}
        errors={errors}
        hasChanged={hasChanged}
        notDefault={notDefault}
        createQuestion={createQuestion}
        updateQuestion={updateQuestion}
        deleteQuestion={deleteQuestion}
        clearQuestions={clearQuestions}
        resetQuestions={resetQuestions}
        sortQuestions={sortQuestions}
      />
      <WizardFormButton handleBack={handleBack} handleNext={handleSubmit} />
    </CreateStudyWrapper>
  );
}

export default Questions;
