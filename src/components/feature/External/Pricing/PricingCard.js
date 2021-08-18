import { useColor } from "hooks";
import {
  Box,
  Flex,
  Heading,
  Icon,
  List,
  ListIcon,
  ListItem,
  Text,
  VStack,
  Button,
} from "@chakra-ui/react";
import { Link } from "components";
import { HiCheckCircle } from "react-icons/hi";
import PricingBadge from "./PricingBadge";

function PricingCard({
  icon,
  name,
  price,
  features,
  isPopular,
  billedAnnually,
}) {
  const background = useColor("white", "gray.900");
  const accentColor = useColor("blue.600", "blue.400");
  const borderColor = useColor("gray.200", "gray.700");

  return (
    <Flex
      paddingX="24px"
      paddingBottom="24px"
      paddingTop="48px"
      position="relative"
      overflow="hidden"
      shadow="lg"
      width="100%"
      direction="column"
      rounded="xl"
      borderWidth="1px"
      background={background}
      borderColor={borderColor}
    >
      {isPopular && <PricingBadge>Popular</PricingBadge>}
      <VStack spacing={6}>
        <Icon aria-hidden as={icon} fontSize="4xl" color={accentColor} />
        <Heading size="lg" fontWeight="bold">
          {name}
        </Heading>
      </VStack>
      <Box marginY="6">
        <Flex
          align="flex-end"
          justify="center"
          fontWeight="extrabold"
          color={accentColor}
        >
          <Heading
            size="xl"
            fontWeight="inherit"
            lineHeight="0.9em"
            marginRight="2px"
          >
            {price[billedAnnually ? 1 : 0]}
          </Heading>
          <Text fontWeight="inherit" fontSize="lg">
            / month
          </Text>
        </Flex>
        <Text
          color="gray.500"
          marginTop="4px"
          fontWeight="500"
          textAlign="center"
        >
          billed {billedAnnually ? "annually" : "monthly"}
        </Text>
      </Box>
      <List spacing="4" marginBottom="8" maxWidth="28ch" marginX="auto">
        {features.map((feature, index) => (
          <ListItem fontWeight="medium" key={index}>
            <ListIcon
              fontSize="xl"
              as={HiCheckCircle}
              marginEnd={2}
              color={accentColor}
            />
            {feature}
          </ListItem>
        ))}
      </List>
      <Link to="/auth">
        <Button marginTop="auto" colorScheme="blue" size="lg">
          Start Now
        </Button>
      </Link>
    </Flex>
  );
}

export default PricingCard;
