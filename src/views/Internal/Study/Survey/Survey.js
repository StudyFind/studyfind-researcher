import React, { useState } from "react";
import { updateStudy } from "database/studies";

import SurveyView from "./SurveyView";
import SurveyEdit from "./SurveyEdit";

function Survey({ study, setStudy }) {
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
    updateStudy(updated);
    setStudy(updated);
    setEdit(false);
  };

  return edit ? (
    <SurveyEdit
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
    <SurveyView questions={questions} setEdit={setEdit} />
  );
}

export default Survey;
