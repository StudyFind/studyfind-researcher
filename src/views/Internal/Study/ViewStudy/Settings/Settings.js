import React from "react";
import styled from "styled-components";

import { Heading, Box } from "@chakra-ui/react";

import Activate from "./Activate";
import Delete from "./Delete";
import Update from "./Update";

function Settings({ study, setStudy }) {
  return (
    <>
      <Head>
        <Heading fontSize="28px">Settings</Heading>
      </Head>
      <Box borderWidth="1px" rounded="md" bg="white">
        <Activate study={study} setStudy={setStudy} />
        <Update study={study} />
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
