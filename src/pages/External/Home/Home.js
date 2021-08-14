import { Box, Divider, useColorModeValue } from "@chakra-ui/react";

import Header from "components/feature/External/Header/Header";
import HeroSection from "./HeroSection";
import FeatureSection from "./FeatureSection";
import TeamSection from "./TeamSection";
import MailingSection from "./MailingSection";
import PricingSection from "./PricingSection";
import Footer from "components/feature/External/Footer/Footer";

function HomePage() {
  const dividerColor = useColorModeValue("gray.200", "gray.600");
  const backgroundColor = useColorModeValue("white", "gray.900");

  return (
    <Box background={backgroundColor}>
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
      <Footer />
    </Box>
  );
}

export default HomePage;
