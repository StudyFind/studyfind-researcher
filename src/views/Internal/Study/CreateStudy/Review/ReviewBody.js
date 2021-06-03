import { useConfirm } from "hooks";
import { firestore } from "database/firebase";

import { Flex, Button, useToast } from "@chakra-ui/react";
import StudyCardLarge from "molecules/StudyCardLarge";
import { toasts } from "templates";

function ReviewBody({ study, next, back }) {
  const toast = useToast();
  const confirm = useConfirm();

  const handlePublish = () => {
    return firestore
      .collection("studies")
      .doc(study.id)
      .update({ published: true, activated: true })
      .then(() => {
        toast(toasts.publishedStudy);
        next();
      });
  };

  const handleDelete = () => {
    return firestore
      .collection("studies")
      .doc(study.id)
      .delete()
      .then(() => {
        toast(toasts.deletedStudy);
        next();
      });
  };

  const handleSaveProgress = () => {
    toast(toasts.savedStudy);
    next();
  };

  const openPublishModal = () => {
    confirm({
      title: "Confirm Publish Study",
      description: `Publishing this study makes it visible to participants who can sign up for your study. Are you sure you want to publish this study (${study.id})?`,
      button: "Publish",
      color: "green",
      handleConfirm: handlePublish,
    });
  };

  const openDeleteModal = () => {
    confirm({
      title: "Confirm Delete Study",
      description: `Deleting this study removes it from your account and you will not be able to recover any changes made to the study. Are you sure you want to delete this study (${study.id})?`,
      button: "Delete",
      color: "red",
      handleConfirm: handleDelete,
    });
  };

  return (
    <>
      <StudyCardLarge study={study} />
      <Flex justify="flex-end" gridGap="10px" my="15px">
        <Button color="gray.500" variant="outline" onClick={back}>
          Back
        </Button>
        <Button colorScheme="red" onClick={openDeleteModal} loadingText="Deleting">
          Delete
        </Button>
        <Button colorScheme="blue" onClick={handleSaveProgress} loadingText="Saving">
          Save Progress
        </Button>
        <Button colorScheme="green" onClick={openPublishModal} loadingText="Publishing">
          Publish
        </Button>
      </Flex>
    </>
  );
}

export default ReviewBody;
