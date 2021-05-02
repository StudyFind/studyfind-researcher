import React, { useState, useContext } from "react";

import { useConfirm } from "hooks";
import { convert } from "functions";
import { firestore } from "database/firebase";
import { UserContext } from "context";

import { Box, Flex, Heading, Text, useToast } from "@chakra-ui/react";

import MeetingsStatus from "./MeetingsStatus";
import MeetingsButtons from "./MeetingsButtons";

function MeetingsCard({ meeting, handleEdit }) {
  const toast = useToast();
  const confirm = useConfirm();
  const { timezone } = useContext(UserContext);

  const [loading, setLoading] = useState(false);

  const formatTimestamp = (timestamp) => {
    const formattedDate = convert.timestampToDate(timestamp, timezone);
    const formattedTime = convert.timestampToTime(timestamp, timezone);
    return `${formattedDate} at ${formattedTime}`;
  };

  const handleJoin = () => {
    window.open(meeting.link, "_blank");
  };

  const handleConfirm = () => {
    setLoading(true);
    firestore
      .collection("meetings")
      .doc(meeting.id)
      .delete()
      .then(() => toast({}))
      .catch(() => toast({}))
      .finally(() => setLoading(false));
  };

  const handleDelete = () => {
    confirm({
      title: "Confirm Delete Study",
      description: `Deleting this meeting cannot be undone and will notify the respective participant?`,
      button: "Delete",
      loading,
      handleConfirm,
    });
  };

  return (
    <Box borderWidth="1px" bg="white" rounded="md" p="15px">
      <Heading size="md">{meeting.name}</Heading>
      <Text color="gray.500" fontSize="0.9rem" mb="8px">
        {formatTimestamp(meeting.time)}
      </Text>
      <Flex justify="space-between" align="center" mt="16px">
        <MeetingsButtons
          confirmed={meeting.confirmedByParticipant}
          handleJoin={handleJoin}
          handleEdit={() => handleEdit(meeting)}
          handleDelete={handleDelete}
        />
        <MeetingsStatus confirmed={meeting.confirmedByParticipant} />
      </Flex>
    </Box>
  );
}

export default MeetingsCard;
