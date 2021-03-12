import React from "react";
import lodash from "lodash";
import styled from "styled-components";

import { Flex, Grid, Heading, Button, Icon, IconButton } from "@chakra-ui/react";
import { Input, Select } from "components";
import { SortableContainer, SortableElement, SortableHandle } from "react-sortable-hoc";
import { FaTrash, FaPlus, FaBars } from "react-icons/fa";

const DragHandle = SortableHandle(() => (
  <Flex cursor="row-resize" h="40px" w="40px" color="gray.500" justify="center" align="center">
    <FaBars />
  </Flex>
));

const SortableItem = SortableElement(({ value, i, updateQuestion, deleteQuestion }) => (
  <Flex gridGap="10px" w="100%">
    {console.log(i)}
    <DragHandle />
    <Select
      w="210px"
      name="type"
      value={value.type}
      onChange={(name, value) => updateQuestion(i, name, value)}
      options={["Inclusion", "Exclusion"]}
    />
    <Input
      placeholder="Question Prompt"
      name="prompt"
      value={value.prompt}
      onChange={(name, value) => updateQuestion(i, name, value)}
    />
    <IconButton
      colorScheme=""
      color="gray.500"
      _hover={{ color: "red.500", bg: "red.100" }}
      icon={<FaTrash />}
      onClick={() => deleteQuestion(i)}
    />
  </Flex>
));

const SortableList = SortableContainer(({ items, updateQuestion, deleteQuestion }) => (
  <Grid gap="10px">
    {items.map((value, index) => (
      <SortableItem
        key={index}
        index={index}
        i={index}
        value={value}
        updateQuestion={updateQuestion}
        deleteQuestion={deleteQuestion}
      />
    ))}
  </Grid>
));

function ScreeningEdit({
  original,
  questions,
  handleCancel,
  createQuestion,
  updateQuestion,
  deleteQuestion,
  deleteAllQuestions,
  handleSubmit,
  setQuestions,
}) {
  const onSortEnd = ({ oldIndex, newIndex }) => {
    const newArray = [...questions];
    const removed = newArray.splice(oldIndex, 1);
    newArray.splice(newIndex, 0, removed[0]);
    setQuestions(newArray);
  };

  return (
    <>
      <Head>
        <Heading fontSize="28px">Edit Screening</Heading>
        <Buttons>
          <Button
            colorScheme=""
            color="gray.500"
            bg="gray.200"
            _hover={{ bg: "gray.300" }}
            onClick={handleCancel}
          >
            Cancel
          </Button>
          {questions && questions.length ? (
            <Button colorScheme="red" onClick={deleteAllQuestions}>
              Delete All
            </Button>
          ) : null}
          {!lodash.isEqual(questions, original) ? (
            <Button colorScheme="green" onClick={handleSubmit}>
              Save Changes
            </Button>
          ) : null}
        </Buttons>
      </Head>
      <Questions>
        <SortableList
          items={questions}
          useDragHandle
          onSortEnd={onSortEnd}
          updateQuestion={updateQuestion}
          deleteQuestion={deleteQuestion}
        />
        <Button leftIcon={<FaPlus />} color="gray.500" onClick={createQuestion}>
          Add Question
        </Button>
      </Questions>
    </>
  );
}

const Head = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 15px 0;
`;

const Row = styled.div`
  display: flex;
  grid-gap: 10px;
  width: 100%;
`;

const Questions = styled.div`
  display: grid;
  width: 100%;
  grid-gap: 10px;
`;

const Buttons = styled.div`
  display: flex;
  grid-gap: 10px;
`;

export default ScreeningEdit;
