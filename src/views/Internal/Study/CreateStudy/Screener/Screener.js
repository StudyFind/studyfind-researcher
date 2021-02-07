import React from "react";
import { useArray } from "hooks";
import { updateStudy } from "database/studies";
import ScreenerHead from "./ScreenerHead";
import ScreenerGrid from "./ScreenerGrid";

function Screener({ study, next }) {
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
      <ScreenerHead />
      <ScreenerGrid
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

export default Screener;
