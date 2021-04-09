import React, { useState } from "react";
import moment from "moment";

import { firestore } from "database/firebase";
import { useDocument } from "hooks";

import {
  Tooltip,
  Flex,
  Text,
  IconButton,
  useDisclosure,
  Icon,
} from "@chakra-ui/react";
import { FaInfoCircle, FaPencilAlt, FaPhone, FaTrashAlt } from "react-icons/fa";
import { Confirm } from "components";

import MeetingsForm from "./MeetingsForm.js";
import ParticipantDrawer from "views/Internal/Study/ViewStudy/Participants/ParticipantDrawer.js";

function MeetingsItem({ meeting }) {
  const [open, setOpen] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [participant, loading] = useDocument(
    firestore
      .collection("studies")
      .doc(meeting.studyID)
      .collection("participants")
      .doc(meeting.participantID)
  );

  const handleDelete = () => {
    setOpen(true);
  };

  const handleConfirm = () => {
    firestore.collection("meetings").doc(meeting.id).delete();
  };

  const meetingInfo = (
    <>
      <Text>
        Status: {meeting.confirmedByParticipant ? "Confirmed" : "Pending"}
      </Text>
      <Text>Study: {meeting.studyID}</Text>
      <Text>Participant: {participant && participant.fakename}</Text>
    </>
  );

  return (
    <Flex
      align="center"
      gridGap="8px"
      borderWidth="1px"
      p="10px 12px"
      rounded="md"
      bg="white"
    >
      {open && (
        <Confirm
          title="Delete Meeting"
          color="red"
          buttonText="Delete"
          loading={loading}
          loadingText="Deleting"
          open={open}
          setOpen={setOpen}
          handleConfirm={handleConfirm}
        >
          The respective participant will be notified of this deletion. Are you
          sure you want to delete this meeting?
        </Confirm>
      )}
      <ParticipantDrawer
        action="Meetings"
        fakename={participant && participant.fakename}
        onClose={onClose}
        isOpen={isOpen}
      >
        <MeetingsForm meeting={meeting} onClose={onClose} />
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
          <Tooltip
            label={meeting.confirmedByParticipant ? "Confirmed" : "Pending"}
          >
            <IconButton
              icon={<FaPhone />}
              size="sm"
              color={meeting.confirmedByParticipant ? "green.500" : "gray.500"}
              bg={meeting.confirmedByParticipant ? "green.100" : "gray.100"}
              _hover={{
                bg: meeting.confirmedByParticipant ? "green.200" : "gray.200",
              }}
            />
          </Tooltip>
        </a>
        <IconButton
          icon={<FaPencilAlt />}
          size="sm"
          color="blue.500"
          bg="blue.100"
          _hover={{ bg: "blue.200" }}
          onClick={onOpen}
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
