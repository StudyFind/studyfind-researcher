import React, { useState, useEffect } from "react";
import { Box, Grid, Flex, Heading, Button } from "@chakra-ui/react";
import { Input, Select, ActionButton } from "components";
import { FaTrash } from "react-icons/fa";

import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react";

function SurveyEdit({ survey, surveysRef, setEdit, edit }) {
  const initial = {
    title: null,
    questions: [],
  };

  const [inputs, setInputs] = useState(initial);

  const handleAddQuestion = () => {
    setInputs((prev) => ({
      ...prev,
      questions: prev.questions.concat({
        type: "multiple choice",
        prompt: "",
        options: ["", "", ""],
      }),
    }));
  };

  const handleDeleteQuestion = (qIndex) => {
    setInputs((prev) => {
      const questions = [...prev.questions];
      questions.splice(qIndex, 1);
      return { ...prev, questions };
    });
  };

  const handleSurveyChange = (name, value) => {
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const handleCancel = () => {
    setInputs(initial);
    setEdit(false);
  };

  const handleSubmit = () => {
    // deletes options array for non-MCQ/non-checkbox questions
    const updatedQuestions = inputs.questions.map((question) => {
      if (!["multiple choice", "checkbox"].includes(question.type)) {
        const { options, ...newQuestion } = question;
        return newQuestion;
      }

      return question;
    });

    const payload = {
      title: inputs.title,
      questions: updatedQuestions,
    };

    console.log("title: " + inputs.title);
    console.log(updatedQuestions);

    if (survey) {
      surveysRef.doc(survey.id).set(payload);
    } else {
      surveysRef.add(payload);
    }

    setEdit(false);
  };

  const handleQuestionChange = (index, name, value) => {
    setInputs((prev) => {
      const questions = [...prev.questions];
      questions[index][name] = value;
      return { ...prev, questions };
    });
  };

  const handleOptionChange = (qIndex, oIndex, value) => {
    setInputs((prev) => {
      const questions = [...prev.questions];
      questions[qIndex].options[oIndex] = value;
      return { ...prev, questions };
    });
  };

  const handleOptionAdd = (qIndex) => {
    setInputs((prev) => {
      const questions = [...prev.questions];
      questions[qIndex].options.push("");
      return { ...prev, questions };
    });
  };

  const handleOptionDelete = (qIndex, oIndex) => {
    setInputs((prev) => {
      const questions = [...prev.questions];
      questions[qIndex].options.splice(oIndex, 1);
      return { ...prev, questions };
    });
  };

  useEffect(() => {
    if (survey) {
      setInputs(survey);
    }
  }, [survey]);

  return (
    <Drawer isOpen={edit} onClose={() => setEdit(false)} size="xl">
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton m="0, 5px, 0, auto" />

        <DrawerHeader borderBottomWidth="1px">Edit Survey</DrawerHeader>
        <DrawerBody>
          <Grid gap="20px" p="20px">
            <Input
              name="title"
              label="Title"
              value={inputs.title || ""}
              onChange={handleSurveyChange}
            />
            {inputs?.questions?.map((question, i) => (
              <Grid
                key={i}
                gap="10px"
                p="20px"
                borderWidth="1px"
                borderColor="gray.300"
                rounded="md"
              >
                <Flex gridGap="5px" align="center">
                  <Heading fontSize="xl">Question {i + 1}</Heading>
                  <ActionButton
                    icon={<FaTrash />}
                    hint="Delete Question"
                    color="red"
                    onClick={() => handleDeleteQuestion(i)}
                  />
                </Flex>
                <Select
                  name="type"
                  label="Type"
                  value={question.type}
                  options={["multiple choice", "checkbox", "short response", "long response"]}
                  onChange={(name, value) => handleQuestionChange(i, name, value)}
                />
                <Input
                  name="prompt"
                  label="Prompt"
                  value={question.prompt}
                  onChange={(name, value) => handleQuestionChange(i, name, value)}
                />
                {["multiple choice", "checkbox"].includes(question.type) && (
                  <>
                    <Heading fontSize="sm">Answer Choices</Heading>
                    {question?.options?.map((option, j) => (
                      <Box key={j}>
                        <Flex>
                          <Input
                            name="option"
                            value={option}
                            onChange={(_, value) => handleOptionChange(i, j, value)}
                          />
                          <Button onClick={() => handleOptionDelete(i, j)}>x</Button>
                        </Flex>
                      </Box>
                    ))}
                    <Button onClick={() => handleOptionAdd(i)}>Add Option</Button>
                  </>
                )}
              </Grid>
            ))}
            <Button onClick={handleAddQuestion}>Add Question</Button>
          </Grid>
        </DrawerBody>
        <DrawerFooter>
          <Flex justifyContent="flex-end" gridGap="10px">
            <Button onClick={handleCancel} color="gray.500" variant="outline">
              Cancel
            </Button>
            <Button onClick={handleSubmit} colorScheme="green">
              Submit
            </Button>
          </Flex>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export default SurveyEdit;
