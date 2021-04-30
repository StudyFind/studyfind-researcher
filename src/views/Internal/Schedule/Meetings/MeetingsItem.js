import React from "react";
import moment from "moment";

import { firestore } from "database/firebase";
import { useDocument, useConfirm } from "hooks";
import { useHistory, useLocation } from "react-router-dom";

import { Box, Tooltip, Flex, Text, IconButton, Icon } from "@chakra-ui/react";
import { FaInfoCircle, FaPencilAlt, FaPhone, FaTrashAlt } from "react-icons/fa";

import MeetingsForm from "./MeetingsForm.js";
import ParticipantDrawer from "views/Internal/Study/ViewStudy/Participants/ParticipantDrawer.js";

function MeetingsItem({ meeting }) {
  const confirm = useConfirm();
  const history = useHistory();
  const location = useLocation();
  const meetingID = new URLSearchParams(location.search).get("meetingID");
  const isOpen = meeting.id === meetingID;

  const handleClose = () => history.push(`/schedule`);
  const handleOpen = () => history.push(`/schedule?meetingID=${meeting.id}`);

  const [participant, loading] = useDocument(
    firestore
      .collection("studies")
      .doc(meeting.studyID)
      .collection("participants")
      .doc(meeting.participantID)
  );

  const handleDelete = () => {
    confirm({
      title: "Delete Meeting",
      description:
        "The respective participant will be notified of this deletion. Are you sure you want to delete this meeting?",
      color: "red",
      button: "Delete",
      loading,
      handleConfirm,
    });
  };

  const handleConfirm = () => {
    firestore.collection("meetings").doc(meeting.id).delete();
  };

  const meetingInfo = (
    <>
      <Text>Status: {meeting.confirmedByParticipant ? "Confirmed" : "Pending"}</Text>
      <Text>Study: {meeting.studyID}</Text>
      <Text>Participant: {participant && participant.fakename}</Text>
    </>
  );

  return (
    <Flex align="center" gridGap="8px" borderWidth="1px" p="10px 12px" rounded="md" bg="white">
      <ParticipantDrawer
        action="Meetings"
        fakename={participant && participant.fakename}
        onClose={handleClose}
        isOpen={isOpen}
      >
        <Box p="25px">
          <MeetingsForm meeting={meeting} onClose={handleClose} />
        </Box>
      </ParticipantDrawer>
      <Text fontSize="0.9rem" color="gray.500" width="64px" textAlign="right">
        {moment(meeting.time).format("hh:mma")}
      </Text>
      <Text fontWeight="500">{meeting.name}</Text>
      <Tooltip label={meetingInfo}>
        <Flex align="center" color="gray.400">
          <Icon as={FaInfoCircle} />
        </Flex>
      </Tooltip>
      <Flex gridGap="4px" ml="auto">
        <a href={meeting.link} target="_blank" rel="noopener noreferrer">
          {meeting.confirmedByParticipant ? (
            <Tooltip label="Confirmed">
              <IconButton
                icon={<FaPhone />}
                size="sm"
                color="green.500"
                bg="green.100"
                _hover={{ bg: "green.200" }}
              />
            </Tooltip>
          ) : (
            <Tooltip label="Pending">
              <IconButton
                icon={<FaPhone />}
                size="sm"
                color="gray.500"
                bg="gray.100"
                _hover={{ bg: "gray.200" }}
              />
            </Tooltip>
          )}
        </a>
        <IconButton
          icon={<FaPencilAlt />}
          size="sm"
          color="blue.500"
          bg="blue.100"
          _hover={{ bg: "blue.200" }}
          onClick={handleOpen}
        />
        <IconButton
          icon={<FaTrashAlt />}
          size="sm"
          color="red.500"
          bg="red.100"
          _hover={{ bg: "red.200" }}
          onClick={handleDelete}
        />
      </Flex>
    </Flex>
  );
}

export default MeetingsItem;
