import React from "react";
import { Heading, Button, Flex } from "@chakra-ui/react";
import StudyCardLarge from "views/Internal/StudyCardLarge";

function DetailsView({ study, setEdit }) {
  return (
    <>
      <Flex justify="space-between" align="center" my="15px" h="40px">
        <Heading fontSize="28px">Details</Heading>
        <Button colorScheme="blue" onClick={() => setEdit(true)}>
          Edit Details
        </Button>
      </Flex>
      <StudyCardLarge study={study} />
    </>
  );
}

export default DetailsView;
