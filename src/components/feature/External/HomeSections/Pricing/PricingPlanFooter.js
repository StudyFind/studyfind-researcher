import { Box, Text, Button } from "@chakra-ui/react";

function PricingPlanFooter() {
  const scrollToFeatures = () => {
    window.scrollTo({
      top: 2400,
      behavior: "smooth",
    });
  };

  return (
    <Box
      bgColor="gray.200"
      width="100%"
      padding="10px"
      justify="center"
      align="center"
    >
      <Button variant="ghost" onClick={scrollToFeatures}>
        <Text fontWeight="700" textAlign="center">
          View All Features
        </Text>
      </Button>
    </Box>
  );
}

export default PricingPlanFooter;
