import { useState, useContext } from "react";
import MediaContext from "context/MediaContext";

import {
  Box,
  Grid,
  Heading,
  Switch,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { SiHive, SiMarketo, SiMicrosoft } from "react-icons/si";
import PricingCard from "./PricingCard";

function Pricing() {
  const { isPhone, isDesktop } = useContext(MediaContext);
  const [billedAnnually, setBilledAnually] = useState(true);

  const handleChange = (event) => {
    setBilledAnually(event.target.checked);
  };

  const plans = {
    basic: {
      icon: SiMicrosoft,
      name: "Basic",
      price: ["$29", "$19"],
      features: [
        "Create Studies",
        "Recruit Participants",
        "Track Participant Status",
      ],
    },

    standard: {
      icon: SiMarketo,
      name: "Standard",
      price: ["$99", "$79"],
      features: [
        "Everything in Basic",
        "Participant Reminders",
        "Schedule Meetings",
      ],
      isPopular: true,
    },

    premium: {
      icon: SiHive,
      name: "Premium",
      price: ["$249", "$199"],
      features: [
        "Everything in Standard",
        "Instant Messaging",
        "Email and Text Notifications",
      ],
    },
  };

  const background = useColorModeValue("gray.100", "gray.800");

  return (
    <Box
      background={background}
      paddingX={isPhone ? "20px" : "100px"}
      paddingY="50px"
    >
      <Heading fontWeight="extrabold" marginBottom="12px">
        Pricing Plans
      </Heading>
      <Text color="gray.500" width={isPhone ? "100%" : "450px"}>
        Start with a free three month trial and then pick the plan of your
        liking. Account plans unlock additional features and newer features may
        arrive to higher tier plans first.
      </Text>
      <Text fontWeight="medium" marginTop="24px" marginBottom="48px">
        Monthly
        <Switch
          marginX="8px"
          isChecked={billedAnnually}
          onChange={handleChange}
        />
        Annually
      </Text>
      <Grid gap="30px" templateColumns={isDesktop ? "1fr 1fr 1fr" : "1fr"}>
        <PricingCard billedAnnually={billedAnnually} {...plans.basic} />
        <PricingCard billedAnnually={billedAnnually} {...plans.standard} />
        <PricingCard billedAnnually={billedAnnually} {...plans.premium} />
      </Grid>
    </Box>
  );
}

export default Pricing;
