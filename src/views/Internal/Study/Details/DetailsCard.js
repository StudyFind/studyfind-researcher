import React from "react";
import styled from "styled-components";

import { Heading, Button } from "@chakra-ui/react";
import StudyCardLarge from "views/Internal/StudyCardLarge";

function DetailsCard({ study, setEdit }) {
  return (
    <>
      <Head>
        <Heading fontSize="28px">Details</Heading>
        <Button colorScheme="blue" onClick={() => setEdit(true)}>
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
  margin: 15px 0;
`;

export default DetailsCard;
