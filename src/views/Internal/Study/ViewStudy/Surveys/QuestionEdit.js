import { useState, useEffect } from "react";
import { Box, Grid, Flex, Heading, Button, Checkbox, FormLabel } from "@chakra-ui/react";
import { TextInput, TextareaInput, SelectInput, ActionButton } from "components";
import { FaTrash } from "react-icons/fa";

function QuestionEdit({ index, question, handleQuestionSave, handleQuestionCancel }) {
  const [inputs, setInputs] = useState({
    type: "multiple choice",
    prompt: "",
    options: ["", "", ""],
    required: false,
  });

  useEffect(() => {
    if (question) {
      setInputs(question);
    }
  }, [question]);

  const handleChange = (name, value) => {
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const handleOptionAdd = () => {
    setInputs((prev) => ({ ...prev, options: prev.options.concat("") }));
  };

  const handleOptionEdit = (index, value) => {
    setInputs((prev) => {
      const options = [...prev.options];
      options[index] = value;
      return { ...prev, options };
    });
  };

  const handleOptionDelete = (index) => {
    setInputs((prev) => {
      const options = [...prev.options];
      options.splice(index, 1);
      return { ...prev, options };
    });
  };

  return (
    <Grid gap="20px">
      <Flex gridGap="5px" justify="space-between" align="center">
        <Heading size="md" color="gray.500">
          Question {index + 1}
        </Heading>
        <Flex justify="flex-end" gridGap="10px">
          <Button size="sm" variant="outline" color="gray.500" onClick={handleQuestionCancel}>
            Cancel
          </Button>
          <Button size="sm" colorScheme="blue" onClick={() => handleQuestionSave(index, inputs)}>
            Save Question
          </Button>
        </Flex>
      </Flex>
      <SelectInput
        name="type"
        label="Question Type"
        value={inputs.type}
        options={[
          { label: "Short Answer", value: "short answer" },
          { label: "Long Answer", value: "long answer" },
          { label: "Multiple Choice", value: "multiple choice" },
          { label: "Checkboxes", value: "checkboxes" },
          { label: "Dropdown", value: "dropdown" },
          { label: "Number", value: "number" },
          { label: "Email", value: "email" },
          { label: "Phone", value: "phone" },
          { label: "File", value: "file" },
          { label: "Link", value: "link" },
          { label: "Date", value: "date" },
          { label: "Time", value: "time" },
        ]}
        onChange={handleChange}
      />
      <TextareaInput
        name="prompt"
        label="Question Prompt"
        value={inputs.prompt}
        onChange={handleChange}
        height="60px"
      />
      {["multiple choice", "checkbox"].includes(inputs.type) && (
        <Box>
          <FormLabel>Answer Choices</FormLabel>
          <Grid gap="10px">
            {inputs?.options?.map((option, i) => (
              <Flex key={i} gridGap="10px">
                <TextInput
                  size="sm"
                  rounded="md"
                  name="option"
                  value={option}
                  onChange={(_, value) => handleOptionEdit(i, value)}
                />
                <ActionButton
                  color="red"
                  icon={<FaTrash />}
                  onClick={() => handleOptionDelete(i)}
                />
              </Flex>
            ))}
            <Button size="sm" variant="outline" color="gray.500" onClick={() => handleOptionAdd()}>
              Add Option
            </Button>
          </Grid>
        </Box>
      )}
      <Checkbox
        fontWeight="500"
        isChecked={inputs.required}
        onChange={(_, value) => handleChange("required", value)}
      >
        Make question required
      </Checkbox>
    </Grid>
  );
}

export default QuestionEdit;
