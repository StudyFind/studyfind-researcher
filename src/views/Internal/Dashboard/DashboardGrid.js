import React from "react";
import styled from "styled-components";

import { Link } from "react-router-dom";
import { Box, Heading, Button, Flex } from "@chakra-ui/react";
import { FaPlusCircle } from "react-icons/fa";

import DashboardCard from "views/Internal/Dashboard/DashboardCard";

function DashboardGrid({ studies }) {
  return (
    <Box>
      <Flex mb="25px" justify="space-between" align="center">
        <Heading size="lg">Dashboard</Heading>
        <Link to="/create">
          <Button leftIcon={<FaPlusCircle />} colorScheme="blue">
            Create Study
          </Button>
        </Link>
      </Flex>
      <StudyGrid n={studies.length}>
        {studies.map((study, index) => (
          <DashboardCard key={index} study={study} />
        ))}
      </StudyGrid>
    </Box>
  );
}

const StudyGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: ${(props) => "270px".repeat(Math.floor(props.n / 2))};
  grid-gap: 25px;
  align-items: flex-start;
`;

export default DashboardGrid;
