import React, { useState } from "react";
import styled from "styled-components";
import { updateStudy, deleteStudy } from "database/studies";
import { Heading, Text, Button } from "components";
import StudyCardLarge from "views/Internal/StudyCardLarge";

function Review({ study, setTab }) {
  const [publishLoading, setPublishLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const handlePublish = () => {
    setPublishLoading(true);
    updateStudy({ ...study, published: true, activated: true })
      .then(() => setTab("published"))
      .catch(console.log)
      .finally(() => setPublishLoading(false));
  };

  const handleDelete = () => {
    setDeleteLoading(true);
    deleteStudy(study.id)
      .then(() => setTab("deleted"))
      .catch(console.log)
      .finally(() => setDeleteLoading(false));
  };

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

export default Review;
