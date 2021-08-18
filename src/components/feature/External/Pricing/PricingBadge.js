import { useColor } from "hooks";
import { Flex, Text } from "@chakra-ui/react";

function PricingBadge({ children }) {
  return (
    <Flex
      background={useColor("blue.500", "blue.200")}
      position="absolute"
      paddingY="4px"
      top="24px"
      right="-80px"
      width="240px"
      transform="rotate(45deg)"
      justifyContent="center"
      alignItems="center"
    >
      <Text
        fontSize="xs"
        textTransform="uppercase"
        fontWeight="bold"
        letterSpacing="wider"
        color={useColor("white", "gray.800")}
      >
        {children}
      </Text>
    </Flex>
  );
}

export default PricingBadge;
