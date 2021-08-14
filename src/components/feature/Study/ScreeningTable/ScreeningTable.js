import {
  Text,
  Tag,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  useColorModeValue,
} from "@chakra-ui/react";

function ScreeningTable({ questions }) {
  const textColor = useColorModeValue("gray.600", "gray.400");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const headCellBackgroundColor = useColorModeValue("gray.100", "gray.800");
  const bodyCellBackgroundColor = useColorModeValue("white", "gray.900");

  return (
    <Table width="100%">
      <Thead>
        <Tr>
          <Th
            fontSize="12px"
            borderWidth="1px"
            borderColor={borderColor}
            background={headCellBackgroundColor}
          >
            Type
          </Th>
          <Th
            fontSize="12px"
            borderWidth="1px"
            borderColor={borderColor}
            background={headCellBackgroundColor}
          >
            Question
          </Th>
        </Tr>
      </Thead>
      <Tbody>
        {questions.map((question, i) => (
          <Tr key={i}>
            <Td
              padding="8px 12px"
              borderWidth="1px"
              borderColor={borderColor}
              background={bodyCellBackgroundColor}
              nowrap
            >
              <Tag
                colorScheme={question.type === "Inclusion" ? "green" : "red"}
              >
                {question.type}
              </Tag>
            </Td>
            <Td
              padding="8px 12px"
              borderWidth="1px"
              borderColor={borderColor}
              background={bodyCellBackgroundColor}
              nowrap
            >
              <Text color={textColor}>{question.prompt}</Text>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
}

export default ScreeningTable;
