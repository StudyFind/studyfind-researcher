import React, { useState } from "react";
import { useConfirm } from "hooks";
import { firestore } from "database/firebase";

import { Flex, Button, useToast } from "@chakra-ui/react";
import StudyCardLarge from "molecules/StudyCardLarge";

function ReviewBody({ study, next, back }) {
  const toast = useToast();
  const confirm = useConfirm();

  const [loading, setLoading] = useState(false);

  const openPublishModal = () => {
    confirm({
      title: "Confirm Publish Study",
      description: `Publishing this study makes it visible to participants who can sign up for your study. Are you sure you want to publish this study (${study.id})?`,
      button: "Publish",
      color: "green",
      loading,
      handleConfirm: handlePublish,
    });
  };

  const openDeleteModal = () => {
    confirm({
      title: "Confirm Delete Study",
      description: `Deleting this study removes it from your account and you will not be able to recover any changes made to the study. Are you sure you want to delete this study (${study.id})?`,
      button: "Delete",
      color: "red",
      loading,
      handleConfirm: handleDelete,
    });
  };

  const triggerPublishSuccessToast = () => {
    toast({
      title: "Study Published!",
      description: `Your study was successfully published is now available for participants to view and enroll.`,
      status: "success",
      duration: 5000,
      isClosable: true,
      position: "top",
    });
  };

  const triggerDeleteSuccessToast = () => {
    toast({
      title: "Study Deleted!",
      description: `Your study was successfully deleted and will no longer be accessible through StudyFind`,
      status: "error",
      duration: 5000,
      isClosable: true,
      position: "top",
    });
  };

  const triggerSaveProgressToast = () => {
    toast({
      title: "Study Progress Saved!",
      description: `Your study along with any changes you made have been saved and can be published or deleted from the study settings tab.`,
      status: "info",
      duration: 5000,
      isClosable: true,
      position: "top",
    });
  };

  const triggerErrorToast = () => {
    toast({
      title: "Connection Error",
      description: `Your action could not be completed due to a connection error. Please try again later.`,
      status: "error",
      duration: 5000,
      isClosable: true,
      position: "top",
    });
  };

  const handlePublish = () => {
    setLoading(true);
    firestore
      .collection("studies")
      .doc(study.id)
      .update({ published: true, activated: true })
      .then(() => {
        next();
        triggerPublishSuccessToast();
      })
      .catch(() => triggerErrorToast())
      .finally(() => setLoading(false));
  };

  const handleDelete = () => {
    setLoading(true);
    firestore
      .collection("studies")
      .doc(study.id)
      .delete()
      .then(() => {
        next();
        triggerDeleteSuccessToast();
      })
      .catch(() => triggerErrorToast())
      .finally(() => setLoading(false));
  };

  const handleSaveProgress = () => {
    triggerSaveProgressToast();
    next();
  };

  return (
    <>
      <StudyCardLarge study={study} />
      <Flex justify="flex-end" gridGap="10px" my="15px">
        <Button color="gray.500" variant="outline" onClick={back}>
          Back
        </Button>
        <Button
          colorScheme="red"
          onClick={openDeleteModal}
          isDisabled={loading}
          loadingText="Deleting"
        >
          Delete
        </Button>
        <Button
          colorScheme="blue"
          onClick={handleSaveProgress}
          isDisabled={loading}
          loadingText="Saving"
        >
          Save Progress
        </Button>
        <Button
          colorScheme="green"
          onClick={openPublishModal}
          isDisabled={loading}
          loadingText="Publishing"
        >
          Publish
        </Button>
      </Flex>
    </>
  );
}

export default ReviewBody;
