import { useColor, useDetectDevice } from "hooks";

import { Box, SimpleGrid, Heading } from "@chakra-ui/react";

import Vir from "images/advisory/vir.png";
import Aidan from "images/advisory/aidan.jpeg";
import Alexis from "images/advisory/alexis.png";
import Ayesha from "images/advisory/ayesha.png";
import Evans from "images/advisory/evans.png";
import Gabi from "images/advisory/gabi.png";
import Hannah from "images/advisory/hannah.png";
import Reina from "images/advisory/reina.png";
import Romina from "images/advisory/romina.png";
import Steven from "images/advisory/steven.png";
import Suraj from "images/advisory/suraj.png";
import Talia from "images/advisory/talia.png";

import TeamMember from "components/feature/External/HomeSections/Team/TeamMember";

function Board() {
  const { responsive } = useDetectDevice();
  const background = useColor("teal.100", "teal.900");

  return (
    <Box id="board" minHeight="100vh" background={background} padding="40px">
      <Heading
        color="teal.500"
        size="2xl"
        lineHeight="1.25"
        textAlign="center"
        marginTop="20px"
        marginBottom="80px"
      >
        Advisory Board
      </Heading>
      <SimpleGrid columns={responsive([1, 3, 6])} spacingY="40px">
        <TeamMember image={Vir} name="Vir Mittal" position="" />
        <TeamMember image={Aidan} name="Aidan Williams" position="" />
        <TeamMember image={Alexis} name="Alexis Whitmire" position="" />
        <TeamMember image={Ayesha} name="Ayesha" position="" />
        <TeamMember image={Evans} name="Evans" position="" />
        <TeamMember image={Gabi} name="Gabi Schiller" position="" />
        <TeamMember image={Hannah} name="Hannah Lipper" position="" />
        <TeamMember image={Reina} name="Reina Factor" position="" />
        <TeamMember image={Romina} name="Romina Nejad" position="" />
        <TeamMember image={Steven} name="Steven Choi" position="" />
        <TeamMember image={Suraj} name="Suraj Ooman" position="" />
        <TeamMember image={Talia} name="Talia Korn" position="" />
      </SimpleGrid>
    </Box>
  );
}

export default Board;
