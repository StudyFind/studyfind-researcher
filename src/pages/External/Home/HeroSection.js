import Background from "images/microscope.jpg";
import Hero from "components/feature/External/HomeSections/Hero/Hero";

function HeroSection() {
  return (
    <Hero
      blackText="We help you find relevant"
      blueText="research studies"
      buttonText="Start Now"
      buttonLink="/auth"
      image={Background}
    />
  );
}

export default HeroSection;
