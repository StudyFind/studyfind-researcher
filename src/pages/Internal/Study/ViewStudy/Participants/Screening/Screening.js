import { Grid } from "@chakra-ui/react";
import { study } from "data";

import QuestionCard from "components/feature/QuestionCard/QuestionCard";

function Screening({ questions = study.questions, responses = [] }) {
  return (
    <Grid gap="15px" padding="20px">
      {questions?.map((_, i) => (
        <QuestionCard key={i} question={questions[i]} response={responses[i]} />
      ))}
    </Grid>
  );
}

export default Screening;
