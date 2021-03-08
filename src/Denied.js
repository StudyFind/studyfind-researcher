import React from "react";
import { signout } from "database/auth";

import { Box, Flex, Icon, Text, Button } from "@chakra-ui/react";
import { FaTimesCircle, FaDoorOpen } from "react-icons/fa";

function Denied({ email }) {
  return (
    <Flex gridGap="16px" direction="column" justify="center" align="center" h="100vh">
      <Icon as={FaTimesCircle} color="red.500" fontSize="36px" />
      <Box textAlign="center">
        <Text as="b" fontSize="24px">
          {email}
        </Text>
        <Text>is not associated with a researcher account</Text>
      </Box>
      <Button colorScheme="red" rightIcon={<FaDoorOpen />} onClick={signout}>
        Sign out
      </Button>
    </Flex>
  );
}

export default Denied;
