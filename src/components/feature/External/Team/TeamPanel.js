import {
  Box,
  Heading,
  Text,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";

function Panel({ colorScheme, title, description, buttonText, buttonLink }) {
  const backgroundColor = useColorModeValue(
    `${colorScheme}.100`,
    `${colorScheme}.700`
  );

  const headingColor = useColorModeValue(
    `${colorScheme}.700`,
    `${colorScheme}.200`
  );

  return (
    <Box padding="30px">
      <Box background={backgroundColor} padding="30px" borderRadius="10px">
        <Heading color={headingColor} as="h2" size="lg" fontWeight="bold">
          {title}
        </Heading>
        <Text marginTop="4">{description}</Text>
        <Button
          marginTop="8"
          as="a"
          href={buttonLink}
          colorScheme={colorScheme}
          fontWeight="bold"
        >
          {buttonText}
        </Button>
      </Box>
    </Box>
  );
}

export default Panel;
