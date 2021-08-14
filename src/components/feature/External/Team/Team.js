import { useDetectDevice } from "hooks";
import { Heading, Text, SimpleGrid } from "@chakra-ui/react";

import SectionWrapper from "../SectionWrapper";
import TeamMember from "./TeamMember";
import TeamPanel from "./TeamPanel";

function Team({ title, description, founders, panels }) {
  const { isPhone, isDesktop, responsive } = useDetectDevice();

  return (
    <SectionWrapper id="team" direction="column">
      <Heading
        size="2xl"
        marginBottom="20px"
        fontWeight="black"
        textAlign="center"
      >
        {title}
      </Heading>
      <Text
        textAlign="center"
        color="gray.500"
        maxWidth={isPhone ? "80%" : "500px"}
      >
        {description}
      </Text>
      <SimpleGrid
        marginTop={isPhone ? "60px" : "100px"}
        spacing={isDesktop ? "10px" : "50px"}
        columns={responsive([1, 2, 3])}
        width="100%"
      >
        {founders.map((founder, i) => (
          <TeamMember
            key={i}
            name={founder.name}
            image={founder.image}
            position={founder.position}
            description={founder.description}
          />
        ))}
      </SimpleGrid>
      <SimpleGrid
        marginTop={isPhone ? "60px" : "100px"}
        spacing={isPhone ? "20px" : "60px"}
        columns={responsive([1, 2, 3])}
        width="100%"
      >
        {panels.map((panel, i) => (
          <TeamPanel
            key={i}
            title={panel.title}
            colorScheme={panel.colorScheme}
            description={panel.description}
            buttonText={panel.buttonText}
          />
        ))}
      </SimpleGrid>
    </SectionWrapper>
  );
}

export default Team;
