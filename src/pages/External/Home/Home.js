import { useColor } from "hooks";
import { Box, Divider } from "@chakra-ui/react";

import Header from "components/feature/External/HomeSections/Header/Header";
import Footer from "components/feature/External/HomeSections/Footer/Footer";

import HeroSection from "./HeroSection";
import FeatureSection from "./FeatureSection";
import PricingSection from "./PricingSection";
import PromotionSection from "./PromotionSection";
import ToolSection from "./ToolSection";
import { useRef } from "react";

function HomePage() {
  const dividerColor = useColor("gray.200", "gray.600");
  const featureRef = useRef(null);

  return (
    <Box>
      <Header logoLink="/#" buttonText="Start Now" buttonLink="/auth" />
      <HeroSection />
      <Divider borderColor={dividerColor} />
      <PromotionSection />
      <Divider borderColor={dividerColor} />
      <PricingSection />
      <Divider borderColor={dividerColor} />
      <ToolSection />
      <Divider borderColor={dividerColor} />
      <FeatureSection ref={featureRef} />
      <Divider borderColor={dividerColor} />
      <Footer
        links={{
          linkedin: "https://www.linkedin.com/company/studyfind/",
          instagram: "https://www.instagram.com/studyfindco",
          facebook: "https://www.facebook.com/studyfindco",
        }}
      />
    </Box>
  );
}

export default HomePage;
