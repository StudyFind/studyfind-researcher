import { Flex, Tag, TagLabel } from "@chakra-ui/react";

function StudyConditions({ conditions }) {
  return (
    <Flex
      height="24px"
      gridGap="4px"
      marginTop="6px"
      flexWrap="wrap"
      overflow="hidden"
    >
      {conditions?.map((condition, i) => (
        <Tag key={i} variant="solid" size="sm" colorScheme="blue">
          <TagLabel>{condition}</TagLabel>
        </Tag>
      ))}
    </Flex>
  );
}

export default StudyConditions;
