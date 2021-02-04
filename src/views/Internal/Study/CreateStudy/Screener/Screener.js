import React, { useState, useEffect } from "react";
import { updateStudy } from "database/studies";
import ScreenerHead from "./ScreenerHead";
import ScreenerGrid from "./ScreenerGrid";

function Screener({ study, next }) {
  const [questions, setQuestions] = useState(study.questions || []);

  useEffect(() => {
    const { id, questions } = study;
    if (id) setQuestions(questions);
  }, [study]);

  const createQuestion = () => {
    const updated = [...questions];
    updated[updated.length] = { type: "Inclusion", prompt: "" };
    setQuestions(updated);
  };

  const updateQuestion = (index, name, value) => {
    const updated = [...questions];
    updated[index] = { ...questions[index], [name]: value };
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
        deleteQuestion={deleteQuestion}
        deleteAllQuestions={deleteAllQuestions}
        handleSubmit={handleSubmit}
      />
    </>
  );
}

export default Screener;
