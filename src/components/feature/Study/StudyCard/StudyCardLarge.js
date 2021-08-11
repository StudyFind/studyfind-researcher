import { useContext } from "react";
import MediaContext from "context/MediaContext";

import { Heading, Text, Box, Flex, useColorModeValue } from "@chakra-ui/react";

import StudyBullets from "./StudyBullets";
import StudyConditions from "./StudyConditions";
import StudyResearcher from "./StudyResearcher";

function StudyCardLarge({ study }) {
  const background = useColorModeValue("white", "gray.900");
  const borderColor = useColorModeValue("gray.200", "gray.700");

  const { isPhone } = useContext(MediaContext);

  return (
    <Box
      rounded="md"
      overflow="hidden"
      padding="20px"
      borderWidth="1px"
      borderColor={borderColor}
      background={background}
      width={isPhone && "100%"}
    >
      <Text fontSize="sm" color="gray.400">
        {study.id}
      </Text>
      <Heading size="md" marginTop="5px">
        {study.title}
      </Heading>
      <StudyConditions conditions={study.conditions} />
      <Text color="gray.500" marginY="15px">
        {study.description}
      </Text>
      <Flex
        direction={isPhone ? "column" : "row"}
        justify={isPhone || "space-between"}
        align={isPhone || "flex-end"}
        gridGap={isPhone && "20px"}
      >
        <StudyBullets
          sex={study.sex}
          minAge={study.minAge}
          maxAge={study.maxAge}
          acceptsHealthyVolunteers={study.acceptsHealthyVolunteers}
        />
        <StudyResearcher researcher={study.researcher} />
      </Flex>
    </Box>
  );
}

export default StudyCardLarge;
