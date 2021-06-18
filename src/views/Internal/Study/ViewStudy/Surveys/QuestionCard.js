import { Text, Box, Flex, Badge, UnorderedList, ListItem } from "@chakra-ui/react";
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";
import { ActionButton } from "components";

function QuestionCard({ index, question, handleQuestionEdit, handleQuestionDelete }) {
  const constraintLabels = {
    characterMin: "Minumum Character Requirement",
    characterMax: "Maximum Character Requirement",
    dateMin: "Earliest Allowed Date",
    dateMax: "Latest Allowed Date",
    timeMin: "Earliest Allowed Time",
    timeMax: "Latest Allowed Time",
    timeInterval: "Time Interval (Minutes)",
    numberMin: "Minimum Number Response",
    numberMax: "Maximum Number Response",
    numberInterval: "Number Interval",
    pdfAllowed: "PDF Allowed",
    docAllowed: "Doc Allowed",
    jpgAllowed: "JPG Allowed",
    pngAllowed: "PNG Allowed",
    required: "Required",
  };
  function isBlank(arr) {
    for (const elem of arr) {
      if (elem !== "") {
        return false;
      }
    }
    return true;
  }
  return (
    <Box borderWidth="1px" bg="white" rounded="md" p="10px">
      <Flex justify="space-between" align="center" mb="4px">
        <Badge size="sm" color="gray.600">
          {question.type}
        </Badge>
        {question.required && (
          <Badge size="sm" colorScheme="purple">
            Required
          </Badge>
        )}
      </Flex>
      <Box my="10px">
        <Text fontSize="sm" fontStyle="italic" color="gray.500">
          Prompt
        </Text>
        <Text color="black" fontWeight="500">
          Question {index + 1}: {question.prompt}
        </Text>
      </Box>
      <Box my="10px">
        {question.constraints && (
          <Text fontSize="sm" fontStyle="italic" color="gray.500">
            Constraints
          </Text>
        )}
        <UnorderedList pl="10px">
          {question.constraints &&
            Object.keys(question.constraints).map((constraint, i) => (
              <ListItem key={i}>
                {`${constraintLabels[constraint]}: ${question.constraints[constraint]}`}
              </ListItem>
            ))}
        </UnorderedList>
      </Box>
      <Box my="10px">
        {!isBlank(question.options) && (
          <Text fontSize="sm" fontStyle="italic" color="gray.500">
            Options
          </Text>
        )}
        <UnorderedList pl="10px">
          {question.options?.map(
            (option, i) => option !== "" && <ListItem key={i}>{option}</ListItem>
          )}
        </UnorderedList>
      </Box>
      <Flex justify="space-between" align="center" mt="16px">
        <Flex gridGap="4px">
          <ActionButton
            icon={<FaPencilAlt />}
            color="blue"
            onClick={() => handleQuestionEdit(index)}
          />
          <ActionButton
            icon={<FaTrashAlt />}
            color="red"
            onClick={() => handleQuestionDelete(index)}
          />
        </Flex>
      </Flex>
    </Box>
  );
}

export default QuestionCard;
