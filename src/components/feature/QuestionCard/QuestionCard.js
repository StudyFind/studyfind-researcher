import { Box, Tag, Text, useColorModeValue } from "@chakra-ui/react";

function QuestionCard({ question, response }) {
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const backgroundColor = useColorModeValue("white", "gray.900");

  const questionColor = useColorModeValue("black", "gray.200");
  const responseColor = useColorModeValue("gray.500", "gray.500");

  return (
    <Box
      borderWidth="1px"
      borderColor={borderColor}
      background={backgroundColor}
      rounded="md"
      padding="15px"
    >
      <Tag
        size="sm"
        colorScheme={question.type === "Inclusion" ? "green" : "red"}
      >
        {question.type}
      </Tag>
      <Text color={questionColor} fontWeight="500">
        {question.prompt}
      </Text>
      <Text color={responseColor}>
        {response || (
          <Text fontStyle="italic" color="gray.400">
            no response
          </Text>
        )}
      </Text>
    </Box>
  );
}

export default QuestionCard;
