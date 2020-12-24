import React, { useState } from "react";
import { updateStudy } from "database/studies";

import ScreeningView from "./ScreeningView";
import ScreeningEdit from "./ScreeningEdit";

function Screening({ study, setStudy }) {
  const [edit, setEdit] = useState(false);
  const [questions, setQuestions] = useState(study.questions || []);

  console.log({ study });

  const createQuestion = () => {
    const updated = [...questions];
    updated[updated.length] = { type: "Inclusion", prompt: "" };
    setQuestions(updated);
  };

  const updateQuestion = (index, name, value) => {
    const updated = [...questions];
    updated[index] = { ...updated[index], [name]: value };
    setQuestions(updated);
  };

  const deleteQuestion = (index) => {
    const updated = questions.filter((_, i) => i !== index);
    setQuestions(updated);
  };

  const deleteAllQuestions = () => {
    setQuestions([]);
  };

  const handleCancel = () => {
    setQuestions(study.questions);
    setEdit(false);
  };

  const handleSubmit = () => {
    const updated = { ...study, questions };
    updateStudy(updated);
    setStudy(updated);
    setEdit(false);
  };

  return edit ? (
    <ScreeningEdit
      original={study.questions}
      questions={questions}
      handleCancel={handleCancel}
      createQuestion={createQuestion}
      updateQuestion={updateQuestion}
      deleteQuestion={deleteQuestion}
      deleteAllQuestions={deleteAllQuestions}
      handleSubmit={handleSubmit}
    />
  ) : (
    <ScreeningView questions={questions} setEdit={setEdit} />
  );
}

export default Screening;
