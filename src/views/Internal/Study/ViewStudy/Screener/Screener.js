import React, { useState } from "react";
import { updateStudy } from "database/studies";

import ScreenerView from "./ScreenerView";
import ScreenerEdit from "./ScreenerEdit";

function Screener({ study, setStudy }) {
  const [edit, setEdit] = useState(false);
  const [questions, setQuestions] = useState(study.questions || []);

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
    updateStudy(study.id, updated);
    setStudy(updated);
    setEdit(false);
  };

  return edit ? (
    <ScreenerEdit
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
    <ScreenerView questions={questions} setEdit={setEdit} />
  );
}

export default Screener;
