import React from "react";

import { Heading, Flex, Grid } from "@chakra-ui/react";

import DashboardButton from "./DashboardButton";
import StudyCardSmall from "views/Internal/StudyCardSmall";

function DashboardGrid({ verified, studies }) {
  return (
    <>
      <Flex justify="space-between" align="center" mb="25px">
        <Heading size="lg">Dashboard</Heading>
        <DashboardButton verified={verified} />
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
