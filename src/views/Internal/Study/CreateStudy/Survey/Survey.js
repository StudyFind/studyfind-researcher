import React, { useState } from "react";
import SurveyView from "./SurveyView";

function Survey({ study, setStudy, setTab }) {
  const [questions, setQuestions] = useState(study.questions || []);

  const createQuestion = () => {
    const updated = [...questions];
    updated[updated.length] = { type: "", prompt: "" };
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

  const handleSubmit = () => {
    setStudy({ ...study, questions });
    setTab("consent");
  };

  return (
    <SurveyView
      questions={questions}
      createQuestion={createQuestion}
      updateQuestion={updateQuestion}
      deleteQuestion={deleteQuestion}
      deleteAllQuestions={deleteAllQuestions}
      handleSubmit={handleSubmit}
    />
  );
}

export default Survey;
