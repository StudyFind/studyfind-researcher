import { useColor } from "hooks";
import { Text, Tag, Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";

function ScreeningTable({ questions }) {
  const textColor = useColor("gray.600", "gray.400");
  const borderColor = useColor("gray.200", "gray.700");
  const headCellBackgroundColor = useColor("gray.100", "gray.800");
  const bodyCellBackgroundColor = useColor("white", "gray.900");

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
