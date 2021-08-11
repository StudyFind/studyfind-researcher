import { Flex, Spinner, useColorModeValue } from "@chakra-ui/react";

export const Loader = ({ size = "lg", color = "blue" }) => {
  const thickness = ["xs", "sm", "md", "lg", "xl"].indexOf(size) + 1;

  const filledColor = useColorModeValue(`${color}.500`, `${color}.400`);
  const emptyColor = useColorModeValue("gray.200", "gray.700");

  return (
    <Flex
      gridGap="10px"
      justify="center"
      align="center"
      height="100%"
      width="100%"
    >
      <Spinner
        speed="0.5s"
        color={filledColor}
        emptyColor={emptyColor}
        thickness={thickness}
        size={size}
      />
    </Flex>
  );
};
