import React from "react";

import { Heading, Flex, Grid } from "@chakra-ui/react";

import StudyCardSmall from "molecules/StudyCardSmall";

import DashboardButton from "./DashboardButton";

function DashboardGrid({ verified, studies }) {
  return (
    <>
      <Flex justify="space-between" align="center" mb="25px">
        <Heading size="lg">Dashboard</Heading>
        <DashboardButton verified={verified} />
      </Flex>
      <Grid gap="25px" templateColumns="1fr 1fr" align="flex-start">
        {studies.map((study) => (
          <StudyCardSmall key={study.id} study={study} />
        ))}
      </Grid>
    </>
  );
}

export default DashboardGrid;
