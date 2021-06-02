import React from "react";
import moment from "moment";

import { firestore } from "database/firebase";
import { useDocument, useConfirm } from "hooks";
import { useHistory, useLocation } from "react-router-dom";

import { Box, Tooltip, Flex, Text, Icon } from "@chakra-ui/react";
import { FaInfoCircle, FaPencilAlt, FaPhone, FaTrashAlt } from "react-icons/fa";
import { Link, ActionButton } from "components";

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

  const handleConfirm = () => {
    firestore.collection("meetings").doc(meeting.id).delete();
  };

  const [participant] = useDocument(
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
      handleConfirm,
    });
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
        <Link to={meeting.link} isWrapper>
          <ActionButton
            icon={<FaPhone />}
            color={meeting.confirmedByParticipant ? "green" : "gray"}
            hint={meeting.confirmedByParticipant ? "Confirmed" : "Pending"}
          />
        </Link>
        <ActionButton icon={<FaPencilAlt />} hint="Edit" color="blue" onClick={handleOpen} />
        <ActionButton icon={<FaTrashAlt />} hint="Delete" color="red" onClick={handleDelete} />
      </Flex>
    </Flex>
  );
}

export default MeetingsItem;
