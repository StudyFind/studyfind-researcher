import React, { useState } from "react";
import { Box, Flex, Heading, Text, Link, Button } from "@chakra-ui/react";
import { FaCopy, FaCheckCircle } from "react-icons/fa";

function Share({ study }) {
  const link = `https://studyfind.org/study/${study.nctID}`;
  const [success, setSuccess] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(link).then(setSuccess(true));
  };

  return (
    <Box p="20px" borderBottom="1px solid #f1f2f3">
      <Heading mb="8px" size="md">
        Share Study
      </Heading>
      <Box my="8px">
        <Text color="gray.500">
          You can share this link with participants so they can find your study after signing in:
        </Text>
        <Link color="blue.500" href={link} target="_blank" rel="noreferrer">
          {link}
        </Link>
      </Box>
      <Flex gridGap="10px" mt="20px">
        {success ? (
          <Button
            variant="outline"
            color="green.500"
            bg="green.50"
            leftIcon={<FaCheckCircle />}
            onClick={handleCopyLink}
            _hover={{ bg: "green.50" }}
          >
            Copied!
          </Button>
        ) : (
          <Button variant="outline" color="gray.500" leftIcon={<FaCopy />} onClick={handleCopyLink}>
            Copy Link
          </Button>
        )}
      </Flex>
    </Box>
  );
}

export default Share;
