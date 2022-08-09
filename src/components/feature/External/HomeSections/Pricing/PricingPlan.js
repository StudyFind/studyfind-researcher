import { useColor } from "hooks";
import { Flex } from "@chakra-ui/react";

import PricingPlanBadge from "./PricingPlanBadge";
import PricingPlanHeader from "./PricingPlanHeader";
import PricingPlanPrice from "./PricingPlanPrice";
import PricingPlanFeatures from "./PricingPlanFeatures";
import PricingPlanButton from "./PricingPlanButton";
import PricingPlanFooter from "./PricingPlanFooter";

function PricingPlan({
  name,
  price,
  startLabel,
  featureLabel,
  features,
  isBilledAnnually,
}) {
  const background = useColor("gray.100", "gray.200");
  const accentColor = useColor("blue.600", "blue.400");
  const borderColor = useColor("gray.200", "gray.700");

  return (
    <Flex
      gridGap="24px"
      position="relative"
      overflow="hidden"
      shadow="lg"
      direction="column"
      rounded="xl"
      borderWidth="1px"
      background={background}
      borderColor={borderColor}
      width="75%"
      align="flex-start"
    >
      <PricingPlanHeader name={name} color={accentColor} />
      <PricingPlanPrice
        price={price}
        isBilledAnnually={isBilledAnnually}
        color={accentColor}
      />
      <PricingPlanButton startLabel={startLabel} />
      <PricingPlanFeatures
        featureLabel={featureLabel}
        features={features}
        color={accentColor}
      />
      <PricingPlanFooter />
    </Flex>
  );
}

export default PricingPlan;
