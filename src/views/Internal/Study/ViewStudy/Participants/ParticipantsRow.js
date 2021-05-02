import React from "react";
import styled from "styled-components";

import { useParams, useHistory, useLocation } from "react-router-dom";
import { ActionButton } from "components";
import { Box, Text, Avatar, Badge } from "@chakra-ui/react";
import { FaClock, FaCalendar, FaClipboard, FaStickyNote, FaComment } from "react-icons/fa";

import ParticipantDrawer from "./ParticipantDrawer";

import Status from "./Status/Status";
import Screening from "./Screening/Screening";
import Meetings from "./Meetings/Meetings";
import Reminders from "./Reminders/Reminders";
import Notes from "./Notes/Notes";
import Messages from "./Messages/Messages";

function ParticipantsRow({ study, participant }) {
  const statusColors = {
    interested: "gray",
    screened: "purple",
    consented: "cyan",
    accepted: "green",
    rejected: "red",
  };

  const location = useLocation();
  const history = useHistory();

  const action = new URLSearchParams(location.search).get("action");
  const participantID = new URLSearchParams(location.search).get("participantID");

  const { studyID } = useParams();

  const isOpen = action && participant.id === participantID;

  const handleClose = () => {
    history.push(`/study/${studyID}/participants`);
  };

  const handleOpen = (action) => {
    history.push(`/study/${studyID}/participants?participantID=${participant.id}&action=${action}`);
  };

  return (
    <Row>
      <Avatar
        size="1rem"
        h="30px"
        w="30px"
        bg="blue.500"
        name={participant.fakename.split("")[0]}
      />
      <Text fontWeight="500" mr="auto">
        {participant.fakename}
      </Text>
      <Badge
        size="sm"
        cursor="pointer"
        colorScheme={statusColors[participant.status]}
        onClick={() => handleOpen("status")}
      >
        {participant.status}
      </Badge>
      <Text color="gray.400" w="100px" textAlign="right">
        {participant.score}% eligible
      </Text>
      <Buttons>
        <ActionButton hint="Messages" icon={<FaComment />} onClick={() => handleOpen("messages")} />
        <ActionButton
          hint="Screening"
          icon={<FaClipboard />}
          onClick={() => handleOpen("screening")}
        />
        <ActionButton
          hint="Meetings"
          icon={<FaCalendar />}
          onClick={() => handleOpen("meetings")}
        />
        <ActionButton hint="Reminders" icon={<FaClock />} onClick={() => handleOpen("reminders")} />
        <ActionButton hint="Notes" icon={<FaStickyNote />} onClick={() => handleOpen("notes")} />
      </Buttons>
      <ParticipantDrawer
        action={action}
        fakename={participant.fakename}
        timezone={participant.timezone}
        isOpen={isOpen}
        onClose={handleClose}
      >
        {action === "status" && (
          <Box p="25px">
            <Status participant={participant} handleClose={handleClose} />
          </Box>
        )}
        {action === "messages" && <Messages participant={participant} />}
        {action === "screening" && (
          <Box p="25px">
            <Screening questions={study.questions} responses={participant.responses} />
          </Box>
        )}
        {action === "meetings" && (
          <Box p="25px">
            <Meetings participant={participant} study={study} />
          </Box>
        )}
        {action === "reminders" && (
          <Box p="25px">
            <Reminders participant={participant} study={study} />
          </Box>
        )}
        {action === "notes" && (
          <Box p="25px">
            <Notes id={participant.id} />
          </Box>
        )}
      </ParticipantDrawer>
    </Row>
  );
}

const Row = styled.div`
  display: flex;
  align-items: center;
  grid-gap: 10px;
  padding: 10px;

  border-bottom: 1px solid #f1f2f3;

  &:last-child {
    border-bottom: none;
  }
`;

const Buttons = styled.div`
  display: flex;
  align-items: center;
  grid-gap: 5px;
`;

export default ParticipantsRow;
