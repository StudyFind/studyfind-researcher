import { Box, HStack, Icon, useColorModeValue } from "@chakra-ui/react";
import { FaCaretLeft, FaCaretRight } from "react-icons/fa";

function CarouselDots({
  size,
  itemIndex,
  numberOfItems,
  handleBack,
  handleNext,
  handleSelect,
}) {
  const selectedColor = useColorModeValue("blue.500", "blue.400");
  const defaultColor = useColorModeValue("gray.300", "gray.700");

  const pixelSize = { sm: 8, md: 10, lg: 12 }[size];

  const pixelSizeString = `${pixelSize}px`;
  const spaceSizeString = `${pixelSize + 8}px`;
  const arrowSizeString = `${pixelSize + 8}px`;

  const iconStyleProps = {
    color: defaultColor,
    cursor: "pointer",
    fontSize: arrowSizeString,
  };

  return (
    <HStack spacing={spaceSizeString}>
      <Icon as={FaCaretLeft} onClick={handleBack} {...iconStyleProps} />
      {Array(numberOfItems)
        .fill(true)
        .map((_, i) => (
          <Box
            rounded="full"
            cursor="pointer"
            width={pixelSizeString}
            height={pixelSizeString}
            background={i === itemIndex ? selectedColor : defaultColor}
            onClick={() => handleSelect(i)}
          />
        ))}
      <Icon as={FaCaretRight} onClick={handleNext} {...iconStyleProps} />
    </HStack>
  );
}

export default CarouselDots;
