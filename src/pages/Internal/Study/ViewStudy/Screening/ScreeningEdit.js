import { useEffect, useState } from "react";
import { Button } from "@chakra-ui/react";

import TabHeader from "../TabHeader";
import ScreeningInputs from "components/feature/Study/ScreeningInputs/ScreeningInputs";

function ScreeningEdit({ study, setEdit }) {
  const [inputs, setInputs] = useState([]);
  const [errors, setErrors] = useState([]);

  const validate = (inputs) => {
    return inputs.map((q) => ({
      type: !q.type,
      prompt: !q.prompt,
    }));
  };

  const createQuestion = () => {
    setInputs((prev) => prev.concat({ type: "Inclusion", prompt: "" }));
    setErrors((prev) => prev.concat({ type: false, prompt: false }));
  };

  const updateQuestion = (index, name, value) => {
    setInputs((prev) =>
      prev.map((q, i) => {
        return index === i ? { ...q, [name]: value } : q;
      })
    );

    setErrors((prev) =>
      prev.map((q, i) => {
        return index === i ? { ...q, [name]: !value } : q;
      })
    );
  };

  const deleteQuestion = (index) => {
    setInputs((prev) => prev.filter((_, i) => i !== index));
    setErrors((prev) => prev.filter((_, i) => i !== index));
  };

  const clearQuestions = () => {
    setInputs([]);
    setErrors([]);
  };

  const resetQuestions = () => {
    setInputs(study.questions);
    setErrors(validate(study.questions));
  };

  const sortQuestions = ({ oldIndex, newIndex }) => {
    setInputs((prev) => {
      const updated = [...prev];
      const removed = updated.splice(oldIndex, 1);
      updated.splice(newIndex, 0, removed[0]);
      return updated;
    });
  };

  useEffect(() => {
    if (study) {
      resetQuestions();
    }
  }, [study]);

  const handleCancel = () => {
    setEdit(false);
  };

  const handleSaveChanges = () => {
    setEdit(false);
  };

  return (
    <>
      <TabHeader heading="Screening">
        <Button onClick={handleCancel}>Cancel</Button>
        <Button colorScheme="green" onClick={handleSaveChanges}>
          Save Changes
        </Button>
      </TabHeader>
      <ScreeningInputs
        inputs={inputs}
        errors={errors}
        hasChanged={JSON.stringify(inputs) !== JSON.stringify(study.questions)}
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

export default ScreeningEdit;
