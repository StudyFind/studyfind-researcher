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
  ] = useArray(study.questions);

  const [errors, setErrors] = useState(new Array(questions.length).fill(false));
  const createQuestion = () => {
    appendElement({ prompt: "", type: "Inclusion" });
    let newErrors = errors;
    newErrors.push(true);
    setErrors(newErrors);
  };

  const updateQuestion = (index, name, value) => {
    const updated = { ...questions[index], [name]: value };
    updateElement(updated, index);
    if (name === "prompt" && !value) {
      let newErrors = errors;
      newErrors[index] = true;
      setErrors(newErrors);
    }
    if (name === "prompt" && value) {
      let newErrors = errors;
      newErrors[index] = false;
      setErrors(newErrors);
    }
  };

  const handleCancel = () => {
    setQuestions(study.questions);
    setErrors(new Array(questions.length).fill(false));
    setEdit(false);
  };

  const handleSubmit = () => {
    let flag = 0;
    errors.forEach((error) => {
      if (error) {
        flag = 1;
      }
    });
    if (flag) {
      return;
    }
    updateStudy(study.id, { questions });
    setEdit(false);
  };

  const deleteQuestion = (index) => {
    deleteElementByIndex(index);
    let newErrors = errors;
    newErrors.splice(index, 1);
    setErrors(newErrors);
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
      errors={errors}
      setErrors={setErrors}
    />
  ) : (
    <ScreeningView questions={questions} setEdit={setEdit} />
  );
}

export default Screening;
