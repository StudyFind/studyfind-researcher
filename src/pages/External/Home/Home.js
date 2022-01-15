import { useColor } from "hooks";
import { Box, Divider, Heading, Text } from "@chakra-ui/react";

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
      <div
        style={{
          display: "flex",
          width: "100vw",
          padding: "40px",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            textAlign: "center",
          }}
        >
          <Heading size="2xl" fontWeight="900">
            Our Mission
          </Heading>
          <Text mt="50px" color="gray.500">
            This is some test text This is some test text This is some test text
            This is some test text This is some test text This is some test text
            This is some test text This is some test text This is some test text
          </Text>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          width: "100vw",
          padding: "40px",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            textAlign: "center",
          }}
        >
          <Heading size="2xl" fontWeight="900">
            Our Vision
          </Heading>
          <Text mt="50px" color="gray.500">
            This is some test text This is some test text This is some test text
            This is some test text This is some test text This is some test text
            This is some test text This is some test text This is some test text
          </Text>
        </div>
      </div>
      <PricingSection />
      <Divider borderColor={dividerColor} />
      <MailingSection />
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
