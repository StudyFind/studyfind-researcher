import { Flex, useColorModeValue } from "@chakra-ui/react";
import CardBadge from "./CardBadge";

function Card({ children, isPopular, ...rest }) {
  return (
    <Flex
      bg={useColorModeValue("white", "gray.700")}
      position="relative"
      px="6"
      pb="6"
      pt="12"
      overflow="hidden"
      shadow="lg"
      maxW="sm"
      width="100%"
      direction="column"
      {...rest}
    >
      {isPopular && <CardBadge>Popular</CardBadge>}
      {children}
    </Flex>
  );
}

export default Card;