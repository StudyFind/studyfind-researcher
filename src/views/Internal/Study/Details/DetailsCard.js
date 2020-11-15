import React from "react";
import styled from "styled-components";

import { Heading, Button } from "@chakra-ui/core";
import StudyCardLarge from "views/Internal/StudyCardLarge";

function DetailsCard({ study, setEdit }) {
  return (
    <>
      <Head>
        <Heading fontSize="28px">Study Details</Heading>
        <Button variantColor="blue" onClick={() => setEdit(true)}>
          Edit Details
        </Button>
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

export default DetailsCard;
