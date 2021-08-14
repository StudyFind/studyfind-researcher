import { useState } from "react";
import { useDetectDevice } from "hooks";

import { Box, Grid, Heading, SimpleGrid, Switch, Text, useColorModeValue } from "@chakra-ui/react";

import PricingCard from "./PricingCard";

function Pricing({ plans }) {
  const { isPhone, isDesktop, responsive } = useDetectDevice();
  const [billedAnnually, setBilledAnually] = useState(true);

  const handleChange = (event) => {
    setBilledAnually(event.target.checked);
  };

  const background = useColorModeValue("gray.100", "gray.800");

  return (
    <Box id="pricing" background={background} paddingX={isPhone ? "20px" : "100px"} paddingY="50px">
      <Heading fontWeight="extrabold" marginBottom="12px">
        Pricing Plans
      </Heading>
      <Text color="gray.500" width={isPhone ? "100%" : "450px"}>
        Start with a free three month trial and then pick the plan of your liking. Account plans
        unlock additional features and newer features may arrive to higher tier plans first.
      </Text>
      <Text fontWeight="medium" marginTop="24px" marginBottom="48px">
        Monthly
        <Switch marginX="8px" isChecked={billedAnnually} onChange={handleChange} />
        Annually
      </Text>
      <SimpleGrid gap="30px" columns={responsive([1, 2, 3])}>
        {plans.map((plan, i) => (
          <PricingCard
            key={i}
            name={plan.name}
            icon={plan.icon}
            price={plan.price}
            features={plan.features}
            isPopular={plan.isPopular}
            billedAnnually={billedAnnually}
          />
        ))}
      </SimpleGrid>
    </Box>
  );
}

export default Pricing;
