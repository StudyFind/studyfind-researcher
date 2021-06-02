import React from "react";

import { useConfirm } from "hooks";
import { datetime } from "functions";
import { firestore } from "database/firebase";

import { Box, Flex, Heading, Text, useToast } from "@chakra-ui/react";

import MeetingsStatus from "./MeetingsStatus";
import MeetingsButtons from "./MeetingsButtons";
import { toasts } from "templates";

function MeetingsCard({ meeting, handleEdit }) {
  const toast = useToast();
  const confirm = useConfirm();

  const handleConfirm = () => {
    firestore
      .collection("meetings")
      .doc(meeting.id)
      .delete()
      .then(() => toast(toasts.deletedMeeting))
      .catch(() => toast(toasts.connectionError));
  };

  const handleDelete = () => {
    confirm({
      title: "Confirm Delete Study",
      description: `Deleting this meeting cannot be undone and will notify the respective participant?`,
      button: "Delete",
      color: "red",
      handleConfirm,
    });
  };

  const displayDate = datetime.getFriendlyDate(meeting.time);
  const displayTime = datetime.get12HourTime(meeting.time);

  return (
    <Box borderWidth="1px" bg="white" rounded="md" p="15px">
      <Heading size="md">{meeting.name}</Heading>
      <Text color="gray.500" fontSize="0.9rem" mb="8px">
        {displayDate} at {displayTime}
      </Text>
      <Flex justify="space-between" align="center" mt="16px">
        <MeetingsButtons
          confirmed={meeting.confirmedByParticipant}
          link={meeting.link}
          handleEdit={() => handleEdit(meeting)}
          handleDelete={handleDelete}
        />
        <MeetingsStatus confirmed={meeting.confirmedByParticipant} />
      </Flex>
    </Box>
  );
}

export default MeetingsCard;
