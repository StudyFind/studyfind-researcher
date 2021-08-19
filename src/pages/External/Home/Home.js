import { useColor } from "hooks";
import { Box, Divider } from "@chakra-ui/react";

import Header from "components/feature/External/Header/Header";
import HeroSection from "./HeroSection";
import FeatureSection from "./FeatureSection";
import TeamSection from "./TeamSection";
import MailingSection from "./MailingSection";
import PricingSection from "./PricingSection";
import Footer from "components/feature/External/Footer/Footer";

function HomePage() {
  const dividerColor = useColor("gray.200", "gray.600");
  const backgroundColor = useColor("white", "gray.900");

  const SectionDivider = () => <Divider borderColor={dividerColor} />;

  return (
    <Box background={backgroundColor}>
      <Header logoLink="/#" buttonText="Start Now" buttonLink="/auth" />
      <HeroSection />
      <SectionDivider />
      <FeatureSection />
      <SectionDivider />
      <TeamSection />
      <SectionDivider />
      <PricingSection />
      <SectionDivider />
      <MailingSection />
      <SectionDivider />
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
