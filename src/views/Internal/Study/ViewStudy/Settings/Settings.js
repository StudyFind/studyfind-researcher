import React from "react";
import { Box, Flex, Heading } from "@chakra-ui/react";

import Publish from "./Publish";
import Activate from "./Activate";
import Share from "./Share";
import Delete from "./Delete";
import Update from "./Update";

function Settings({ study }) {
  return (
    <>
      <Flex justify="space-between" align="center" my="15px" height="40px">
        <Heading fontSize="28px">Settings</Heading>
      </Flex>
      <Box borderWidth="1px" rounded="md" bg="white">
        {study.published ? (
          <>
            <Activate study={study} />
            {study.activated && <Share study={study} />}
          </>
        ) : (
          <Publish study={study} />
        )}
        <Update study={study} />
        <Delete study={study} />
      </Box>
    </>
  );
}

export default Settings;
