import { useEffect, useState } from "react";
import { Button } from "@chakra-ui/react";

import TabHeader from "../TabHeader";
import QuestionsInputs from "components/feature/Study/QuestionsInputs/QuestionsInputs";

function QuestionsEdit({ study, setEdit }) {
  const [values, setValues] = useState([]);
  const [errors, setErrors] = useState([]);

  const validate = (values) => {
    return values.map((q) => ({
      type: !q.type,
      prompt: !q.prompt,
    }));
  };

  const createQuestion = () => {
    setValues((prev) => prev.concat({ type: "Inclusion", prompt: "" }));
    setErrors((prev) => prev.concat({ type: false, prompt: false }));
  };

  const updateQuestion = (index, name, value) => {
    setValues((prev) =>
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
    setValues((prev) => prev.filter((_, i) => i !== index));
    setErrors((prev) => prev.filter((_, i) => i !== index));
  };

  const clearQuestions = () => {
    setValues([]);
    setErrors([]);
  };

  const resetQuestions = () => {
    setValues(study.questions);
    setErrors(validate(study.questions));
  };

  const sortQuestions = ({ oldIndex, newIndex }) => {
    setValues((prev) => {
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
      <TabHeader heading="Questions">
        <Button onClick={handleCancel}>Cancel</Button>
        <Button colorScheme="green" onClick={handleSaveChanges}>
          Save Changes
        </Button>
      </TabHeader>
      <QuestionsInputs
        values={values}
        errors={errors}
        hasChanged={JSON.stringify(values) !== JSON.stringify(study.questions)}
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
