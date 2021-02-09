import React, { useState } from "react";

import { useParams } from "react-router-dom";
import { firestore } from "database/firebase";

import { Grid, Flex, Badge, Radio, RadioGroup, Button } from "@chakra-ui/react";

function Status({ participant, onClose }) {
  const { nctID } = useParams();
  const [status, setStatus] = useState(participant.status);
  const [loading, setLoading] = useState(false);

  const statusColors = {
    interested: "gray",
    screened: "purple",
    consented: "cyan",
    accepted: "green",
    rejected: "red",
  };

  const handleCancel = () => {
    setStatus(participant.status);
    onClose();
  };

  const handleSubmit = () => {
    setLoading(true);
    firestore
      .collection("studies")
      .doc(nctID)
      .collection("participants")
      .doc(participant.id)
      .update({ status })
      .then(onClose)
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  return (
    <RadioGroup value={status} onChange={setStatus}>
      <Grid gap="20px" bg="white" rounded="md" borderWidth="1px" p="20px">
        {["interested", "screened", "consented", "accepted", "rejected"].map((status, index) => (
          <Radio key={index} value={status}>
            <Flex align="center">
              <Badge colorScheme={statusColors[status]}>{status}</Badge>
            </Flex>
          </Radio>
        ))}
      </Grid>
      <Flex gridGap="10px" py="20px" justify="flex-end">
        <Button variant="outline" onClick={() => handleCancel()}>
          Cancel
        </Button>
        <Button
          colorScheme="blue"
          onClick={() => handleSubmit()}
          isLoading={loading}
          loadingText="Saving"
        >
          Save
        </Button>
      </Flex>
    </RadioGroup>
  );
}

export default Status;
