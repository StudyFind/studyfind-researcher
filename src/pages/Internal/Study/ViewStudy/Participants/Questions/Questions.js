import { Grid } from "@chakra-ui/react";
import { Message } from "components";

import QuestionCard from "components/feature/Participants/QuestionCard/QuestionCard";

function Questions({ questions, responses }) {
  return (
    <Grid gap="15px" padding="20px">
      {questions.length ? (
        questions?.map((_, i) => (
          <QuestionCard
            key={i}
            question={questions[i]}
            response={responses[i]}
          />
        ))
      ) : (
        <Message
          title="No Questions"
          description="This study has no screening questions"
          showBackground
        />
      )}
    </Grid>
  );
}

export default Questions;
