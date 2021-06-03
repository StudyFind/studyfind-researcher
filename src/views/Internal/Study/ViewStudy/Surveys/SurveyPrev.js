import React from "react";
import { Grid, Heading } from "@chakra-ui/react";
import Question from "./Question";

function SurveyPrev(survey) {
  return (
    <Grid>
      <Heading>{survey.title}</Heading>
      {survey.questions.map((question, i) => {
        <Question question={question} key={i}></Question>;
      })}
    </Grid>
  );
}

export default SurveyPrev;
