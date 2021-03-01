import React from "react";

import { auth } from "database/firebase";
import { Link } from "react-router-dom";
import { Heading, Button, Flex, Grid, Tooltip } from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa";

import StudyCardSmall from "views/Internal/StudyCardSmall";

function DashboardGrid({ studies }) {
  const verified = auth.currentUser.emailVerified;

  return (
    <>
      <Flex justify="space-between" align="center" mb="25px">
        <Heading size="lg">Dashboard</Heading>
        <Tooltip
          label={!verified && "You must verify your email before you can create any studies"}
          placement="left"
        >
          <Link to="/fetch">
            <Button isDisabled={!verified} leftIcon={<FaPlus />} colorScheme="blue">
              Create Study
            </Button>
          </Link>
        </Tooltip>
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
