import React from "react";
import styled from "styled-components";

import { Link } from "react-router-dom";
import { Box, Heading, Button } from "@chakra-ui/react";
import { FaPlusCircle } from "react-icons/fa";
import StudyCardSmall from "views/Internal/StudyCardSmall";

function DashboardGrid({ studies }) {
  return (
    <Box>
      <Head>
        <Heading size="lg">Dashboard</Heading>
        <Link to="/create">
          <Button leftIcon={<FaPlusCircle />} colorScheme="blue">
            Create Study
          </Button>
        </Link>
      </Head>
      <StudyGrid n={studies.length}>
        {studies.map((study, index) => (
          <StudyCardSmall key={index} study={study} />
        ))}
      </StudyGrid>
    </Box>
  );
}

const Head = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
`;

const StudyGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: ${(props) => "270px".repeat(Math.floor(props.n / 2))};
  grid-gap: 25px;
  align-items: flex-start;
`;

export default DashboardGrid;
