import { useQuestionsInputs } from "hooks";

import QuestionsInputs from "components/feature/Study/QuestionsInputs/QuestionsInputs";

function QuestionsForm({ study, onSubmit, Wrapper }) {
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
  } = useQuestionsInputs(study, onSubmit);

  const title = "Questions";
  const description =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation";

  return (
    <Wrapper title={title} description={description} handleSubmit={handleSubmit}>
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
    </Wrapper>
  );
}

export default QuestionsForm;
