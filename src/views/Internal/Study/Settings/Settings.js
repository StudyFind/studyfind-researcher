import React from "react";
import styled from "styled-components";

import { Heading, Box, Grid } from "components";

import Activate from "./Activate";
import Delete from "./Delete";
import Reset from "./Reset";

function Settings({ study, setStudy }) {
  return (
    <>
      <Head>
        <Heading fontSize="28px">Settings</Heading>
      </Head>
      <Grid templateColumns="1fr 1fr" gap="20px">
        <Box borderWidth="1px" rounded="md" overflow="hidden" bg="white">
          <Activate study={study} setStudy={setStudy} />
        </Box>
        <Box borderWidth="1px" rounded="md" overflow="hidden" bg="white">
          <Reset study={study} />
        </Box>
        <Box borderWidth="1px" rounded="md" overflow="hidden" bg="white">
          <Delete study={study} />
        </Box>
      </Grid>
    </>
  );
}

const Head = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 15px 0;
`;

export default Settings;
