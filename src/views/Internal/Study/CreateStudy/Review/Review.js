import React, { useState } from "react";
import { updateStudy, deleteStudy } from "database/studies";
import { useHistory } from "react-router-dom";
import StudyCardLarge from "views/Internal/StudyCardLarge";
import { Heading, Text, Button, Flex, useToast } from "@chakra-ui/react";

function Review({ study }) {
  const toast = useToast();
  const history = useHistory();
  const [publishLoading, setPublishLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const handlePublish = () => {
    setPublishLoading(true);
    updateStudy({ ...study, published: true, activated: true })
      .then(() => {
        toast({
          title: "Study Published!",
          description: `Your study was successfully published is now available for
          participants to view and enroll`,
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
        history.push("/dashboard");
      })
      .catch(console.log)
      .finally(() => setPublishLoading(false));
  };

  const handleDelete = () => {
    setDeleteLoading(true);
    deleteStudy(study.id)
      .then(() => {
        toast({
          title: "Study Deleted!",
          description: `Your study was successfully deleted and will no longer be accessible through StudyFind`,
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
        history.push("/dashboard");
      })
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
