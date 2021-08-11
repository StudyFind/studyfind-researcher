import { Heading, Flex, useColorModeValue } from "@chakra-ui/react";
import { FaPlusCircle } from "react-icons/fa";

export const NewCardButton = ({ children, onClick }) => {
  const color = useColorModeValue("gray.500", "gray.500");
  const border = useColorModeValue("gray.300", "gray.600");
  const background = useColorModeValue("gray.100", "gray.800");

  return (
    <Flex
      width="100%"
      height="136px"
      rounded="md"
      borderWidth="1px"
      borderStyle="dashed"
      borderColor={border}
      background={background}
      justify="center"
      align="center"
      cursor="pointer"
      onClick={onClick}
    >
      <Heading fontWeight="600" size="md" color={color}>
        <Flex justify="center" align="center" gridGap="8px">
          <FaPlusCircle />
          {children}
        </Flex>
      </Heading>
    </Flex>
  );
};

export default NewCardButton;
