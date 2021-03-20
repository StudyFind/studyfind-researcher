import React, { useState } from "react";
import { updateStudy, deleteStudy } from "database/studies";
import toasts from "./../toasts";

import { Flex, Button, useToast } from "@chakra-ui/react";
import StudyCardLarge from "views/Internal/StudyCardLarge";

import ReviewConfirmDelete from "./ReviewConfirmDelete";
import ReviewConfirmPublish from "./ReviewConfirmPublish";

function ReviewBody({ study, next, back }) {
  const toast = useToast();
  const [loadingPublish, setLoadingPublish] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [confirmPublish, setConfirmPublish] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const openPublishModal = () => setConfirmPublish(true);
  const openDeleteModal = () => setConfirmDelete(true);

  const handlePublish = () => {
    setLoadingPublish(true);
    updateStudy(study.id, { ...study, published: true, activated: true })
      .then(() => {
        toast(toasts.publishSuccess);
        next();
      })
      .catch(() => toast(toasts.publishFailure))
      .finally(() => setLoadingPublish(false));
  };

  const handleDelete = () => {
    setLoadingDelete(true);
    deleteStudy(study.id)
      .then(() => {
        toast(toasts.deleteSuccess);
        next();
      })
      .catch(() => toast(toasts.deleteFailure))
      .finally(() => setLoadingDelete(false));
  };

  const handleSaveProgress = () => {
    toast(toasts.savedProgress);
    next();
  };

  return (
    <>
      {confirmPublish && (
        <ReviewConfirmPublish
          nctID={study.id}
          loadingPublish={loadingPublish}
          confirmPublish={confirmPublish}
          setConfirmPublish={setConfirmPublish}
          handlePublish={handlePublish}
        />
      )}
      {confirmDelete && (
        <ReviewConfirmDelete
          nctID={study.id}
          loadingDelete={loadingDelete}
          confirmDelete={confirmDelete}
          setConfirmDelete={setConfirmDelete}
          handleDelete={handleDelete}
        />
      )}
      <StudyCardLarge study={study} />
      <Flex justify="flex-end" gridGap="10px" my="15px">
        <Button color="gray.500" variant="outline" onClick={back}>
          Back
        </Button>
        <Button
          colorScheme="red"
          onClick={openDeleteModal}
          isDisabled={loadingDelete || loadingPublish}
          loadingText="Deleting"
        >
          Delete
        </Button>
        <Button
          colorScheme="blue"
          onClick={handleSaveProgress}
          isDisabled={loadingDelete || loadingPublish}
          loadingText="Saving"
        >
          Save Progress
        </Button>
        <Button
          colorScheme="green"
          onClick={openPublishModal}
          isDisabled={loadingDelete || loadingPublish}
          loadingText="Publishing"
        >
          Publish
        </Button>
      </Flex>
    </>
  );
}

export default ReviewBody;
