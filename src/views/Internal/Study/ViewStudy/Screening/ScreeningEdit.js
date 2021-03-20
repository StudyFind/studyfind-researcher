import React from "react";
import lodash from "lodash";
import { Flex, Grid, Heading, Button, Icon, IconButton } from "@chakra-ui/react";
import { Input, Select } from "components";
import { SortableContainer, SortableElement, SortableHandle } from "react-sortable-hoc";
import { FaTrash, FaPlus, FaBars } from "react-icons/fa";

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
  errors,
}) {
  const onSortEnd = ({ oldIndex, newIndex }) => {
    const newArray = [...questions];
    const removed = newArray.splice(oldIndex, 1);
    newArray.splice(newIndex, 0, removed[0]);
    setQuestions(newArray);
  };

  return (
    <>
      <Flex justify="space-between" align="center" my="15px">
        <Heading fontSize="28px">Edit Screening</Heading>
        <Flex gridGap="10px">
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
          {!lodash.isEqual(
            questions.map((q) => q.value),
            original
          ) ? (
            <Button colorScheme="green" onClick={handleSubmit}>
              Save Changes
            </Button>
          ) : null}
        </Flex>
      </Flex>
      <Grid w="100%" gap="10px" py="10px">
        <SortableList
          items={questions}
          useDragHandle
          onSortEnd={onSortEnd}
          updateQuestion={updateQuestion}
          deleteQuestion={deleteQuestion}
          errors={errors}
        />
        <Button leftIcon={<FaPlus />} color="gray.500" onClick={createQuestion}>
          Add Question
        </Button>
      </Grid>
    </>
  );
}

const DragHandle = SortableHandle(() => (
  <Flex cursor="row-resize" h="40px" w="40px" justify="center" align="center">
    <Icon color="gray.500" as={FaBars} />
  </Flex>
));

const SortableItem = SortableElement(({ value, error, i, updateQuestion, deleteQuestion }) => (
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
    {items.map((item, index) => (
      <SortableItem
        key={index}
        index={index}
        i={index}
        value={item.value}
        error={item.error}
        updateQuestion={updateQuestion}
        deleteQuestion={deleteQuestion}
      />
    ))}
  </Grid>
));

export default ScreeningEdit;
