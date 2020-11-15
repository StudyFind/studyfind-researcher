import React from "react";
import styled from "styled-components";

import { Heading, Button } from "@chakra-ui/core";
import StudyCardLarge from "views/Internal/StudyCardLarge";

function Details({ study }) {
  return (
    <>
      <Head>
        <Heading fontSize="28px">Study Details</Heading>
        <Button variantColor="blue">Edit Details</Button>
      </Head>
      <StudyCardLarge study={study} />
    </>
  );
}

const Head = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
`;

export default Details;
