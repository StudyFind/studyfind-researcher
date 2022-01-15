import { useDetectDevice } from "hooks";
import PricingPlan from "./PricingPlan";

function PricingPlans({ plans, isBilledAnnually }) {
  const { isDesktop } = useDetectDevice();
  return (
    <div
      style={
        isDesktop
          ? {
              display: "flex",
              width: "100%",
              justifyContent: "space-evenly",
            }
          : {
              display: "grid",
              width: "100%",
              rowGap: "20px",
            }
      }
    >
      {plans.map((plan, i) => (
        <PricingPlan
          key={i}
          name={plan.name}
          icon={plan.icon}
          price={plan.price}
          features={plan.features}
          isPopular={plan.isPopular}
          isBilledAnnually={isBilledAnnually}
        />
      ))}
    </div>
  );
}

export default PricingPlans;
