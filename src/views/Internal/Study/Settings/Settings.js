import React from "react";
import styled from "styled-components";

import { Heading, Box } from "@chakra-ui/react";

import Activate from "./Activate";
import Delete from "./Delete";
import Reset from "./Reset";

function Settings({ study, setStudy }) {
  return (
    <>
      <Head>
        <Heading fontSize="28px">Settings</Heading>
      </Head>
      <Card borderWidth="1px" rounded="md" overflow="hidden" bg="white">
        <Activate study={study} />
        <Delete study={study} />
        <Reset study={study} />
      </Card>
    </>
  );
}

const Head = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 15px 0;
`;

const Card = styled(Box)`
  display: grid;
`;

export default Settings;
