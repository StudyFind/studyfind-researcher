import Background from "images/microscope.jpg";
import Hero from "components/feature/External/HomeSections/Hero/Hero";

function HeroSection() {
  return (
    <Hero
      blackText="We simplify coordinating"
      blueText="your participants"
      buttonText="Start Now"
      buttonLink="/auth"
      image={Background}
    />
  );
}

export default HeroSection;
