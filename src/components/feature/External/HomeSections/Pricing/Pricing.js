import { useState } from "react";
import { useColor } from "hooks";

import PricingHeader from "./PricingHeader";
import PricingPlans from "./PricingPlans";
import SectionWrapper from "../SectionWrapper";

function Pricing({ title, description, plans }) {
  const [isBilledAnnually, setIsBilledAnnually] = useState(true);

  const handleChange = (_, value) => {
    setIsBilledAnnually(value);
  };

  const background = useColor("white", "gray.100");

  return (
    <SectionWrapper background={background} align="center" maxWidth="100%">
      <PricingHeader
        title={title}
        description={description}
        isBilledAnnually={isBilledAnnually}
        handleChange={handleChange}
      />
      <PricingPlans
        alignSelf="center"
        plans={plans}
        isBilledAnnually={isBilledAnnually}
      />
    </SectionWrapper>
  );
}

export default Pricing;
