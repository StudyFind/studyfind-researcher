import { Button } from "@chakra-ui/react";

function PricingPlanButton() {
  const handleClick = () => {
    localStorage.setItem("redirect", "/account/subscription");
  };

  return (
    <Button size="lg" width="100%" marginTop="10px" colorScheme="blue" onClick={handleClick}>
      Start Now
    </Button>
  );
}

export default PricingPlanButton;
