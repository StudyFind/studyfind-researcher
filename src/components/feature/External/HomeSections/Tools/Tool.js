import { useDetectDevice } from "hooks";
import { Box, VStack, Text, Image } from "@chakra-ui/react";

function Tool({ icon, title, description }) {
  const { isPhone } = useDetectDevice();

  return (
    <VStack
      spacing={isPhone ? "15px" : "20px"}
      direction={isPhone ? "column" : "row"}
      alignItems="center"
    >
      <Image src={icon} boxSize="50%" />
      <Text fontWeight="700" fontSize="lg">
        {title}
      </Text>
      <Box maxWidth="300px" color="gray.500" align="center">
        {description}
      </Box>
    </VStack>
  );
}

export default Tool;
