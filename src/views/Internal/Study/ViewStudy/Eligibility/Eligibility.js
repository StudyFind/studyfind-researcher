import React, { useState } from "react";
import { useArray } from "hooks";
import { updateStudy } from "database/studies";
import EligibilityView from "./EligibilityView";
import EligibilityEdit from "./EligibilityEdit";

function Eligibility({ study }) {
  const [edit, setEdit] = useState(false);

  const [
    questions,
    setQuestions,
    { appendElement, updateElement, deleteElementByIndex, clearArray },
  ] = useArray(study.questions);

  const createQuestion = () => {
    appendElement({ prompt: "", type: "Inclusion" });
  };

  const updateQuestion = (index, name, value) => {
    const updated = { ...questions[index], [name]: value };
    updateElement(updated, index);
  };

  const handleCancel = () => {
    setQuestions(study.questions);
    setEdit(false);
  };

  const handleSubmit = () => {
    updateStudy(study.id, { questions });
    setEdit(false);
  };

  return edit ? (
    <EligibilityEdit
      original={study.questions}
      questions={questions}
      createQuestion={createQuestion}
      updateQuestion={updateQuestion}
      deleteQuestion={deleteElementByIndex}
      deleteAllQuestions={clearArray}
      handleCancel={handleCancel}
      handleSubmit={handleSubmit}
    />
  ) : (
    <EligibilityView questions={questions} setEdit={setEdit} />
  );
}

export default Eligibility;
