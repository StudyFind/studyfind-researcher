import { Box, Flex, Heading, Icon, List, ListIcon, ListItem, Text, VStack } from "@chakra-ui/react";
import { HiCheckCircle } from "react-icons/hi";
import Card from "./Card";
import ActionButton from "./ActionButton";

function PricingCard({ icon, name, price, features, billedAnnually, handleClick, subscribed, ...rest }) {
  return (
    <Card rounded={{ sm: "xl" }} {...rest}>
      <VStack spacing={6}>
        <Icon aria-hidden as={icon} fontSize="4xl" color="blue.600" />
        <Heading size="lg" fontWeight="bold">
          {name}
        </Heading>
      </VStack>
      <Box my="6">
        <Flex align="flex-end" justify="center" fontWeight="extrabold" color="blue.600">
          <Heading size="xl" fontWeight="inherit" lineHeight="0.9em">
            {price[billedAnnually + 0]}
          </Heading>
          <Text fontWeight="inherit" fontSize="lg">
            / month
          </Text>
        </Flex>
        <Text color="gray.500" mt="4px" fontWeight="500" textAlign="center">
          billed {billedAnnually ? "annually" : "monthly"}
        </Text>
      </Box>
      <List spacing="4" mb="8" maxW="28ch" mx="auto">
        {features.map((feature, index) => (
          <ListItem fontWeight="medium" key={index}>
            <ListIcon fontSize="xl" as={HiCheckCircle} marginEnd={2} color="blue.600" />
            {feature}
          </ListItem>
        ))}
      </List>
      {subscribed ? (
        <ActionButton mt="auto" onClick={() => handleClick()}>Manage Plan</ActionButton>
      ) : (
        <ActionButton mt="auto" onClick={() => handleClick()}>Buy Now</ActionButton>
      )}
    </Card>
  );
}

export default PricingCard;