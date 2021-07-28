import styled from "styled-components";

import { storage } from "database/firebase";
import { toasts } from "templates";
import { useToast } from "@chakra-ui/react";
import { useParams } from "react-router-dom";

import { Box, Flex, Divider, Text, Icon, Tooltip } from "@chakra-ui/react";
import { FaFilePdf, FaTrashAlt } from "react-icons/fa";
import { ExternalLinkIcon } from "@chakra-ui/icons";

function FileCard({ file, getFiles }) {
  const toast = useToast();
  const { studyID } = useParams();

  const openFile = async () => {
    const url = await file.ref.getDownloadURL();
    window.open(url, "_newtab");
  };

  const deleteFile = () => {
    storage
      .ref(`study/${studyID}/${file.name}`)
      .delete()
      .then(() => getFiles())
      .catch(() => toast(toasts.connectionError));
  };

  return (
    <Box borderRadius="6px" borderWidth="1px">
      <Flex
        justify="center"
        align="center"
        h="100px"
        bg="white"
        borderTopLeftRadius="6px"
        borderTopRightRadius="6px"
        cursor="pointer"
        onClick={openFile}
      >
        <Icon as={FaFilePdf} color="gray.400" h="30px" w="30px" />
      </Flex>
      <Divider />
      <Box p="15px" bg="gray.50" borderBottomLeftRadius="6px" borderBottomRightRadius="6px">
        <Tooltip label={file.name}>
          <Name
            color="gray.600"
            fontSize="14px"
            fontWeight="500"
            cursor="pointer"
            onClick={openFile}
          >
            {file.name}
          </Name>
        </Tooltip>
        <Flex justify="space-between" align="center">
          <Text color="gray.400" fontSize="14px">
            {file.date}
          </Text>
          <Flex gridGap="6px" align="center">
            <Tooltip label="Delete File">
              <Icon
                as={FaTrashAlt}
                fontSize="12px"
                color="gray.400"
                _hover={{ color: "red.400" }}
                onClick={deleteFile}
                pointerEvents="all"
              />
            </Tooltip>
            <Tooltip label="Open File">
              <Icon
                as={ExternalLinkIcon}
                fontSize="14px"
                color="gray.400"
                _hover={{ color: "blue.400" }}
                cursor="pointer"
                onClick={openFile}
              />
            </Tooltip>
          </Flex>
        </Flex>
      </Box>
    </Box>
  );
}

const Name = styled(Text)`
  word-break: break-word;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  max-height: 100%; /* fallback */
  -webkit-line-clamp: 1; /* number of lines to show */
  -webkit-box-orient: vertical;
`;

export default FileCard;
