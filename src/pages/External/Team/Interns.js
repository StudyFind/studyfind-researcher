import { useColor, useDetectDevice } from "hooks";

import { Box, SimpleGrid, Heading, VStack } from "@chakra-ui/react";

import David from "images/interns/david.jpeg";
import Gustavo from "images/interns/gustavo.png";
import Jeremy from "images/interns/jeremy.png";
import Jonathon from "images/interns/jonathon.jpeg";
import Keely from "images/interns/keely.png";
import Michael from "images/interns/michael.png";
import Wendy from "images/interns/wendy.jpeg";
import Wenkai from "images/interns/wenkai.png";
import Yuyao from "images/interns/yuyao.png";
import Mikolaj from "images/interns/mikolaj.jpg";
import Zeil from "images/interns/zeil.jpg";
import Mileen from "images/interns/mileen.jpg";
import Natalie from "images/interns/natalie.jpg";
import Eric from "images/interns/eric.jpg";
import Jason from "images/interns/jason.jpg";
import Nikita from "images/interns/nikita.jpg";
import Liang from "images/interns/liang.jpg";
import Sandra from "images/interns/sandra.jpeg";
import Randy from "images/interns/randy.png";
import Placeholder from "images/interns/placeholder.png";

import TeamMember from "components/feature/External/HomeSections/Team/TeamMember";

function Interns() {
  const { responsive } = useDetectDevice();
  const background = useColor("blue.100", "blue.900");

  return (
    <Box id="interns" minHeight="100vh" background={background} padding="40px">
      <Heading color="blue.500" size="2xl" lineHeight="1.25" textAlign="center" marginY="20px">
        Interns
      </Heading>
      <VStack align="stretch">
        <Box>
          <Heading align="center" size="lg" marginBottom="60px">
            Current
          </Heading>
          <SimpleGrid columns={responsive([1, 3, 6])} spacingY="40px">
            <TeamMember image={Keely} name="Keely Culbertson" position="Senior Developer" />
            <TeamMember image={David} name="David Chen" position="Senior Developer" />
            <TeamMember image={Jeremy} name="Jeremy Webb" position="Senior Developer" />
            <TeamMember image={Jonathon} name="Jonathon Sisson" position="Senior Developer" />
            <TeamMember image={Eric} name="Eric Park" position="Junior Developer" />
            <TeamMember image={Jason} name="Jason Ji" position="Junior Developer" />
            <TeamMember image={Placeholder} name="Ivan Yau" position="Junior Developer" />
            <TeamMember image={Yuyao} name="Yuyao Wang" position="Data Scientist" />
            <TeamMember image={Placeholder} name="Etna Ozkara" position="Backend Developer" />
            <TeamMember image={Placeholder} name="Biraj Ghimire" position="Fellow" />
            <TeamMember image={Placeholder} name="Brandon Banarsi" position="Fellow" />
            <TeamMember image={Sandra} name="Sandra Mustopa" position="Marketing" />
            <TeamMember image={Randy} name="Randy Erickson" position="Copywriting" />
          </SimpleGrid>
        </Box>
        <Box>
          <Heading align="center" size="lg" marginTop="40px" marginBottom="60px">
            Alumni
          </Heading>
          <SimpleGrid columns={responsive([1, 3, 6])} spacingY="40px">
            <TeamMember image={Mileen} name="Mileen Meyer" position="Marketing" />
            <TeamMember image={Natalie} name="Natalie Merizalde" position="Video Content" />
            <TeamMember image={Nikita} name="Nikita Kute" position="Research" />
            <TeamMember image={Mikolaj} name="Mikolaj Figurski" position="Senior Developer" />
            <TeamMember image={Zeil} name="Zeil Ren" position="Senior Developer" />
            <TeamMember image={Gustavo} name="Gustavo Fonseca" position="Junior Developer" />
            <TeamMember image={Michael} name="Michael Albo" position="Junior Developer" />
            <TeamMember image={Wenkai} name="Wenkai Zheng" position="Backend Developer" />
            <TeamMember image={Wendy} name="Wendy Mo" position="Data Scientist" />
            <TeamMember image={Liang} name="Liang Chen" position="Backend Developer" />
          </SimpleGrid>
        </Box>
      </VStack>
    </Box>
  );
}

export default Interns;
