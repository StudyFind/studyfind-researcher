import { useState } from "react";
import { useParams } from "react-router-dom";

import { studyParticipant } from "database/mutations";

import { Text, Avatar, Badge, Flex } from "@chakra-ui/react";
import { ActionButton } from "components";
import {
  FaClock,
  FaCalendar,
  FaClipboard,
  FaStickyNote,
  FaComment,
} from "react-icons/fa";

import EditableParticipantName from "pages/Internal/Study/ViewStudy/Participants/EditableParticipantName";

function ParticipantsItem({ participant, handleOpen, hasQuestions }) {
  const { studyID } = useParams();

  const statusColors = {
    interested: "gray",
    screened: "purple",
    consented: "cyan",
    accepted: "green",
    rejected: "red",
  };

  const color = participant?.color || "blue.500";
  const fakename = participant?.fakename || participant?.id;

  const [placeholder, setPlaceholder] = useState(fakename);

  const handleChange = (val) => {
    setPlaceholder(val);
  };

  const handleConfirm = () => {
    studyParticipant.updateFakename(studyID, participant.id, {
      fakename: placeholder,
    });
  };

  return (
    <Flex align="center" gridGap="10px" padding="10px">
      <Avatar
        size="1rem"
        width="30px"
        height="30px"
        color="white"
        background={color}
        name={fakename}
      />
      <EditableParticipantName
        value={placeholder}
        handleChange={handleChange}
        handleConfirm={handleConfirm}
      />
      <Badge
        size="sm"
        cursor="pointer"
        colorScheme={statusColors[participant.status]}
        onClick={() => handleOpen(participant.id, "status")}
      >
        {participant.status}
      </Badge>
      {hasQuestions && (
        <Text color="gray.400" w="100px" textAlign="right">
          {participant.score}% eligible
        </Text>
      )}
      <Flex align="center" gridGap="5px">
        <ActionButton
          hint="Questions"
          icon={<FaClipboard />}
          onClick={() => handleOpen(participant.id, "questions")}
        />
        <ActionButton
          hint="Notes"
          icon={<FaStickyNote />}
          onClick={() => handleOpen(participant.id, "notes")}
        />
        <ActionButton
          hint="Meetings"
          icon={<FaCalendar />}
          onClick={() => handleOpen(participant.id, "meetings")}
        />
        <ActionButton
          hint="Reminders"
          icon={<FaClock />}
          onClick={() => handleOpen(participant.id, "reminders")}
        />
        <ActionButton
          hint="Messages"
          icon={<FaComment />}
          onClick={() => handleOpen(participant.id, "messages")}
        />
      </Flex>
    </Flex>
  );
}

export default ParticipantsItem;
