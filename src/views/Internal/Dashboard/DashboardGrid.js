import React from "react";

import { Link } from "react-router-dom";
import { Heading, Button, Flex, Grid } from "@chakra-ui/react";
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
      <Grid gap="25px" templateColumns="1fr 1fr" align="flex-start">
        {studies.map((study, index) => (
          <StudyCardSmall key={index} study={study} />
        ))}
      </Grid>
    </>
  );
}

export default DashboardGrid;
