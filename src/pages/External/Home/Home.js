import { useColor } from "hooks";
import { Box, Divider } from "@chakra-ui/react";

import Header from "components/feature/External/HomeSections/Header/Header";
import Footer from "components/feature/External/HomeSections/Footer/Footer";

import HeroSection from "./HeroSection";
import FeatureSection from "./FeatureSection";
import TeamSection from "./TeamSection";
import MailingSection from "./MailingSection";
import PricingSection from "./PricingSection";

function HomePage() {
  const dividerColor = useColor("gray.200", "gray.600");

  return (
    <Box>
      <Header logoLink="/#" buttonText="Start Now" buttonLink="/auth" />
      <HeroSection />
      <Divider borderColor={dividerColor} />
      <FeatureSection />
      <Divider borderColor={dividerColor} />
      <TeamSection />
      <Divider borderColor={dividerColor} />
      <PricingSection />
      <Divider borderColor={dividerColor} />
      <MailingSection />
      <Divider borderColor={dividerColor} />
      <Footer
        links={{
          linkedin: "https://google.com",
          instagram: "https://google.com",
          facebook: "https://google.com",
        }}
      />
    </Box>
  );
}

export default HomePage;
