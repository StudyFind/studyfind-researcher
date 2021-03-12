import React from "react";
import { useArray } from "hooks";
import { updateStudy } from "database/studies";
import ScreeningHead from "./ScreeningHead";
import ScreeningGrid from "./ScreeningGrid";

function Screening({ study, next, back }) {
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

  const handleSubmit = () => {
    updateStudy(study.id, { questions });
    next();
  };

  return (
    <>
      <ScreeningHead />
      <ScreeningGrid
        back={back}
        original={study.questions}
        questions={questions}
        setQuestions={setQuestions}
        createQuestion={createQuestion}
        updateQuestion={updateQuestion}
        deleteQuestion={deleteElementByIndex}
        deleteAllQuestions={clearArray}
        handleSubmit={handleSubmit}
        setQuestions={setQuestions}
      />
    </>
  );
}

export default Screening;
