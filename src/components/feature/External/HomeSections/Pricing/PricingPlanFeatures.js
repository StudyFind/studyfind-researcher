import { List, ListIcon, ListItem, Text, HStack, Box } from "@chakra-ui/react";
import { HiCheck } from "react-icons/hi";

function PricingPlanFeatures({ featureLabel, features, color }) {
  return (
    <Box marginLeft="24px">
      <Text fontWeight="700" marginBottom="5px">
        {featureLabel}
      </Text>
      <List spacing="5px" maxWidth="280px">
        {features.map((feature, index) => (
          <ListItem fontWeight="400" key={index}>
            <HStack spacing="0">
              <ListIcon fontSize="xl" as={HiCheck} color={color} />
              <Text>{feature}</Text>
            </HStack>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

export default PricingPlanFeatures;
