import React, { useState } from "react";
import { firestore } from "database/firebase";
import { Box, Button, Text, Flex, Form, Input, Grid, Select } from "@chakra-ui/react";

import Question from "./Question";

function Survey({ surveyInfo, edit, path }) {
  const blankQuestion = { prompt: " ", type: "multiple choice" };

  const [editing, setEditing] = useState(edit);
  const [title, setTitle] = useState(surveyInfo.title ? surveyInfo.title : " ");
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

  if (editing) {
    return (
      <Box bg="gray.200" p="6px" rounded="md" w="90%" m="6px">
        <Input
          variant="unstyled"
          bg="white"
          placeholder="title.."
          value={title}
          mr="auto"
          ml="auto"
          textAlign="center"
          fontSize="large"
          minW="0px"
          maxW="30%"
          onChange={handleTitleChange}
        ></Input>
        {questions.map((question, i) => {
          const promptId = "prompt" + i;
          const typeId = "type" + i;
          return (
            <Box rounded="md" bg="white" m="6px" p="6px" key={i}>
              <Flex>
                <Text>Prompt:</Text>
                <Button onClick={() => deleteQuestion(i)}>Delete Question</Button>
              </Flex>
              <Input
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
              <Text>Type:</Text>
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
                    {question.options.map((option, optionIdx) => {
                      return (
                        <Input
                          onChange={handleOptionChange}
                          data-field="options"
                          data-question={i}
                          data-index={optionIdx}
                          key={optionIdx}
                          value={question.options[optionIdx]}
                        ></Input>
                      );
                    })}
                    <Button onClick={() => addOption(i)}>Add Answer Choice</Button>
                  </Box>
                ) : (
                  <Button onClick={() => addOption(i)}>Add Answer Choice</Button>
                ))}
            </Box>
          );
        })}
        <Button onClick={() => addQuestion()}>Add Question</Button>
        <Button onClick={() => submitChanges()}>Submit</Button>
      </Box>
    );
    //  else {
    //   return (
    //     <Box bg="gray.200" p="6px" rounded="md" w="90%" m="6px">
    //       <Input
    //         variant="unstyled"
    //         placeholder="Title"
    //         mr="auto"
    //         ml="auto"
    //         textAlign="center"
    //         fontSize="large"
    //         minW="0px"
    //         maxW="30%"
    //       ></Input>
    //       <Box>
    //         <Input label="prompt" placeholder="Prompt"></Input>
    //         <Select label="type">
    //           <option value="multiple choice">Multiple Choice</option>
    //           <option value="checkbox">Checkbox</option>
    //           <option value="short response">Short Response</option>
    //           <option value="long response">Long Response</option>
    //         </Select>
    //       </Box>
    //     </Box>
    //   );
    // }
  }
  return (
    <Box w="90%" bg="gray.200" p="6px" m="6px" rounded="md" display="flex">
      <Text fontSize="large" m="auto, 0" h="auto">
        {surveyInfo.title}
      </Text>
      <Button color="white" bg="blue.500" ml="auto" mr="6px" onClick={() => setEditing(true)}>
        Preview
      </Button>
      <Button color="white" bg="blue.500" ml="auto" mr="6px" onClick={() => setEditing(true)}>
        Edit
      </Button>
    </Box>
  );
}

export default Survey;
