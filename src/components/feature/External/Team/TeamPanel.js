import { useColor } from "hooks";
import { Box, Flex, Heading, Text, Button } from "@chakra-ui/react";

function Panel({ colorScheme, title, description, buttonText, buttonLink }) {
  const backgroundColor = useColor(`${colorScheme}.100`, `${colorScheme}.700`);

  const headingColor = useColor(`${colorScheme}.700`, `${colorScheme}.200`);

  return (
    <Flex justify="center">
      <Box
        background={backgroundColor}
        padding="30px"
        borderRadius="10px"
        maxWidth="360px"
      >
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
    </Flex>
  );
}

export default Panel;
