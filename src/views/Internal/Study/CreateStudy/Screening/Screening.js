import React, { useState } from "react";
import { Heading, Text, Button, Flex, Grid } from "@chakra-ui/react";
import { FaTrash, FaPlus } from "react-icons/fa";
import Question from "./Question";

function Screening({ study, setStudy, setTab }) {
  const [questions, setQuestions] = useState(study.questions || []);

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
    setStudy({ ...study, questions });
    setTab("consent");
  };

  return (
    <div>
      <Heading size="lg" mb="10px">
        Modifying Eligibility Criteria
      </Heading>
      <Text mb="10px" color="gray.500">
        These exclusion and inclusion criteria will be used to automatically generate a screening
        survey for interested participants to answer in their process of enrolling.
      </Text>
      {questions && questions.length ? (
        <Button
          leftIcon={<FaTrash />}
          colorScheme=""
          color="red.500"
          _hover={{ bg: "red.100" }}
          onClick={deleteAllQuestions}
        >
          Delete All
        </Button>
      ) : null}
      <Grid w="100%" gap="10px" py="10px">
        {questions &&
          questions.map((question, index) => (
            <Question
              key={index}
              index={index}
              question={question}
              updateQuestion={updateQuestion}
              deleteQuestion={deleteQuestion}
            />
          ))}
        <Button leftIcon={<FaPlus />} color="gray.500" onClick={createQuestion}>
          Add Question
        </Button>
      </Grid>
      <Flex justify="flex-end" gridGap="10px">
        <Button colorScheme="blue" onClick={handleSubmit} type="submit">
          Submit
        </Button>
      </Flex>
    </div>
  );
}

export default Screening;
