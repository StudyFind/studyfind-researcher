import React from "react";
import styled from "styled-components";

import StudyCardLarge from "views/Internal/StudyCardLarge";
import { Heading, Text, Button } from "@chakra-ui/react";

function ReviewStudyView({ study, handleDelete, handlePublish, deleteLoading, publishLoading }) {
  return (
    <div>
      <Heading size="lg" mb="10px">
        Review Your Study
      </Heading>
      <Text mb="15px" color="gray.500">
        This is how your research study will appear to participants. Please check that the details
        of the study match what you would like to present to the participants. If you would like the
        change anything, please update your study on clinicaltrials.gov and re-create the study.
      </Text>
      <StudyCardLarge study={study} />
      <Buttons>
        <Button
          colorScheme="red"
          onClick={handleDelete}
          isLoading={deleteLoading}
          loadingText="Deleting"
        >
          Delete
        </Button>
        <Button
          colorScheme="blue"
          onClick={handlePublish}
          isLoading={publishLoading}
          loadingText="Publishing"
        >
          Publish
        </Button>
      </Buttons>
    </div>
  );
}

const Buttons = styled.div`
  display: flex;
  justify-content: flex-end;
  grid-gap: 10px;
  margin: 15px 0;
`;

export default ReviewStudyView;
