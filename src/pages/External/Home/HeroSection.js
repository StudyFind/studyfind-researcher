import Background from "images/hero_image.png";
import Hero from "components/feature/External/HomeSections/Hero/Hero";

function HeroSection() {
  return (
    <Hero
      blackText="We simplify coordinating with"
      blueText="your participants"
      buttonText="Start Now"
      buttonLink="/auth"
      image={Background}
    />
  );
}

export default HeroSection;
