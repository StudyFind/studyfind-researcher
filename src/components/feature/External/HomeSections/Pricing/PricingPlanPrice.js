import { Box, Flex, Heading, Text } from "@chakra-ui/react";

function PricingPlanPrice({ price, isBilledAnnually, color }) {
  return (
    <Box paddingLeft="24px">
      <Flex
        align="center"
        justify="center"
        fontWeight="extrabold"
        color={color}
      >
        <Heading
          fontSize="50px"
          lineHeight="0.9em"
          color="gray.500"
          fontWeight="400"
        >
          $
        </Heading>
        <Heading
          fontSize="50px"
          fontWeight="700"
          lineHeight="0.9em"
          marginRight="2px"
        >
          {price[isBilledAnnually ? 1 : 0]}
        </Heading>
        <Text fontWeight="400" fontSize="lg" alignSelf="flex-end">
          / month
        </Text>
      </Flex>
      {/* <Text
        color="gray.500"
        marginTop="4px"
        fontWeight="500"
        textAlign="center"
      >
        billed {isBilledAnnually ? "annually" : "monthly"}
      </Text> */}
    </Box>
  );
}

export default PricingPlanPrice;
