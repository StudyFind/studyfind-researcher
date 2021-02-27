import React from "react";
import styled from "styled-components";
import { Flex, Heading, Button, Box, Text, IconButton } from "@chakra-ui/react";
import { FaTrash } from "react-icons/fa";
import { Message } from "components";

function FilesViewer({ setEdit, files, deleteFile }) {
  const BODY = (
    <>
      <Flex justify="space-between" align="center" m="15px 0">
        <Heading fontSize="28px">Files</Heading>
        <Button colorScheme="blue" onClick={() => setEdit(true)}>
          Upload Files
        </Button>
      </Flex>
      <Box borderWidth="1px" rounded="md" overflow="hidden" bg="white">
        {files.map((file, i) => (
          <Row>
            <Text fontWeight="500" mr="auto">
              <a href={file.link}>{file.name}</a>
            </Text>
            <IconButton
              colorScheme=""
              color="gray.500"
              _hover={{ color: "red.500", bg: "red.100" }}
              icon={<FaTrash />}
              onClick={() => deleteFile(file.name)}
            />
          </Row>
        ))}
      </Box>
    </>
  );
  const EMPTY = (
    <Box h="500px">
      <Message
        type="neutral"
        title="Start Uploading Files"
        description="These files can be seen by the participants."
      >
        <Button colorScheme="blue" onClick={() => setEdit(true)}>
          Upload Files
        </Button>
      </Message>
    </Box>
  );
  return files.length ? BODY : EMPTY;
}
const Row = styled.div`
  display: flex;
  align-items: center;
  grid-gap: 10px;
  padding: 10px;

  border-bottom: 1px solid #f1f2f3;

  &:last-child {
    border-bottom: none;
  }
`;

export default FilesViewer;
