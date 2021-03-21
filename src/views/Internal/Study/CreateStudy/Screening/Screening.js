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
    const updated = questions.map(({ value }) => ({
      value,
      error: { type: !value.type, prompt: !value.prompt },
    }));

    const errors = updated.map((q) => [q.error.type, q.error.prompt]).flat();
    const invalid = errors.reduce((overall, next) => overall || next);

    if (invalid) {
      setQuestions(updated);
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
        original={study.questions}
        questions={questions}
        setQuestions={setQuestions}
        createQuestion={createQuestion}
        updateQuestion={updateQuestion}
        deleteQuestion={deleteElementByIndex}
        deleteAllQuestions={clearArray}
        handleSubmit={handleSubmit}
      />
    </>
  );
}

export default Screening;
