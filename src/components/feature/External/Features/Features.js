import { useDetectDevice } from "hooks";
import { SimpleGrid, useColorModeValue } from "@chakra-ui/react";
import SectionWrapper from "../SectionWrapper";
import Feature from "./Feature";

function Features({ features }) {
  const background = useColorModeValue("gray.100", "gray.800");

  const { isPhone } = useDetectDevice();

  return (
    <SectionWrapper id="features" background={background}>
      <SimpleGrid columns={isPhone ? 1 : 2} spacingX="80px" spacingY="60px">
        {features.map((feature, i) => (
          <Feature key={i} icon={feature.icon} title={feature.title}>
            {feature.description}
          </Feature>
        ))}
      </SimpleGrid>
    </SectionWrapper>
  );
}

export default Features;
