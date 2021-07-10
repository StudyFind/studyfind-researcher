import { useState, useEffect } from "react";

import {
  Grid,
  Flex,
  Button,
  Editable,
  EditableInput,
  EditablePreview,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react";

import SurveyView from "./SurveyView";
import QuestionEdit from "./QuestionEdit";

function SurveyEdit({ survey, surveysRef, handleClose }) {
  const initial = {
    title: "",
    questions: [],
  };

  const [inputs, setInputs] = useState(initial);
  const [questionEdit, setQuestionEdit] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(null);

  useEffect(() => {
    if (survey) {
      setInputs(survey);
    }
  }, [survey]);

  const handleQuestionEdit = (index) => {
    setQuestionEdit(true);
    setQuestionIndex(index);
  };

  const handleQuestionCancel = () => {
    setQuestionEdit(false);
    setQuestionIndex(null);
  };

  const handleQuestionAdd = () => {
    handleQuestionEdit(inputs.questions.length);
  };

  const handleQuestionSave = (index, question) => {
    setInputs((prev) => {
      const updated = [...prev.questions];
      updated[index] = question;
      return { ...prev, questions: updated };
    });
    handleQuestionCancel();
  };

  const handleTitleChange = (name, value) => {
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const handleQuestionDelete = (qIndex) => {
    setInputs((prev) => {
      const questions = [...prev.questions];
      questions.splice(qIndex, 1);
      return { ...prev, questions };
    });
  };

  const handleCancel = () => {
    setInputs(initial);
    handleClose();
  };

  const handleSubmit = () => {
    const payload = {
      title: inputs.title,
      questions: inputs.questions,
    };

    if (survey) {
      surveysRef.doc(survey.id).set(payload);
    } else {
      surveysRef.add(payload);
    }

    handleClose();
  };

  return (
    <Drawer isOpen onClose={handleClose} size="md">
      <DrawerOverlay />
      <DrawerContent bg="white">
        <DrawerHeader>
          <Flex align="center" justify="space-between">
            <Editable placeholder="Survey Title" value={inputs.title}>
              <EditablePreview />
              <EditableInput onChange={(e) => handleTitleChange("title", e.target.value)} />
            </Editable>
            <DrawerCloseButton position="static" />
          </Flex>
        </DrawerHeader>
        <DrawerBody bg="#f8f9fa" borderTopWidth="1px" borderBottomWidth="1px" p="25px">
          <Grid gap="25px">
            {questionEdit ? (
              <QuestionEdit
                index={questionIndex}
                question={inputs.questions[questionIndex]}
                handleQuestionSave={handleQuestionSave}
                handleQuestionCancel={handleQuestionCancel}
              />
            ) : (
              <SurveyView
                inputs={inputs}
                handleTitleChange={handleTitleChange}
                handleQuestionAdd={handleQuestionAdd}
                handleQuestionEdit={handleQuestionEdit}
                handleQuestionDelete={handleQuestionDelete}
              />
            )}
          </Grid>
        </DrawerBody>
        <DrawerFooter>
          {questionEdit || (
            <Flex justifyContent="flex-end" gridGap="10px">
              <Button onClick={handleCancel} color="gray.500" variant="outline">
                Cancel
              </Button>
              <Button onClick={handleSubmit} colorScheme="green">
                Save
              </Button>
            </Flex>
          )}
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export default SurveyEdit;
