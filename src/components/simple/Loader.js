import { useColor } from "hooks";
import { Flex, Spinner } from "@chakra-ui/react";

export const Loader = ({ size = "lg", colorScheme = "blue" }) => {
  const thickness = ["xs", "sm", "md", "lg", "xl"].indexOf(size) + 1;

  const filledColor = useColor(`${colorScheme}.500`, `${colorScheme}.400`);
  const emptyColor = useColor("gray.200", "gray.700");

  return (
    <Flex justify="center" align="center" width="100%" height="calc(100vh - 80px)">
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
