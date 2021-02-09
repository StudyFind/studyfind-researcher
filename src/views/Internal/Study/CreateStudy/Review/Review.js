import React, { useState } from "react";
import { updateStudy, deleteStudy } from "database/studies";
import StudyCardLarge from "views/Internal/StudyCardLarge";
import { Flex, Heading, Text, Button, Link, useToast } from "@chakra-ui/react";

function Review({ study, next }) {
  const toast = useToast();
  const [publishLoading, setPublishLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const handlePublish = () => {
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
    <div>
      <Heading size="lg" mb="10px">
        Review Your Study
      </Heading>
      <Text mb="15px" color="gray.500">
        Please check that the details of the study match what you would like to present to potential
        participants. If you would like to change the study title and description, you can edit
        these once the study is published. If you would like to change other study information,
        please make changes to the study on{" "}
        <Link color="blue.500" href="https://clinicaltrials.gov" target="_blank">
          clinicaltrials.gov
        </Link>{" "}
        and update the study through the StudyFind study settings.
      </Text>
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
          colorScheme="green"
          onClick={handlePublish}
          isDisabled={deleteLoading || publishLoading}
          isLoading={publishLoading}
          loadingText="Publishing"
        >
          Publish
        </Button>
      </Flex>
    </div>
  );
}

export default Review;
