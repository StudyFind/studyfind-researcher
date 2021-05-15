import React from "react";
import { compute } from "functions";

import { Heading, Text, Progress, Tag, Flex, Tooltip, Icon, Box } from "@chakra-ui/react";
import { FaInfoCircle } from "react-icons/fa";

function DescriptionAccessibilityScore({ description }) {
  const getColor = (score) => {
    if (isNaN(score)) return "gray";
    if (score <= 20) return "red";
    if (score >= 50) return "green";
    return "yellow";
  };

  const score = compute.readabilityIndex(description);
  const value = score || 0;
  const color = getColor(score);

  return (
    <Box borderWidth="1px" p="16px 20px" rounded="md">
      <Flex align="center">
        <Heading mr="8px" size="md">
          Description Accessibility Score
        </Heading>
        <Tag variant="solid" mr="8px" fontWeight="500" colorScheme={color}>
          {value}%
        </Tag>
        <Tooltip label="This score is derived from the Flesch–Kincaid Readability Index. To improve your accessibility score, please use shorter sentences and words with fewer syllables.">
          <Box>
            <Icon color="gray.500" as={FaInfoCircle} />
          </Box>
        </Tooltip>
      </Flex>
      <Text color="gray.500">
        Accessible study descriptions are shown to improve participant interest and enrollment rates
      </Text>
      <Progress value={value} mt="8px" bg="gray.200" colorScheme={color} />
    </Box>
  );
}

export default DescriptionAccessibilityScore;
