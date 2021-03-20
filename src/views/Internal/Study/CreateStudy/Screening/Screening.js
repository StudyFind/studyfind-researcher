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
  ] = useArray(
    study.questions.map((question) => ({ value: question, error: { type: false, prompt: false } }))
  );

  const createQuestion = () => {
    appendElement({
      value: { prompt: "", type: "Inclusion" },
      error: { type: false, prompt: false },
    });
  };

  const updateQuestion = (index, name, value) => {
    updateElement(
      {
        value: { ...questions[index].value, [name]: value },
        error: { ...questions[index].error, [name]: !value },
      },
      index
    );
  };

  const handleSubmit = () => {
    const updated = questions.map(({ value }) => {
      return { value, error: { type: !value.type, prompt: !value.prompt } };
    });

    const valid = updated.reduce((overall, { value }) => {
      return overall && !!value.type && !!value.prompt;
    });

    setQuestions(updated);

    if (!valid) {
      console.log("returned");
      return;
    }

    updateStudy(study.id, { questions: questions.map((q) => q.value) });
    next();
  };

  return (
    <>
      <ScreeningHead />
      <ScreeningGrid
        back={back}
        questions={questions}
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
