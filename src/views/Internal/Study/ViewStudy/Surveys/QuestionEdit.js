import { useState, useEffect } from "react";
import { Box, Grid, Flex, Heading, Button, Checkbox, FormLabel, Text } from "@chakra-ui/react";
import {
  TextInput,
  TextareaInput,
  SelectInput,
  ActionButton,
  DateInput,
  TimeInput,
} from "components";
import { FaTrash } from "react-icons/fa";
import handleErrors from "./QuestionErrorHandling";

function QuestionEdit({ index, question, handleQuestionSave, handleQuestionCancel }) {
  const [inputs, setInputs] = useState({
    type: "multiple choice",
    prompt: "",
    options: ["", "", ""],
    constraints: {},
    required: false,
  });

  const [errors, setErrors] = useState({
    prompt: "bug",
    constraints: {},
    options: [],
  });

  useEffect(() => {
    if (question) {
      setInputs(question);
    }
  }, [question]);

  const handleChange = (name, value) => {
    setErrors((prev) => {
      return { ...prev, prompt: null };
    });
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const handleConstraintsChange = (name, value) => {
    setErrors((prev) => {
      return { ...prev, constraints: {} };
    });
    setInputs((prev) => {
      const constraints = { ...prev.constraints };
      constraints[name] = value;
      return { ...prev, constraints };
    });
  };

  const handleOptionAdd = () => {
    setInputs((prev) => ({ ...prev, options: prev.options.concat("") }));
  };

  const handleOptionsEdit = (index, name, value) => {
    setErrors((prev) => {
      return { ...prev, options: [] };
    });
    setInputs((prev) => {
      const options = [...prev.options];
      options[index] = value;
      return { ...prev, options };
    });
  };

  const handleOptionDelete = (index) => {
    setErrors((prev) => {
      return { ...prev, options: [] };
    });
    if (inputs?.options?.length === 1) {
      setErrors((prev) => {
        return { ...prev, options: ["Please include at least one answer choice.", null] };
      });
      return;
    }
    setInputs((prev) => {
      const options = [...prev.options];
      options.splice(index, 1);
      return { ...prev, options };
    });
  };

  const handleQuestionSaveModified = (index, inputs) => {
    handleErrors(inputs, setErrors);
    console.log(errors);
    console.log([errors.prompt, ...errors.options, ...Object.values(errors.constraints)]);
    for (const error of [errors.prompt, ...errors.options, ...Object.values(errors.constraints)]) {
      if (error) {
        console.log("theres an error!!");
        return;
      }
    }
    handleQuestionSave(index, inputs);
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
          <Button
            size="sm"
            colorScheme="blue"
            onClick={() => handleQuestionSaveModified(index, inputs)}
          >
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
        error={errors && errors?.prompt}
        height="60px"
      />
      {["multiple choice", "checkbox", "dropdown"].includes(inputs.type) && (
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
                  error={errors.options[i]}
                  onChange={(name, value) => handleOptionsEdit(i, name, value)}
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

      {["short answer", "long answer"].includes(inputs.type) && (
        <Box>
          <FormLabel>Character Limits</FormLabel>
          <Grid gap="10px">
            <Flex gridGap="10px">
              <Text>Min:</Text>
              <TextInput
                size="sm"
                rounded="md"
                name="characterMin"
                value={inputs?.constraints?.characterMin}
                error={errors?.constraints?.characterMin}
                onChange={(name, value) => handleConstraintsChange(name, value)}
              />
              <Text>Max:</Text>
              <TextInput
                size="sm"
                rounded="md"
                name="characterMax"
                value={inputs?.constraints?.characterMax}
                error={errors?.constraints?.characterMax}
                onChange={(name, value) => handleConstraintsChange(name, value)}
              />
            </Flex>
          </Grid>
        </Box>
      )}

      {["date"].includes(inputs.type) && (
        <Box>
          <FormLabel>Valid Responses</FormLabel>
          <Grid gap="10px">
            <Flex gridGap="10px">
              <Text>Min:</Text>
              <DateInput
                size="sm"
                rounded="md"
                name="dateMin"
                value={inputs?.constraints?.dateMin}
                error={errors?.constraints?.dateMin}
                onChange={(name, value) => handleConstraintsChange(name, value)}
              />
              <Text>Max:</Text>
              <DateInput
                size="sm"
                rounded="md"
                name="dateMax"
                value={inputs?.constraints.dateMax}
                error={errors?.constraints?.dateMax}
                onChange={(name, value) => handleConstraintsChange(name, value)}
              />
            </Flex>
          </Grid>
        </Box>
      )}

      {["time"].includes(inputs.type) && (
        <Box>
          <FormLabel>Valid Responses</FormLabel>
          <Grid gap="10px">
            <Flex gridGap="10px">
              <Text>Min:</Text>
              <TimeInput
                size="sm"
                rounded="md"
                name="timeMin"
                value={inputs?.constraints.timeMin}
                error={errors?.constraints?.timeMin}
                onChange={(name, value) => handleConstraintsChange(name, value)}
              />
              <Text>Max:</Text>
              <TimeInput
                size="sm"
                rounded="md"
                name="timeMax"
                value={inputs?.constraints.timeMax}
                error={errors?.constraints?.timeMax}
                onChange={(name, value) => handleConstraintsChange(name, value)}
              />
            </Flex>
            <Flex gridGap="10px">
              <Text>Interval (minutes):</Text>
              <TextInput
                size="sm"
                rounded="md"
                name="timeInterval"
                value={inputs?.constraints.timeInterval}
                error={errors?.constraints?.timeInterval}
                onChange={(name, value) => handleConstraintsChange(name, value)}
              />
            </Flex>
          </Grid>
        </Box>
      )}

      {["number"].includes(inputs.type) && (
        <Box>
          <FormLabel>Valid Responses</FormLabel>
          <Grid gap="10px">
            <Flex gridGap="10px">
              <Text>Min:</Text>
              <TextInput
                size="sm"
                rounded="md"
                name="numberMin"
                value={inputs?.constraints.numberMin}
                error={errors?.constraints?.numberMin}
                onChange={(name, value) => handleConstraintsChange(name, value)}
              />
              <Text>Max:</Text>
              <TextInput
                size="sm"
                rounded="md"
                name="numberMax"
                value={inputs?.constraints.numberMax}
                error={errors?.constraints?.numberMax}
                onChange={(name, value) => handleConstraintsChange(name, value)}
              />
            </Flex>
            <Flex gridGap="10px">
              <Text>Interval:</Text>
              <TextInput
                size="sm"
                rounded="md"
                name="numberInterval"
                value={inputs?.constraints.numberInterval}
                error={errors?.constraints?.numberInterval}
                onChange={(name, value) => handleConstraintsChange(name, value)}
              />
            </Flex>
          </Grid>
        </Box>
      )}

      {["file"].includes(inputs.type) && (
        <Box>
          <FormLabel>Valid File Types</FormLabel>
          <Grid gap="10px">
            <Flex gridGap="10px">
              <Checkbox
                size="sm"
                name="pdfAllowed"
                value={inputs?.constraints.pdfAllowed}
                onChange={(e) => handleConstraintsChange("pdfAllowed", e.target.checked)}
              >
                PDF
              </Checkbox>
            </Flex>
            <Checkbox
              size="sm"
              name="docAllowed"
              value={inputs?.constraints.docAllowed}
              onChange={(e) => handleConstraintsChange("docAllowed", e.target.checked)}
            >
              Doc
            </Checkbox>
            <Checkbox
              size="sm"
              name="jpgAllowed"
              value={inputs?.constraints.jpgAllowed}
              onChange={(e) => handleConstraintsChange("jpgAllowed", e.target.checked)}
            >
              JPG
            </Checkbox>
            <Checkbox
              size="sm"
              name="pngAllowed"
              value={inputs?.constraints.pngAllowed}
              onChange={(e) => handleConstraintsChange("pngAllowed", e.target.checked)}
            >
              PNG
            </Checkbox>
          </Grid>
        </Box>
      )}

      <Checkbox
        fontWeight="500"
        isChecked={inputs.required}
        onChange={(e) => handleConstraintsChange("required", e.target.checked)}
      >
        Make question required
      </Checkbox>
    </Grid>
  );
}

export default QuestionEdit;
