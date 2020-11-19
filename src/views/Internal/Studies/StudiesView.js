import React from "react";
import styled from "styled-components";

import StudyCardSmall from "views/Internal/StudyCardSmall";

import { Link } from "react-router-dom";
import { Box, Heading, Text, Button, Spinner } from "@chakra-ui/react";
import { FaPlusCircle } from "react-icons/fa";

function StudiesView({ studies, loading }) {
  const GRID = (
    <Box>
      <Head>
        <Heading>Your Studies</Heading>
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

  const BODY = studies.length ? GRID : NONE;

  const LOAD = (
    <PageLoader>
      <Spinner thickness="4px" speed="0.5s" emptyColor="gray.200" color="blue.500" size="lg" />
    </PageLoader>
  );

  return <Page>{loading ? LOAD : BODY}</Page>;
}

const Page = styled.div`
  padding: 30px;
  height: 100%;
  background: #f8f9fa;
`;

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

const PageLoader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

export default StudiesView;
