import { useState } from "react";
import { useParams } from "react-router-dom";
import { studyParticipant } from "database/mutations";
import {
  Text,
  Avatar,
  Badge,
  Flex,
  Editable,
  EditableInput,
  EditablePreview,
} from "@chakra-ui/react";
import { ActionButton } from "components";
import {
  FaClock,
  FaCalendar,
  FaClipboard,
  FaStickyNote,
  FaComment,
} from "react-icons/fa";

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

  function EditableParticipantName() {
    const [placeholder, setPlaceholder] = useState(fakename);

    const handleConfirm = () => {
      studyParticipant.updateFakename(studyID, participant.id, {
        fakename: placeholder,
      });
    };

    return (
      <Editable
        defaultValue={placeholder}
        fontWeight="500"
        mr="auto"
        value={placeholder}
        width="100%"
        onChange={(val) => {
          setPlaceholder(val);
        }}
        //This doesn't actually submit anything, its used to listen for clicks outside the edit box
        onSubmit={() => {
          setPlaceholder(fakename);
        }}
      >
        {/* <Flex align="center" gridGap="10px"> */}
        {/* <Flex> */}
        <EditablePreview paddingLeft="10px" />
        <EditableInput paddingLeft="10px" />
        {/* </Flex> */}
        {/* <EditableControls handleConfirm={handleConfirm} /> */}
        {/* </Flex> */}
      </Editable>
    );
  }
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
      <EditableParticipantName participant={participant} fakename={fakename} />
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
