import styled from "styled-components";

import {
  Box,
  Flex,
  Divider,
  Text,
  Icon,
  Tooltip,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaFilePdf, FaTrashAlt } from "react-icons/fa";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { Link } from "components";

function FileCard({ file, handleDelete }) {
  const iconBackgroundColor = useColorModeValue("white", "gray.900");
  const detailsBackgroundColor = useColorModeValue("gray.50", "gray.800");
  const fileNameColor = useColorModeValue("gray.600", "gray.100");
  const secondaryColor = useColorModeValue("gray.400", "gray.500");
  const borderColor = useColorModeValue("gray.200", "gray.700");

  return (
    <Box borderRadius="6px" borderWidth="1px" borderColor={borderColor}>
      <Link to={file.link} isWrapper>
        <Flex
          justify="center"
          align="center"
          height="100px"
          background={iconBackgroundColor}
          borderTopRadius="6px"
        >
          <Icon
            as={FaFilePdf}
            color={secondaryColor}
            height="30px"
            width="30px"
          />
        </Flex>
      </Link>
      <Divider color={borderColor} />
      <Box
        padding="15px"
        background={detailsBackgroundColor}
        borderBottomRadius="6px"
      >
        <Link to={file.link} isWrapper>
          <Name color={fileNameColor} fontSize="14px" fontWeight="500">
            <Tooltip label={file.name}>{file.name}</Tooltip>
          </Name>
        </Link>
        <Flex justify="space-between" align="center">
          <Text color={secondaryColor} fontSize="14px">
            {file.date}
          </Text>
          <Flex gridGap="6px" align="center">
            <Tooltip label="Delete File">
              <Box>
                <Icon
                  as={FaTrashAlt}
                  fontSize="12px"
                  color={secondaryColor}
                  _hover={{ color: "red.400" }}
                  onClick={() => handleDelete(file.name)}
                  pointerEvents="all"
                />
              </Box>
            </Tooltip>
            <Tooltip label="Open File">
              <Box>
                <Link to={file.link} isWrapper>
                  <Icon
                    as={ExternalLinkIcon}
                    fontSize="14px"
                    color={secondaryColor}
                    _hover={{ color: "blue.400" }}
                    pointerEvents="all"
                  />
                </Link>
              </Box>
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
