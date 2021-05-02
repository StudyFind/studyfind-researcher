import React from "react";
import lodash from "lodash";
import { Button, Flex, Grid, IconButton } from "@chakra-ui/react";
import { Input, Select } from "components";
import { FaTrash, FaPlus, FaUndo, FaBars } from "react-icons/fa";
import { SortableContainer, SortableElement, SortableHandle } from "react-sortable-hoc";

const DragHandle = SortableHandle(() => (
  <Flex cursor="row-resize" h="40px" w="40px" color="gray.500" justify="center" align="center">
    <FaBars />
  </Flex>
));

const SortableItem = SortableElement(({ value, i, updateQuestion, deleteQuestion, error }) => (
  <Flex gridGap="10px" w="100%">
    <DragHandle />
    <Select
      w="210px"
      name="type"
      value={value.type}
      error={error.type}
      onChange={(name, value) => updateQuestion(i, name, value)}
      options={["Inclusion", "Exclusion"]}
    />
    <Input
      placeholder="Question Prompt"
      name="prompt"
      value={value.prompt}
      error={error.prompt}
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
    {items.map((item, i) => (
      <SortableItem
        key={i}
        index={i}
        i={i}
        value={item.value}
        error={item.error}
        updateQuestion={updateQuestion}
        deleteQuestion={deleteQuestion}
      />
    ))}
  </Grid>
));

function ScreeningGrid({
  back,
  original,
  questions,
  setQuestions,
  mapQuestions,
  createQuestion,
  updateQuestion,
  deleteQuestion,
  deleteAllQuestions,
  handleSubmit,
}) {
  const onSortEnd = ({ oldIndex, newIndex }) => {
    const newArray = [...questions];
    const removed = newArray.splice(oldIndex, 1);
    newArray.splice(newIndex, 0, removed[0]);
    setQuestions(newArray);
  };

  return (
    <>
      <Flex gridGap="10px">
        {!lodash.isEqual(
          original,
          questions.map((q) => q.value)
        ) && (
          <Button
            size="sm"
            leftIcon={<FaUndo />}
            color="gray.500"
            bg="gray.100"
            borderWidth="1px"
            borderColor="gray.500"
            _hover={{ bg: "gray.200" }}
            onClick={() => setQuestions(mapQuestions(original))}
          >
            Undo Changes
          </Button>
        )}
        {!!questions.length && (
          <Button
            size="sm"
            leftIcon={<FaTrash />}
            color="red.500"
            bg="red.100"
            borderWidth="1px"
            borderColor="red.500"
            _hover={{ bg: "red.200" }}
            onClick={deleteAllQuestions}
          >
            Delete All
          </Button>
        )}
      </Flex>
      <Grid w="100%" gap="10px" py="10px">
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
      </Grid>
      <Flex justify="flex-end" gridGap="10px">
        <Button color="gray.500" variant="outline" onClick={back}>
          Back
        </Button>
        <Button colorScheme="blue" onClick={handleSubmit} type="submit">
          Next
        </Button>
      </Flex>
    </>
  );
}

export default ScreeningGrid;
