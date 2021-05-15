import React from "react";

import { Link, ClipboardButton } from "components";
import { Box, Flex, Heading, Text } from "@chakra-ui/react";

function Share({ study }) {
  const link = `https://participant.studyfind.org/study/${study.id}`;

  return (
    <Box p="20px">
      <Heading mb="8px" size="md">
        Share Study
      </Heading>
      <Box my="8px">
        <Text color="gray.500">
          You can share this link with participants so they can find your study after signing in:
        </Text>
        <Link to={link}>{link}</Link>
      </Box>
      <Flex gridGap="10px" mt="20px">
        <ClipboardButton link={link} copiedText="Copied!">
          Copy Link
        </ClipboardButton>
      </Flex>
    </Box>
  );
}

export default Share;
