import { useContext } from "react";
import { useDetectDevice } from "hooks";

import { Grid, Flex, Heading, Text, SimpleGrid } from "@chakra-ui/react";

import TeamMember from "./TeamMember";
import TeamPanel from "./TeamPanel";

import Yohan from "images/Yohan.png";
import Andrew from "images/Andrew.png";
import Vir from "images/Vir.png";

function Team() {
  const { isPhone, isDesktop } = useDetectDevice();

  return (
    <Flex direction="column" align="center" paddingY="50px">
      <Heading size="2xl" marginBottom="20px" fontWeight="black" textAlign="center">
        About the team
      </Heading>
      <Text textAlign="center" color="gray.500" maxWidth={isPhone ? "80%" : "500px"}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
      </Text>
      <SimpleGrid
        marginTop={isPhone ? "60px" : "100px"}
        paddingX={isPhone ? "24px" : "100px"}
        spacing={isDesktop ? "10px" : "50px"}
        columns={isDesktop ? 3 : 1}
        width="100%"
      >
        <TeamMember
          image={Yohan}
          name="Yohan Jhaveri"
          position="Co-Founder"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
        />
        <TeamMember
          image={Andrew}
          name="Andrew Garcia"
          position="Co-Founder"
          description="Habitant morbi tristique senectus et netus et malesuada fames. Vestibulum morbi"
        />
        <TeamMember
          image={Vir}
          name="Vir Mittal"
          position="Co-Founder"
          description="Quis risus sed vulputate odio ut enim blandit volutpat. Amet cursus sit amet."
        />
      </SimpleGrid>
      <Grid
        marginTop={isPhone ? "60px" : "100px"}
        paddingX={isPhone ? "24px" : "100px"}
        templateColumns={isDesktop ? "1fr 1fr" : "1fr"}
      >
        <TeamPanel
          title="Interns"
          colorScheme="blue"
          description="Our interns have worked hard to deliver the best quality product for researchers to use."
          buttonText="Meet the Interns"
        />
        <TeamPanel
          title="Advisory Board"
          colorScheme="teal"
          description="Our advisory board has given us the direction and strategy needed to build a product researchers love."
          buttonText="Meet the Advisory Board"
        />
        {/* <TeamPanel
          title="Collaborations"
          colorScheme="purple"
          description="Our collaborations have enabled us to constantly push boundaries and develop experimental products."
          buttonText="View our Collaborations"
        /> */}
      </Grid>
    </Flex>
  );
}

export default Team;
