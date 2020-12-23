import React from "react";
import styled from "styled-components";

import StudyCardLarge from "views/Internal/StudyCardLarge";
import { Heading, Text, Button } from "@chakra-ui/react";

function ReviewView({ study, handleDelete, handlePublish, deleteLoading, publishLoading }) {
  return (
    <div>
      <Heading size="lg" mb="10px">
        Review Your Study
      </Heading>
      <Text mb="15px" color="gray.500">
        Please check that the details of the study match what you would like to present to potential
        participants. If you would like to change the study title and description, you can edit
        these once the study is published. If you would like to change other study information,
        please make changes to the study on clinicaltrials.gov and update the study through the
        StudyFind study settings.
      </Text>
      <StudyCardLarge study={study} />
      <Buttons>
        <Button
          colorScheme="red"
          onClick={handleDelete}
          isDisabled={deleteLoading || publishLoading}
          isLoading={deleteLoading}
          loadingText="Deleting"
        >
          Delete
        </Button>
        <Button
          colorScheme="green"
          onClick={handlePublish}
          isDisabled={deleteLoading || publishLoading}
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

export default ReviewView;
