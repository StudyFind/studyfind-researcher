import React, { useState } from "react";
import { useArray } from "hooks";
import { updateStudy } from "database/studies";

import ScreeningView from "./ScreeningView";
import ScreeningEdit from "./ScreeningEdit";

function Screening({ study }) {
  const [edit, setEdit] = useState(false);

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

  const handleCancel = () => {
    setQuestions(
      study.questions.map((question) => ({
        value: question,
        error: { type: false, prompt: false },
      }))
    );
    setEdit(false);
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
      return;
    }

    updateStudy(study.id, { questions: questions.map((q) => q.value) });
    setEdit(false);
  };

  const deleteQuestion = (index) => {
    deleteElementByIndex(index);
  };

  return edit ? (
    <ScreeningEdit
      original={study.questions}
      questions={questions}
      createQuestion={createQuestion}
      updateQuestion={updateQuestion}
      deleteQuestion={deleteQuestion}
      deleteAllQuestions={clearArray}
      handleCancel={handleCancel}
      handleSubmit={handleSubmit}
      setQuestions={setQuestions}
    />
  ) : (
    <ScreeningView study={study} setEdit={setEdit} />
  );
}

export default Screening;
