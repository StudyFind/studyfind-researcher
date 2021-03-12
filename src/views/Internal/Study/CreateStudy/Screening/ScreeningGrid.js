import React from "react";
import styled from "styled-components";
import { SortableContainer, SortableElement, SortableHandle } from "react-sortable-hoc";
import { Button, Flex, Grid, Icon, IconButton } from "@chakra-ui/react";
import { Input, Select } from "components";
import { FaTrash, FaPlus, FaBars } from "react-icons/fa";

const DragHandle = SortableHandle(() => (
  <Flex cursor="row-resize" h="40px" w="40px" justify="center" align="center">
    <Icon color="gray.500" as={FaBars} />
  </Flex>
));

const SortableItem = SortableElement(({ value, i, updateQuestion, deleteQuestion }) => (
  <Row>
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
  </Row>
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

function ScreeningGrid({
  back,
  questions,
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
      {questions.length ? (
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
      <Flex justify="flex-end" gridGap="10px">
        <Button
          colorScheme="gray"
          color="gray.500"
          variant="outline"
          style={{ textAlign: "right" }}
          onClick={back}
        >
          Back
        </Button>
        <Button colorScheme="blue" onClick={handleSubmit} type="submit">
          Next
        </Button>
      </Flex>
    </>
  );
}

const Row = styled.div`
  display: flex;
  grid-gap: 10px;
  width: 100%;
`;
const Questions = styled.div`
  display: grid;
  width: 100%;
  grid-gap: 10px;
  margin: 10px 0;
`;
export default ScreeningGrid;
