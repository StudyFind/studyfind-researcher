import React, { useState } from "react";
import styled from "styled-components";
import { firestore } from "database/firebase";

import StudyCardLarge from "views/Internal/StudyCardLarge";

import { Heading, Text, Button } from "@chakra-ui/core";

function ReviewStudy({ studyID, study, setTab }) {
  const [publishLoading, setPublishLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const handlePublish = () => {
    setPublishLoading(true);
    return firestore
      .collection("studies")
      .doc(studyID || " ")
      .update({ ...study, published: true, activated: true })
      .then(() => setTab("success"))
      .catch((err) => console.log(err))
      .finally(() => setPublishLoading(false));
  };

  const handleDelete = () => {
    setDeleteLoading(true);
    return firestore
      .collection("studies")
      .doc(studyID || " ")
      .delete()
      .then(() => setTab("success"))
      .catch(() => alert("Study does not exist"))
      .finally(() => setDeleteLoading(false));
  };

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
          variantColor="red"
          onClick={handleDelete}
          isLoading={deleteLoading}
          loadingText="Deleting"
        >
          Delete
        </Button>
        <Button
          variantColor="teal"
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

export default ReviewStudy;
