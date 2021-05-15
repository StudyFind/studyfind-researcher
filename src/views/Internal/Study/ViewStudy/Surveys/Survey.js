import React, { useState } from "react";
import { firestore } from "database/firebase";
import { Box, Button, Text, Flex, Form, Input, Grid, Select } from "@chakra-ui/react";

import Question from "./Question";

function Survey({ surveyInfo, edit, path }) {
  const blankQuestion = { prompt: " ", type: "multiple choice" };

  const [editing, setEditing] = useState(edit);
  const [title, setTitle] = useState(surveyInfo.title ? surveyInfo.title : "");
  const [questions, setQuestions] = useState(
    surveyInfo.questions ? surveyInfo.questions : [blankQuestion]
  );
  const addQuestion = function () {
    setQuestions([...questions, { ...blankQuestion }]);
  };

  const submitChanges = function () {
    const surveyOut = {
      title: title,
      questions: questions,
    };
    if (surveyInfo.id) {
      const surveyRef = path.doc(surveyInfo.id);
      surveyRef.set(surveyOut);
    } else {
      path.add(surveyOut);
    }

    setEditing(false);
  };

  const deleteQuestion = function (i) {
    const questionsCopy = [...questions];
    questionsCopy.splice(i, 1);
    setQuestions(questionsCopy);
  };

  const handleQuestionChange = (e) => {
    console.log(questions);
    const updatedQuestions = [...questions];
    console.log(updatedQuestions);
    updatedQuestions[e.target.id][e.target.dataset.field] = e.target.value;
    setQuestions(updatedQuestions);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const addOption = function (i) {
    const updatedQuestions = [...questions];

    if (updatedQuestions[i].options) {
      updatedQuestions[i].options = [...updatedQuestions[i].options, " "];
    } else {
      updatedQuestions[i].options = [" "];
    }
    setQuestions(updatedQuestions);
  };

  const handleOptionChange = (e) => {
    const updatedQuestions = [...questions];
    updatedQuestions[e.target.dataset.question][e.target.dataset.field][e.target.dataset.index] =
      e.target.value;
    setQuestions(updatedQuestions);
  };

  const deleteOption = (e) => {
    const updatedQuestions = [...questions];
    updatedQuestions[e.target.dataset.question][e.target.dataset.field].splice(
      e.target.dataset.index,
      1
    );
    setQuestions(updatedQuestions);
  };

  const cancelEditing = function () {
    setEditing(false);
  };

  if (editing) {
    return (
      <Box bg="white" p="6px" rounded="md" w="90%" m="6px" border="1px solid rgb(241, 242, 243)">
        <Input
          overflow="auto"
          variant="flushed"
          bg="white"
          placeholder="title.."
          value={title}
          mr="auto"
          ml="auto"
          w="60%"
          display="block"
          alignSelf="center"
          textAlign="center"
          fontSize="large"
          onChange={handleTitleChange}
        ></Input>
        {questions.map((question, i) => {
          const promptId = "prompt" + i;
          const typeId = "type" + i;
          return (
            <Box rounded="md" bg="white" m="6px" p="6px" key={i} border="2px solid gainsboro">
              <Flex display="flex">
                <Text mt="auto" fontWeight="500">
                  Prompt:
                </Text>
                <Button ml="auto" colorScheme="red" mb="6px" onClick={() => deleteQuestion(i)}>
                  Delete Question
                </Button>
              </Flex>
              <Input
                overflow="auto"
                label="prompt"
                placeholder="prompt"
                value={question.prompt}
                id={i}
                border="1px solid black"
                type="text"
                onChange={handleQuestionChange}
                className="prompt"
                data-field="prompt"
                data-id={i}
              ></Input>
              <Text fontWeight="500">Type:</Text>
              <Select
                label="type"
                value={question.type}
                id={i}
                data-id={i}
                className="type"
                onChange={handleQuestionChange}
                data-field="type"
              >
                <option value="multiple choice">Multiple Choice</option>
                <option value="checkbox">Checkbox</option>
                <option value="short response">Short Response</option>
                <option value="long response">Long Response</option>
              </Select>
              {(question.type === "multiple choice" || question.type === "checkbox") &&
                (question.options ? (
                  <Box>
                    <Text fontWeight="500">Answer Choices:</Text>
                    {question.options.map((option, optionIdx) => {
                      return (
                        <Flex key={optionIdx}>
                          <Input
                            size="sm"
                            m="3px"
                            rounded="md"
                            onChange={handleOptionChange}
                            data-field="options"
                            data-question={i}
                            data-index={optionIdx}
                            key={optionIdx}
                            value={question.options[optionIdx]}
                            overflow="auto"
                          ></Input>
                          <Button
                            size="sm"
                            fontWeight="500"
                            // colorScheme="red"
                            m="3px"
                            onClick={deleteOption}
                            data-field="options"
                            data-question={i}
                            data-index={optionIdx}
                          >
                            X
                          </Button>
                        </Flex>
                      );
                    })}
                    <Button
                      display="block"
                      colorScheme="green"
                      bg="green.300"
                      size="sm"
                      ml="3px"
                      mt="3px"
                      mr="auto"
                      onClick={() => addOption(i)}
                    >
                      Add Answer Choice
                    </Button>
                  </Box>
                ) : (
                  <>
                    <Text fontWeight="500">Answer Choices:</Text>
                    <Button
                      display="block"
                      colorScheme="green"
                      bg="green.300"
                      size="sm"
                      ml="3px"
                      mt="3px"
                      mr="auto"
                      onClick={() => addOption(i)}
                    >
                      Add Answer Choice
                    </Button>
                  </>
                ))}
            </Box>
          );
        })}
        <Button ml="auto" mr="auto" display="block" onClick={() => addQuestion()}>
          Add Question
        </Button>
        <Flex>
          <Button
            m="3px"
            colorScheme="red"
            ml="auto"
            display="block"
            onClick={() => cancelEditing()}
          >
            Cancel
          </Button>
          <Button
            m="3px"
            colorScheme="green"
            bg="green.300"
            alignSelf="end"
            onClick={() => submitChanges()}
          >
            Submit
          </Button>
        </Flex>
      </Box>
    );
  }
  return (
    <Box
      w="90%"
      border="1px solid rgb(241, 242, 243)"
      bg="white"
      p="6px"
      m="6px"
      rounded="md"
      display="flex"
    >
      <Text fontSize="large" mt="auto" mb="auto" h="5%" lineHeight="100%" fontWeight="500">
        {surveyInfo.title}
      </Text>
      <Button
        alignSelf="end"
        color="white"
        bg="blue.500"
        ml="auto"
        mr="6px"
        onClick={() => setEditing(true)}
      >
        Preview
      </Button>
      <Button
        alignSelf="end"
        color="white"
        bg="blue.500"
        ml="6px"
        mr="6px"
        onClick={() => setEditing(true)}
      >
        Edit
      </Button>
    </Box>
  );
}

export default Survey;
