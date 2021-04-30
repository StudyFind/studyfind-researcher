import React from "react";
import { Flex, Tag, TagLabel } from "@chakra-ui/react";

function StudyConditions({ conditions }) {
  return (
    <Flex mt="6px" gridGap="4px" flexWrap="wrap" h="24px" overflow="hidden">
      {conditions?.map((condition, index) => (
        <Tag key={index} variant="solid" size="sm" colorScheme="blue">
          <TagLabel>{condition}</TagLabel>
        </Tag>
      ))}
    </Flex>
  );
}

export default StudyConditions;
