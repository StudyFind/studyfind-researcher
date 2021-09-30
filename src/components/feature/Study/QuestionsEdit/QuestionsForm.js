import { useQuestionsForm } from "hooks";

import QuestionsInputs from "./QuestionsInputs";

function QuestionsForm({ study, onSubmit, Wrapper }) {
  const questionsForm = useQuestionsForm(study, onSubmit);

  const title = "Questions";
  const description =
    "It is important that you modify these inclusion and exclusion criteria into Yes / No / Maybe questions. These questions will form a screening survey which will be asked to participants when they enroll for your study. Their responses to these questions will be used to calculate their eligiblity score, a metric that should help you determine how likely a participant is to be eligible.";

  const handleSubmit = () => {
    const isValid = questionsForm.validate();

    if (isValid) {
      onSubmit(questionsForm.values);
    }
  };

  return (
    <Wrapper
      title={title}
      description={description}
      handleSubmit={handleSubmit}
    >
      <QuestionsInputs
        values={questionsForm.values}
        errors={questionsForm.errors}
        hasChanged={questionsForm.hasChanged}
        notDefault={questionsForm.notDefault}
        createQuestion={questionsForm.create}
        updateQuestion={questionsForm.update}
        deleteQuestion={questionsForm.delete}
        clearQuestions={questionsForm.clear}
        resetQuestions={questionsForm.reset}
        sortQuestions={questionsForm.onSortEnd}
      />
    </Wrapper>
  );
}

export default QuestionsForm;
