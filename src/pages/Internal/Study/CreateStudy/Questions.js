import { useQuestionsInputs } from "hooks";

import { Box, Heading, Text } from "@chakra-ui/react";

import QuestionsInputs from "components/feature/Study/QuestionsInputs/QuestionsInputs";
import WizardFormButton from "components/complex/WizardForm/WizardFormButtons";

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
    <Box paddingY="20px">
      <Heading>Questions</Heading>
      <Text color="gray.500" paddingTop="5px" paddingBottom="10px">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
      </Text>
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
    </Box>
  );
}

export default Questions;
