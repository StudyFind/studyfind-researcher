import {
  Heading,
  Text,
  Progress,
  Tag,
  Flex,
  Tooltip,
  Icon,
  Box,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaInfoCircle } from "react-icons/fa";

function DescriptionAccessibilityScore({ score }) {
  const colorModeValues = {
    gray: useColorModeValue("gray.500", "gray.200"),
    red: useColorModeValue("red.500", "red.200"),
    green: useColorModeValue("green.500", "green.200"),
    yellow: useColorModeValue("yellow.500", "yellow.200"),
  };

  const isScoreInvalid = score === null || isNaN(score) || score === undefined;

  const getColor = () => {
    if (isScoreInvalid) return "gray";
    if (score <= 20) return "red";
    if (score >= 50) return "green";
    return "yellow";
  };

  const color = getColor();

  const scoreColor = useColorModeValue("white", "black");
  const scoreBackground = colorModeValues[color];
  const scoreBorderColor = useColorModeValue("gray.200", "gray.700");
  const progressBackground = useColorModeValue("gray.200", "gray.700");

  return (
    <Box
      borderColor={scoreBorderColor}
      borderWidth="1px"
      padding="16px 20px"
      rounded="md"
    >
      <Flex align="center">
        <Heading marginRight="8px" size="md">
          Description Accessibility Score
        </Heading>
        <Tag
          variant="solid"
          marginRight="8px"
          fontWeight="500"
          minWidth="45px"
          color={scoreColor}
          background={scoreBackground}
        >
          {isScoreInvalid ? "??" : score}%
        </Tag>
        <Tooltip label="This score is derived from the Flesch–Kincaid Readability Index. To improve your accessibility score, please use shorter sentences and words with fewer syllables.">
          <Box>
            <Icon color="gray.500" as={FaInfoCircle} />
          </Box>
        </Tooltip>
      </Flex>
      <Text color="gray.500">
        Accessible study descriptions are shown to improve participant interest
        and enrollment rates
      </Text>
      <Progress
        value={score}
        marginTop="8px"
        background={progressBackground}
        colorScheme={color}
      />
    </Box>
  );
}

export default DescriptionAccessibilityScore;
