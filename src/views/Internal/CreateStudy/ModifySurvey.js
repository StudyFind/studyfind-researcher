import React, { useState, useEffect } from "react";

function ModifySurvey({ study, setStudy, setTab }) {
  const [questions, setQuestions] = useState(study.questions);

  const addQuestion = () => {
    const updated = [...questions];
    updated[updated.length] = { type: "", prompt: "" };
    setQuestions(updated);
  };

  const editQuestion = (index, name, value) => {
    const updated = [...questions];
    updated[index] = { ...updated[index], [name]: value };
    setQuestions(updated);
  };

  const removeQuestion = (index) => {
    const updated = questions.filter((i) => i !== index);
    setQuestions(updated);
  };

  const questionComponents = questions.map((question, index) => (
    <div key={index}>
      <select
        value={question.type}
        handleChange={(e) => editQuestion(index, "type", e.target.value)}
      >
        <option value="Inclusion">Inclusion</option>
        <option value="Exclusion">Inclusion</option>
      </select>
      <input
        value={question.prompt}
        handleChange={(e) => editQuestion(index, "prompt", e.target.value)}
      />
      <button>Remove</button>
    </div>
  ));

  return (
    <div>
      {questionComponents}
      <button>Add</button>
    </div>
  );
}

export default ModifySurvey;
