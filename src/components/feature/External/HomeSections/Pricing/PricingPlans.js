import PricingPlan from "./PricingPlan";

function PricingPlans({ plans, isBilledAnnually }) {
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        justifyContent: "space-evenly",
      }}
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
