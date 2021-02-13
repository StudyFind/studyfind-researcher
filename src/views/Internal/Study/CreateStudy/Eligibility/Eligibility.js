import React from "react";
import { useArray } from "hooks";
import { updateStudy } from "database/studies";
import EligibilityHead from "./EligibilityHead";
import EligibilityGrid from "./EligibilityGrid";

function Eligibility({ study, next, back }) {
  const [
    questions,
    _,
    { appendElement, updateElement, deleteElementByIndex, clearArray },
  ] = useArray(study.questions);

  const createQuestion = () => {
    appendElement({ prompt: "", type: "Inclusion" });
  };

  const updateQuestion = (index, name, value) => {
    const updated = { ...questions[index], [name]: value };
    updateElement(updated, index);
  };

  const handleSubmit = () => {
    updateStudy(study.id, { questions });
    next();
  };

  return (
    <>
      <EligibilityHead />
      <EligibilityGrid
        back={back}
        questions={questions}
        createQuestion={createQuestion}
        updateQuestion={updateQuestion}
        deleteQuestion={deleteElementByIndex}
        deleteAllQuestions={clearArray}
        handleSubmit={handleSubmit}
      />
    </>
  );
}

export default Eligibility;
