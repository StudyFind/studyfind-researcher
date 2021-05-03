import React from "react";
import { useScreening } from "hooks";
import ScreeningHead from "./ScreeningHead";
import ScreeningGrid from "./ScreeningGrid";

function Screening({ study, next, back }) {
  const {
    values,
    errors,
    createQuestion,
    updateQuestion,
    deleteQuestion,
    clearQuestions,
    resetQuestions,
    sortQuestions,
    handleSubmit,
  } = useScreening(study);

  const handleSubmitModified = () => {
    handleSubmit().then(next);
  };

  return (
    <>
      <ScreeningHead />
      <ScreeningGrid
        back={back}
        values={values}
        errors={errors}
        original={study.questions}
        createQuestion={createQuestion}
        updateQuestion={updateQuestion}
        deleteQuestion={deleteQuestion}
        resetQuestions={resetQuestions}
        clearQuestions={clearQuestions}
        sortQuestions={sortQuestions}
        handleSubmit={handleSubmitModified}
      />
    </>
  );
}

export default Screening;
