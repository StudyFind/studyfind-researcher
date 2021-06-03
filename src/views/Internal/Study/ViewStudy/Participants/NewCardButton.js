import { Heading, Flex } from "@chakra-ui/react";
import { FaPlusCircle } from "react-icons/fa";

function NewCardButton({ children, onClick }) {
  return (
    <Flex
      h="136px"
      rounded="md"
      borderWidth="1px"
      borderColor="gray.300"
      borderStyle="dashed"
      bg="gray.100"
      justify="center"
      align="center"
      cursor="pointer"
      // don't change this to onClick={handleEdit} as argument to handleEdit must be empty
      onClick={onClick}
    >
      <Heading size="md" color="gray.500">
        <Flex justify="center" align="center" gridGap="8px">
          <FaPlusCircle />
          {children}
        </Flex>
      </Heading>
    </Flex>
  );
}

export default NewCardButton;
