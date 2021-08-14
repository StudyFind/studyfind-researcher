import { useState } from "react";
import { useParams } from "react-router-dom";

import { Flex, Badge, Button, Box, SimpleGrid } from "@chakra-ui/react";
import { Card, ChoiceInput, SecondaryButton } from "components";

function Status({ participant = { status: "screened" }, handleClose }) {
  const { studyID } = useParams();
  const [status, setStatus] = useState(participant.status);
  const [loading, setLoading] = useState(false);

  const handleCancel = () => {
    setStatus(participant.status);
    handleClose();
  };

  const handleSubmit = () => {
    setLoading(true);
    // firestore
    //   .collection("studies")
    //   .doc(studyID)
    //   .collection("participants")
    //   .doc(participant.id)
    //   .update({ status })
    //   .then(handleClose)
    //   .catch(() => {})
    //   .finally(() => setLoading(false));
  };

  return (
    <Box padding="20px">
      <SimpleGrid spacing="20px">
        <Card padding="20px">
          <ChoiceInput
            value={status}
            options={[
              {
                label: (
                  <Badge marginY="5px" colorScheme="gray">
                    Interested
                  </Badge>
                ),
                value: "interested",
              },
              {
                label: (
                  <Badge marginY="5px" colorScheme="purple">
                    Screened
                  </Badge>
                ),
                value: "screened",
              },
              {
                label: (
                  <Badge marginY="5px" colorScheme="cyan">
                    Consented
                  </Badge>
                ),
                value: "consented",
              },
              {
                label: (
                  <Badge marginY="5px" colorScheme="green">
                    Accepted
                  </Badge>
                ),
                value: "accepted",
              },
              {
                label: (
                  <Badge marginY="5px" colorScheme="red">
                    Rejected
                  </Badge>
                ),
                value: "rejected",
              },
            ]}
            onChange={setStatus}
          />
        </Card>
        <Flex gridGap="10px" justify="flex-end">
          <SecondaryButton onClick={() => handleCancel()}>
            Cancel
          </SecondaryButton>
          <Button
            colorScheme="blue"
            onClick={() => handleSubmit()}
            isLoading={loading}
            loadingText="Saving"
          >
            Save
          </Button>
        </Flex>
      </SimpleGrid>
    </Box>
  );
}

export default Status;
