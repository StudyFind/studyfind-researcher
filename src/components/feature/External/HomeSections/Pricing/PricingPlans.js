import { SimpleGrid } from "@chakra-ui/react";
import { useDetectDevice } from "hooks";
import PricingPlan from "./PricingPlan";

function PricingPlans({ plans, isBilledAnnually }) {
  const { responsive } = useDetectDevice();

  return (
    <SimpleGrid
      gap="20px"
      width="100%"
      columns={responsive([1, 2, 2])}
      justifyItems="center"
      maxChildWidth="100px"
    >
      {plans.map((plan, i) => (
        <PricingPlan
          key={i}
          name={plan.name}
          price={plan.price}
          startLabel={plan.startLabel}
          featureLabel={plan.featureLabel}
          features={plan.features}
          isBilledAnnually={isBilledAnnually}
        />
      ))}
    </SimpleGrid>
  );
}

export default PricingPlans;
