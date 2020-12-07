import React from "react";
import { compute } from "functions";

import { Heading, Text, Progress, Tag, Flex, Tooltip, Icon } from "components";
import { FaInfoCircle } from "react-icons/fa";

function DescriptionAccessibilityScore({ description }) {
  const score = compute.readabilityIndex(description);
  return (
    <div>
      <Flex align="center">
        <Heading mr="8px" size="md">
          Description Accessibility Score
        </Heading>
        <Tag mr="8px" fontWeight="500" colorScheme="green">
          {score}%
        </Tag>
        <Tooltip label="This score uses the Flesch–Kincaid readability index">
          <Flex align="center">
            <Icon color="gray.500" as={FaInfoCircle} />
          </Flex>
        </Tooltip>
      </Flex>
      <Text color="gray.500">
        Accessible study descriptions are shown to improve participant interest and enrollment rates
      </Text>
      <Progress value={score} size="md" mt="8px" colorScheme="green" />
    </div>
  );
}

export default DescriptionAccessibilityScore;
