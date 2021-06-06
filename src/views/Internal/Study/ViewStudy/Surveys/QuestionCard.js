import { Text, Box, Flex, Badge, UnorderedList, ListItem } from "@chakra-ui/react";
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";
import { ActionButton } from "components";

function QuestionCard({ index, question, handleQuestionEdit, handleQuestionDelete }) {
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
        <Text fontSize="sm" fontStyle="italic" color="gray.500">
          Constraints
        </Text>
        <UnorderedList pl="10px">
          {question.options?.map((option, i) => (
            <ListItem key={i}>{option}</ListItem>
          ))}
        </UnorderedList>
      </Box>
      <Box my="10px">
        <Text fontSize="sm" fontStyle="italic" color="gray.500">
          Options
        </Text>
        <UnorderedList pl="10px">
          {question.options?.map((option, i) => (
            <ListItem key={i}>{option}</ListItem>
          ))}
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
