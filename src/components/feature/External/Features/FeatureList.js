import { useContext } from "react";
import MediaContext from "context/MediaContext";

import { Box, SimpleGrid, useColorModeValue } from "@chakra-ui/react";

function FeatureList({ children }) {
  const background = useColorModeValue("gray.100", "gray.800");
  const { isPhone } = useContext(MediaContext);

  return (
    <Box background={background} paddingY="50px">
      <Box
        as="section"
        maxWidth="5xl"
        marginX="auto"
        paddingX={{ base: "6", md: "8" }}
      >
        <SimpleGrid columns={isPhone ? 1 : 2} spacing="40px">
          {children}
        </SimpleGrid>
      </Box>
    </Box>
  );
}

export default FeatureList;
