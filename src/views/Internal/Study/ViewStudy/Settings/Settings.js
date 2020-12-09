import React from "react";
import styled from "styled-components";

import { Heading, Box } from "components";

import Activate from "./Activate";
import Delete from "./Delete";
import Reset from "./Reset";

function Settings({ study, setStudy }) {
  return (
    <>
      <Head>
        <Heading fontSize="28px">Settings</Heading>
      </Head>
      <Box borderWidth="1px" rounded="md" bg="white">
        <Activate study={study} setStudy={setStudy} />
        <Reset study={study} />
        <Delete study={study} />
      </Box>
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
