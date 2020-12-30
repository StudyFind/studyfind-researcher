import React from "react";
import styled from "styled-components";

import { Link } from "react-router-dom";
import { Heading, Button, Flex } from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa";

import StudyCardSmall from "views/Internal/StudyCardSmall";

function DashboardGrid({ studies }) {
  return (
    <>
      <Flex mb="25px" justify="space-between" align="center">
        <Heading size="lg">Dashboard</Heading>
        <Link to="/fetch">
          <Button leftIcon={<FaPlus />} colorScheme="blue">
            Create Study
          </Button>
        </Link>
      </Flex>
      <StudyGrid>
        {studies.map((study, index) => (
          <StudyCardSmall key={index} study={study} />
        ))}
      </StudyGrid>
    </>
  );
}

const StudyGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 25px;
  align-items: flex-start;
`;

export default DashboardGrid;
