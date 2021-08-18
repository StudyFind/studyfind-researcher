import { SecondaryButton } from "components/simple/Buttons/SecondaryButton";
import { FaPlus, FaTrashAlt, FaUndo } from "react-icons/fa";

const { VStack, HStack } = require("@chakra-ui/react");
const { EditorButton } = require("components/simple/Buttons/EditorButton");
const { default: QuestionList } = require("./QuestionList");

function ScreeningInputs({
  values,
  errors,
  hasChanged,
  sortQuestions,
  createQuestion,
  updateQuestion,
  deleteQuestion,
  resetQuestions,
  clearQuestions,
}) {
  return (
    <VStack spacing="10px" align="stretch">
      <HStack>
        {hasChanged && (
          <EditorButton icon={<FaUndo />} onClick={resetQuestions}>
            Undo Changes
          </EditorButton>
        )}
        {values.length && (
          <EditorButton color="red" icon={<FaTrashAlt />} onClick={clearQuestions}>
            Delete All
          </EditorButton>
        )}
      </HStack>
      <QuestionList
        values={values}
        errors={errors}
        updateQuestion={updateQuestion}
        deleteQuestion={deleteQuestion}
        onSortEnd={sortQuestions}
      />
      <SecondaryButton leftIcon={<FaPlus />} onClick={createQuestion}>
        Add Question
      </SecondaryButton>
    </VStack>
  );
}

export default ScreeningInputs;
