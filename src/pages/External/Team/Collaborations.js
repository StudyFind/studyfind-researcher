import { useColor, useDetectDevice } from "hooks";

import { Box, SimpleGrid, Heading } from "@chakra-ui/react";

function Collaborations() {
  const { responsive } = useDetectDevice();
  const background = useColor("purple.100", "purple.900");

  return (
    <Box id="collaborations" minHeight="100vh" background={background} padding="40px">
      <Heading
        color="purple.500"
        size="2xl"
        lineHeight="1.25"
        textAlign="center"
        marginTop="20px"
        marginBottom="80px"
      >
        Collaborations
      </Heading>
      <SimpleGrid columns={responsive([1, 1, 3])} spacingY="40px">
        <Box>
          Emory University (Emory Entreprenuership Excellerator and Emory Biotech Consulting Club)
        </Box>
        <Box>Georgia Tech (Capstone Project)</Box>
        <Box>Stony Brook(Fellowship)</Box>
      </SimpleGrid>
    </Box>
  );
}

export default Collaborations;
