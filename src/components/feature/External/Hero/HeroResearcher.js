import Background from "images/microscope.jpg";
import Hero from "./Hero";

function HeroResearcher() {
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

export default HeroResearcher;
