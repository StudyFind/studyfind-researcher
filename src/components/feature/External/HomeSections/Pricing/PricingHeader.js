import { Heading, HStack, Text, VStack } from "@chakra-ui/react";
import { SwitchInput } from "components/simple/Inputs/SwitchInput";
import { useDetectDevice } from "hooks";

function PricingHeader({ title, description, isBilledAnnually, handleChange }) {
  const { isPhone } = useDetectDevice();

  return (
    <VStack align="center" spacing="24px" marginBottom="48px">
      <VStack align="center" spacing="15px">
        <Heading fontWeight="700">{title}</Heading>
        <Text textAlign="center" fontWeight="400" color="black" width="65%">
          {description}
        </Text>
      </VStack>
      <HStack fontWeight="700" paddingLeft="70px">
        <Text>Monthly</Text>
        <SwitchInput value={isBilledAnnually} onChange={handleChange} />
        <Text>Yearly </Text>
        <Text color="blue.500">(Save 20%)</Text>
      </HStack>
    </VStack>
  );
}

export default PricingHeader;
