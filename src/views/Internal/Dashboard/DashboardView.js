import React from "react";
import styled from "styled-components";

import StudyCardSmall from "views/Internal/StudyCardSmall";

import { Link } from "react-router-dom";
import { Box, Heading, Text, Button, Flex } from "@chakra-ui/react";
import { Page } from "components";
import { FaPlusCircle } from "react-icons/fa";

function DashboardView({ studies, loading }) {
  const GRID = (
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
          <StudyCardSmall key={index} study={study} />
        ))}
      </StudyGrid>
    </Box>
  );

  const NONE = (
    <Box w="450px">
      <Heading fontSize="32px">Create your first study</Heading>
      <Text color="gray.500" mt="8px">
        You can add your study using its Clinical Trials ID and begin recruiting and managing
        participants almost instantaneously. StudyFind automates a lot of your work for you.
      </Text>
      <Link to="/create">
        <Button mt="40px" leftIcon={<FaPlusCircle />} colorScheme="blue">
          Create Study
        </Button>
      </Link>
    </Box>
  );

  return <Page isLoading={loading}>{studies.length ? GRID : NONE}</Page>;
}

const StudyGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: ${(props) => "270px".repeat(Math.floor(props.n / 2))};
  grid-gap: 25px;
  align-items: flex-start;
`;

export default DashboardView;
