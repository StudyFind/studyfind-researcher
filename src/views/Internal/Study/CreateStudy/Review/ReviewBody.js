import React, { useRef, useState } from "react";
import { updateStudy, deleteStudy } from "database/studies";
import StudyCardLarge from "views/Internal/StudyCardLarge";

import {
  Flex,
  Button,
  useToast,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from "@chakra-ui/react";

function ReviewBody({ study, next }) {
  const toast = useToast();
  const [publishLoading, setPublishLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const cancelRef = useRef();

  const handlePublishNow = () => {
    setPublishLoading(true);
    updateStudy(study.id, { ...study, published: true, activated: true })
      .then(() => {
        toast({
          title: "Study Published!",
          description:
            "Your study was successfully published is now available for participants to view and enroll",
          status: "success",
          duration: 2500,
          isClosable: true,
          position: "top",
        });
        next();
      })
      .catch(() => {
        toast({
          title: "Connection Error",
          description:
            "Your study could not be published due to a connection error. Please check your internet connection and try again.",
          status: "error",
          duration: 2500,
          isClosable: true,
          position: "top",
        });
      })
      .finally(() => setPublishLoading(false));
  };

  const handleConfirm = () => {};

  const handlePublishLater = () => {
    toast({
      title: "Study Created!",
      description:
        "Your study was created but is yet to be published for participants to view and enroll. Please make all necessary changes to the study before publishing, as the study title, description, and eligibility cannot be changed after the study is published.",
      status: "info",
      duration: 2500,
      isClosable: true,
      position: "top",
    });
    next();
  };

  const handleDelete = () => {
    setDeleteLoading(true);
    deleteStudy(study.id)
      .then(() => {
        toast({
          title: "Study Deleted!",
          description:
            "Your study was successfully deleted and will no longer be accessible through StudyFind",
          status: "error",
          duration: 2500,
          isClosable: true,
          position: "top",
        });
        next();
      })
      .catch(() => {
        toast({
          title: "Connection Error",
          description:
            "Your study could not be published due to a connection error. Please check your internet connection and try again.",
          status: "error",
          duration: 2500,
          isClosable: true,
          position: "top",
        });
      })
      .finally(() => setDeleteLoading(false));
  };

  return (
    <>
      <StudyCardLarge study={study} />
      <Flex justify="flex-end" gridGap="10px" my="15px">
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
          colorScheme="blue"
          onClick={handlePublishLater}
          isDisabled={deleteLoading || publishLoading}
          isLoading={publishLoading}
          loadingText="Publishing"
        >
          Publish Later
        </Button>
        <Button
          colorScheme="green"
          onClick={() => setIsOpen(true)}
          isDisabled={deleteLoading || publishLoading}
          isLoading={publishLoading}
          loadingText="Publishing"
        >
          Publish Now
        </Button>
      </Flex>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={() => setIsOpen(false)}
        size="lg"
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Publish Study
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure you want to publish study <b>{study.id}</b>?
              <br />
              <br />
              You cannot edit the study title, description and eligibility criteria once it is
              published. If you would like to publish the study in the future, you may select
              <b> Publish Later </b> instead.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button colorScheme="green" onClick={handleConfirm} ml={3} isLoading={publishLoading}>
                Publish
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}

export default ReviewBody;
