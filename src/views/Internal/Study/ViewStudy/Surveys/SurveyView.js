import { Grid, Flex, Heading } from "@chakra-ui/react";
import { FaPlusCircle } from "react-icons/fa";

import QuestionCard from "./QuestionCard";

function SurveyView({ inputs, handleQuestionAdd, handleQuestionEdit, handleQuestionDelete }) {
  return (
    <>
      <Grid gap="20px">
        {inputs?.questions?.map((question, i) => (
          <QuestionCard
            key={i}
            index={i}
            question={question}
            handleQuestionEdit={handleQuestionEdit}
            handleQuestionDelete={handleQuestionDelete}
          />
        ))}
        <Flex
          h="100px"
          rounded="md"
          borderWidth="1px"
          borderStyle="dashed"
          borderColor="gray.300"
          bg="gray.100"
          justify="center"
          align="center"
          cursor="pointer"
          onClick={handleQuestionAdd}
        >
          <Heading size="md" color="gray.500">
            <Flex justify="center" align="center" gridGap="8px">
              <FaPlusCircle />
              Add Question
            </Flex>
          </Heading>
        </Flex>
      </Grid>
    </>
  );
}

export default SurveyView;
