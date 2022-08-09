import { VStack, Heading } from "@chakra-ui/react";

function PricingPlanHeader({ name, color }) {
  return (
    <VStack marginLeft="24px" marginTop="24px">
      <Heading size="lg" fontWeight="bold">
        {name}
      </Heading>
    </VStack>
  );
}

export default PricingPlanHeader;
