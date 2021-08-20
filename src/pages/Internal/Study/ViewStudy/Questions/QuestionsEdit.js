import { useQuestionsInputs } from "hooks";
import { Button } from "@chakra-ui/react";
import { study as researchStudy } from "database/mutations";

import TabHeader from "../TabHeader";
import QuestionsInputs from "components/feature/Study/QuestionsInputs/QuestionsInputs";

function QuestionsEdit({ study, setEdit }) {
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
  } = useQuestionsInputs(study, (data) => {
    researchStudy.update({ ...study, questions: data });
    setEdit(false);
  });

  const handleCancel = () => {
    resetQuestions();
    setEdit(false);
  };

  return (
    <>
      <TabHeader heading="Questions">
        <Button onClick={handleCancel}>Cancel</Button>
        <Button colorScheme="green" onClick={handleSubmit}>
          Save Changes
        </Button>
      </TabHeader>
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
    </>
  );
}

export default QuestionsEdit;
