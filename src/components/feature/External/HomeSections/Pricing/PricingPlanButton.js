import { useHistory } from "hooks";

import { Button } from "@chakra-ui/react";

function PricingPlanButton({ startLabel }) {
  const history = useHistory();

  const handleClick = () => {
    localStorage.setItem("redirect", "/account/subscription");
    history.push("/auth");
  };

  return (
    <Button
      size="lg"
      width="88%"
      alignSelf="center"
      colorScheme="blue"
      onClick={handleClick}
    >
      {startLabel}
    </Button>
  );
}

export default PricingPlanButton;
