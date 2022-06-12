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

  const [isLoading, setIsLoading] = useState(false);

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
    setIsLoading(true);

    studyParticipant
      .updateFakename(studyID, participant.id, {
        fakename: placeholder,
      })
      .finally(() => setIsLoading(false));
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
        isLoading={isLoading}
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
          hint={
            plan !== "STANDARD"
              ? "Standard subscription required to access the meetings feature"
              : "Meetings"
          }
          isDisabled={plan !== "STANDARD"}
          icon={<FaCalendar />}
          onClick={() => handleOpen(participant.id, "meetings")}
        />
        <ActionButton
          hint={
            plan !== "STANDARD"
              ? "Standard subscription required to access the reminders feature"
              : "Reminders"
          }
          isDisabled={plan !== "STANDARD"}
          icon={<FaClock />}
          onClick={() => handleOpen(participant.id, "reminders")}
        />
        <ActionButton
          hint={
            plan !== "PREMIUM"
              ? "Premium subscription required to access the messages feature"
              : "Messages"
          }
          isDisabled={plan !== "PREMIUM"}
          icon={<FaComment />}
          onClick={() => handleOpen(participant.id, "messages")}
        />
      </Flex>
    </Flex>
  );
}

export default ParticipantsItem;
